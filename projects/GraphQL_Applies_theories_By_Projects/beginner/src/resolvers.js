const users = require('../data/users');
const posts = require('../data/posts');

function enrichUser(u) {
  return { ...u, posts: posts.filter((p) => p.authorId === u.id) };
}

function enrichPost(p) {
  return { ...p, author: users.find((u) => u.id === p.authorId) };
}

const root = {
  users: () => users.map(enrichUser),

  user: ({ id }) => {
    const u = users.find((u) => u.id === id);
    return u ? enrichUser(u) : null;
  },

  posts: () => posts.map(enrichPost),

  post: ({ id }) => {
    const p = posts.find((p) => p.id === id);
    return p ? enrichPost(p) : null;
  },

  createUser: ({ input }) => {
    const newUser = {
      id: String(users.length + 1),
      name: input.name,
      email: input.email,
      age: input.age || null,
    };
    users.push(newUser);
    return enrichUser(newUser);
  },

  createPost: ({ input }) => {
    const author = users.find((u) => u.id === input.authorId);
    if (!author) {
      throw new Error(`User with id ${input.authorId} not found`);
    }
    const newPost = {
      id: String(posts.length + 1),
      title: input.title,
      content: input.content,
      authorId: input.authorId,
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return enrichPost(newPost);
  },

  deleteUser: ({ id }) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};

module.exports = root;
