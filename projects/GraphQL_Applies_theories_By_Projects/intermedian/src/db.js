const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const now = () => new Date().toISOString();
const uid = () => String(Date.now());

const defaults = {
  users: [
    { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: '2025-01-01T00:00:00Z' },
    { id: '2', name: 'Bob', email: 'bob@example.com', createdAt: '2025-01-02T00:00:00Z' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', createdAt: '2025-01-03T00:00:00Z' },
  ],
  projects: [
    { id: '1', name: 'Website Redesign', description: 'Redesign the company website', ownerId: '1', memberIds: ['1', '2'], createdAt: '2025-02-01T00:00:00Z' },
    { id: '2', name: 'Mobile App', description: 'Build the React Native app', ownerId: '2', memberIds: ['2', '3'], createdAt: '2025-02-15T00:00:00Z' },
  ],
  tasks: [
    { id: '1', title: 'Design homepage mockups', description: 'Create Figma mockups for the landing page', status: 'IN_PROGRESS', priority: 'HIGH', assigneeId: '1', projectId: '1', dueDate: '2025-05-01', createdAt: '2025-03-01T00:00:00Z', updatedAt: '2025-03-10T00:00:00Z' },
    { id: '2', title: 'Set up CI/CD', description: 'Configure GitHub Actions', status: 'TODO', priority: 'MEDIUM', assigneeId: '2', projectId: '1', dueDate: null, createdAt: '2025-03-05T00:00:00Z', updatedAt: '2025-03-05T00:00:00Z' },
    { id: '3', title: 'API integration', description: 'Connect to backend API', status: 'DONE', priority: 'CRITICAL', assigneeId: '3', projectId: '2', dueDate: '2025-04-15', createdAt: '2025-03-01T00:00:00Z', updatedAt: '2025-04-10T00:00:00Z' },
  ],
  comments: [
    { id: '1', content: 'Looks great! Can we add animations?', authorId: '2', taskId: '1', createdAt: '2025-03-11T00:00:00Z' },
    { id: '2', content: 'Sure, I will add them in v2.', authorId: '1', taskId: '1', createdAt: '2025-03-12T00:00:00Z' },
  ],
};

let store = null;

function load() {
  if (fs.existsSync(DB_PATH)) {
    try {
      store = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
      return;
    } catch {
    }
  }
  store = JSON.parse(JSON.stringify(defaults));
  save();
}

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2));
}

function getStore() {
  if (!store) load();
  return store;
}

const db = {
  // Users
  users: {
    all: () => getStore().users,
    byId: (id) => getStore().users.find((u) => u.id === id),
    create: ({ name, email }) => {
      const user = { id: uid(), name, email, createdAt: now() };
      getStore().users.push(user);
      save();
      return user;
    },
  },

  // Projects
  projects: {
    all: () => getStore().projects,
    byId: (id) => getStore().projects.find((p) => p.id === id),
    create: ({ name, description, ownerId }) => {
      const project = { id: uid(), name, description, ownerId, memberIds: [ownerId], createdAt: now() };
      getStore().projects.push(project);
      save();
      return project;
    },
    addMember: (projectId, userId) => {
      const project = db.projects.byId(projectId);
      if (!project) return null;
      if (!project.memberIds.includes(userId)) {
        project.memberIds.push(userId);
        save();
      }
      return project;
    },
  },

  // Tasks
  tasks: {
    all: (filters = {}) => {
      let list = getStore().tasks;
      if (filters.status) list = list.filter((t) => t.status === filters.status);
      if (filters.priority) list = list.filter((t) => t.priority === filters.priority);
      if (filters.assigneeId) list = list.filter((t) => t.assigneeId === filters.assigneeId);
      if (filters.projectId) list = list.filter((t) => t.projectId === filters.projectId);
      if (filters.limit) list = list.slice(filters.offset || 0, (filters.offset || 0) + filters.limit);
      return list;
    },
    byId: (id) => getStore().tasks.find((t) => t.id === id),
    byAssignee: (userId) => getStore().tasks.filter((t) => t.assigneeId === userId),
    byProject: (projectId) => getStore().tasks.filter((t) => t.projectId === projectId),
    create: ({ title, description, priority, dueDate, assigneeId, projectId }) => {
      const task = {
        id: uid(),
        title,
        description: description || null,
        status: 'TODO',
        priority: priority || 'MEDIUM',
        dueDate: dueDate || null,
        assigneeId: assigneeId || null,
        projectId: projectId || null,
        createdAt: now(),
        updatedAt: now(),
      };
      getStore().tasks.push(task);
      save();
      return task;
    },
    update: (id, fields) => {
      const task = db.tasks.byId(id);
      if (!task) return null;
      if (fields.title !== undefined) task.title = fields.title;
      if (fields.description !== undefined) task.description = fields.description;
      if (fields.status !== undefined) task.status = fields.status;
      if (fields.priority !== undefined) task.priority = fields.priority;
      if (fields.dueDate !== undefined) task.dueDate = fields.dueDate;
      if (fields.assigneeId !== undefined) task.assigneeId = fields.assigneeId;
      task.updatedAt = now();
      save();
      return task;
    },
    delete: (id) => {
      const idx = getStore().tasks.findIndex((t) => t.id === id);
      if (idx === -1) return false;
      getStore().tasks.splice(idx, 1);
      save();
      return true;
    },
  },

  // Comments
  comments: {
    all: () => getStore().comments,
    byId: (id) => getStore().comments.find((c) => c.id === id),
    byTask: (taskId) => getStore().comments.filter((c) => c.taskId === taskId),
    create: ({ content, authorId, taskId }) => {
      const comment = { id: uid(), content, authorId, taskId, createdAt: now() };
      getStore().comments.push(comment);
      save();
      return comment;
    },
    delete: (id) => {
      const idx = getStore().comments.findIndex((c) => c.id === id);
      if (idx === -1) return false;
      getStore().comments.splice(idx, 1);
      save();
      return true;
    },
  },
};

load();

module.exports = db;
