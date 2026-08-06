const { createPubSub } = require('graphql-yoga');

const pubSub = createPubSub();

const resolvers = {
  // ── Type-level resolvers ──────────────────────────────────────

  User: {
    tasks: (user, { status }) => {
      const tasks = status
        ? user._tasks.filter((t) => t.status === status)
        : user._tasks;
      return tasks.map((t) => ({ ...t, _assignee: user, _project: null }));
    },
  },

  Project: {
    owner: (project, _, { db }) => db.users.byId(project.ownerId),
    members: (project, _, { db }) =>
      project.memberIds.map((id) => db.users.byId(id)).filter(Boolean),
    tasks: (project, { status }) => {
      const tasks = status
        ? project._tasks.filter((t) => t.status === status)
        : project._tasks;
      return tasks.map((t) => ({
        ...t,
        _assignee: t.assigneeId ? project._members.find((m) => m.id === t.assigneeId) : null,
        _project: project,
      }));
    },
  },

  Task: {
    assignee: (task, _, { db }) =>
      task.assigneeId ? db.users.byId(task.assigneeId) : null,
    project: (task, _, { db }) =>
      task.projectId ? db.projects.byId(task.projectId) : null,
    comments: (task, _, { db }) =>
      db.comments.byTask(task.id).map((c) => ({ ...c, _task: task })),
  },

  Comment: {
    author: (comment, _, { db }) => db.users.byId(comment.authorId),
    task: (comment, _, { db }) => {
      const task = db.tasks.byId(comment.taskId);
      if (!task) return null;
      return {
        ...task,
        _assignee: task.assigneeId ? db.users.byId(task.assigneeId) : null,
        _project: task.projectId ? db.projects.byId(task.projectId) : null,
      };
    },
  },

  // ── Query resolvers ───────────────────────────────────────────

  Query: {
    users: (_, __, { db }) =>
      db.users.all().map((u) => ({
        ...u,
        _tasks: db.tasks.byAssignee(u.id),
      })),

    user: (_, { id }, { db }) => {
      const u = db.users.byId(id);
      return u ? { ...u, _tasks: db.tasks.byAssignee(u.id) } : null;
    },

    tasks: (_, args, { db }) =>
      db.tasks.all(args).map((t) => ({
        ...t,
        _assignee: t.assigneeId ? db.users.byId(t.assigneeId) : null,
        _project: t.projectId ? db.projects.byId(t.projectId) : null,
      })),

    task: (_, { id }, { db }) => {
      const t = db.tasks.byId(id);
      return t
        ? {
            ...t,
            _assignee: t.assigneeId ? db.users.byId(t.assigneeId) : null,
            _project: t.projectId ? db.projects.byId(t.projectId) : null,
          }
        : null;
    },

    projects: (_, __, { db }) =>
      db.projects.all().map((p) => ({
        ...p,
        _tasks: db.tasks.byProject(p.id),
        _members: p.memberIds.map((id) => db.users.byId(id)).filter(Boolean),
      })),

    project: (_, { id }, { db }) => {
      const p = db.projects.byId(id);
      return p
        ? {
            ...p,
            _tasks: db.tasks.byProject(p.id),
            _members: p.memberIds.map((id) => db.users.byId(id)).filter(Boolean),
          }
        : null;
    },
  },

  // ── Mutation resolvers ────────────────────────────────────────

  Mutation: {
    createUser: (_, { input }, { db }) => db.users.create(input),

    createProject: (_, { input }, { db }) => db.projects.create(input),

    addProjectMember: (_, { projectId, userId }, { db }) => {
      const project = db.projects.addMember(projectId, userId);
      if (!project) throw new Error(`Project ${projectId} not found`);
      return project;
    },

    createTask: (_, { input }, { db }) => {
      const task = db.tasks.create(input);
      const enriched = {
        ...task,
        _assignee: task.assigneeId ? db.users.byId(task.assigneeId) : null,
        _project: task.projectId ? db.projects.byId(task.projectId) : null,
      };
      pubSub.publish('TASK_CREATED', { taskCreated: enriched });
      return enriched;
    },

    updateTask: (_, { id, input }, { db }) => {
      const task = db.tasks.update(id, input);
      if (!task) throw new Error(`Task ${id} not found`);
      const enriched = {
        ...task,
        _assignee: task.assigneeId ? db.users.byId(task.assigneeId) : null,
        _project: task.projectId ? db.projects.byId(task.projectId) : null,
      };
      pubSub.publish('TASK_UPDATED', { taskUpdated: enriched });
      return enriched;
    },

    deleteTask: (_, { id }, { db }) => db.tasks.delete(id),

    addComment: (_, { input }, { db }) => {
      const comment = db.comments.create(input);
      const enriched = {
        ...comment,
        _task: db.tasks.byId(comment.taskId),
      };
      pubSub.publish('COMMENT_ADDED', {
        commentAdded: enriched,
        taskId: comment.taskId,
      });
      return enriched;
    },

    deleteComment: (_, { id }, { db }) => db.comments.delete(id),
  },

  // ── Subscription resolvers ────────────────────────────────────

  Subscription: {
    taskCreated: {
      subscribe: (_, { projectId }) =>
        pubSub.subscribe('TASK_CREATED', {
          filter: (payload) =>
            !projectId || payload.taskCreated.projectId === projectId,
        }),
      resolve: (payload) => payload.taskCreated,
    },

    taskUpdated: {
      subscribe: (_, { taskId }) =>
        pubSub.subscribe('TASK_UPDATED', {
          filter: (payload) =>
            !taskId || payload.taskUpdated.id === taskId,
        }),
      resolve: (payload) => payload.taskUpdated,
    },

    commentAdded: {
      subscribe: (_, { taskId }) =>
        pubSub.subscribe('COMMENT_ADDED', {
          filter: (payload) =>
            !taskId || payload.commentAdded.taskId === taskId,
        }),
      resolve: (payload) =>
        ({
          ...payload.commentAdded,
          _task: null,
        }),
    },
  },
};

module.exports = resolvers;
