import { uid, todayISO, offsetISO } from './utils.js';

const STORAGE_KEY = 'dayforge.professional.v1';

function seed() {
  return {
    projects: [
      { id: 'proj_work', name: 'Work', color: '#5b8def' },
      { id: 'proj_life', name: 'Personal', color: '#3dbe9f' },
    ],
    tasks: [
      {
        id: 'task_1',
        title: 'Define Supabase tables & RLS',
        notes: 'Projects + tasks with user_id ownership.',
        projectId: 'proj_work',
        priority: 3,
        due: todayISO(),
        done: false,
        createdAt: Date.now() - 86400000,
        completedAt: null,
      },
      {
        id: 'task_2',
        title: 'Wire auth screens to Supabase Auth',
        notes: 'Email/password first, OAuth later.',
        projectId: 'proj_work',
        priority: 2,
        due: offsetISO(1),
        done: false,
        createdAt: Date.now() - 3600000,
        completedAt: null,
      },
      {
        id: 'task_3',
        title: 'Ship local demo for stakeholders',
        notes: '',
        projectId: 'proj_life',
        priority: 1,
        due: '',
        done: true,
        createdAt: Date.now() - 172800000,
        completedAt: Date.now() - 7200000,
      },
    ],
  };
}

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const data = seed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
    return JSON.parse(raw);
  } catch {
    return seed();
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createLocalApi() {
  return {
    mode: 'local',

    async getSession() {
      const email = localStorage.getItem('dayforge.local.user') || 'you@dayforge.local';
      return {
        user: {
          id: 'local-user',
          email,
          name: email.split('@')[0],
        },
      };
    },

    async signIn({ email }) {
      const clean = (email || 'you@dayforge.local').trim().toLowerCase();
      localStorage.setItem('dayforge.local.user', clean);
      return this.getSession();
    },

    async signUp({ email }) {
      return this.signIn({ email });
    },

    async signOut() {
      // Keep demo data; only clear session label
      return true;
    },

    async listProjects() {
      return read().projects;
    },

    async createProject({ name, color }) {
      const data = read();
      const project = { id: uid('proj'), name, color };
      data.projects.push(project);
      write(data);
      return project;
    },

    async listTasks() {
      return read().tasks;
    },

    async createTask(payload) {
      const data = read();
      const task = {
        id: uid('task'),
        title: payload.title,
        notes: payload.notes || '',
        projectId: payload.projectId || null,
        priority: Number(payload.priority || 2),
        due: payload.due || '',
        done: false,
        createdAt: Date.now(),
        completedAt: null,
      };
      data.tasks.unshift(task);
      write(data);
      return task;
    },

    async updateTask(id, patch) {
      const data = read();
      const idx = data.tasks.findIndex((t) => t.id === id);
      if (idx < 0) throw new Error('Task not found');
      data.tasks[idx] = { ...data.tasks[idx], ...patch };
      write(data);
      return data.tasks[idx];
    },

    async deleteTask(id) {
      const data = read();
      data.tasks = data.tasks.filter((t) => t.id !== id);
      write(data);
      return true;
    },

    async exportAll() {
      return read();
    },

    async importAll(payload) {
      if (!payload?.projects || !payload?.tasks) throw new Error('Invalid backup');
      write({ projects: payload.projects, tasks: payload.tasks });
      return true;
    },
  };
}
