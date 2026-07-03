const typeDefs = `
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks(status: TaskStatus): [Task!]!
    createdAt: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    owner: User!
    members: [User!]!
    tasks(status: TaskStatus): [Task!]!
    createdAt: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    priority: Priority!
    dueDate: String
    assignee: User
    project: Project
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    task: Task!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    tasks(
      status: TaskStatus
      priority: Priority
      assigneeId: ID
      projectId: ID
      limit: Int
      offset: Int
    ): [Task!]!
    task(id: ID!): Task
    projects: [Project!]!
    project(id: ID!): Project
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreateProjectInput {
    name: String!
    description: String
    ownerId: ID!
  }

  input CreateTaskInput {
    title: String!
    description: String
    priority: Priority
    dueDate: String
    assigneeId: ID
    projectId: ID
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
    priority: Priority
    dueDate: String
    assigneeId: ID
  }

  input AddCommentInput {
    content: String!
    authorId: ID!
    taskId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createProject(input: CreateProjectInput!): Project!
    addProjectMember(projectId: ID!, userId: ID!): Project!
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    addComment(input: AddCommentInput!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  type Subscription {
    taskCreated(projectId: ID): Task!
    taskUpdated(taskId: ID): Task!
    commentAdded(taskId: ID): Comment!
  }
`;

module.exports = typeDefs;
