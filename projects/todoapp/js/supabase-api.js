import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from './config.js';

function mapProject(row) {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
  };
}

function mapTask(row) {
  return {
    id: row.id,
    title: row.title,
    notes: row.notes || '',
    projectId: row.project_id,
    priority: row.priority,
    due: row.due_date || '',
    done: row.is_done,
    createdAt: new Date(row.created_at).getTime(),
    completedAt: row.completed_at ? new Date(row.completed_at).getTime() : null,
  };
}

export function createSupabaseApi() {
  if (!CONFIG.supabaseUrl || CONFIG.supabaseUrl.includes('YOUR_PROJECT')) {
    throw new Error('Set supabaseUrl and supabaseAnonKey in js/config.js');
  }

  const client = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return {
    mode: 'supabase',
    client,

    async getSession() {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      const user = data.session?.user;
      if (!user) return { user: null };
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        },
      };
    },

    async signIn({ email, password }) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.email?.split('@')[0] || 'User',
        },
      };
    },

    async signUp({ email, password }) {
      const { data, error } = await client.auth.signUp({ email, password });
      if (error) throw error;
      return {
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email,
              name: data.user.email?.split('@')[0] || 'User',
            }
          : null,
        needsEmailConfirm: !data.session,
      };
    },

    async signOut() {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      return true;
    },

    async listProjects() {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(mapProject);
    },

    async createProject({ name, color }) {
      const session = await this.getSession();
      const { data, error } = await client
        .from('projects')
        .insert({
          name,
          color,
          user_id: session.user.id,
        })
        .select()
        .single();
      if (error) throw error;
      return mapProject(data);
    },

    async listTasks() {
      const { data, error } = await client
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapTask);
    },

    async createTask(payload) {
      const session = await this.getSession();
      const { data, error } = await client
        .from('tasks')
        .insert({
          user_id: session.user.id,
          title: payload.title,
          notes: payload.notes || '',
          project_id: payload.projectId || null,
          priority: Number(payload.priority || 2),
          due_date: payload.due || null,
          is_done: false,
        })
        .select()
        .single();
      if (error) throw error;
      return mapTask(data);
    },

    async updateTask(id, patch) {
      const row = {};
      if (patch.title !== undefined) row.title = patch.title;
      if (patch.notes !== undefined) row.notes = patch.notes;
      if (patch.projectId !== undefined) row.project_id = patch.projectId;
      if (patch.priority !== undefined) row.priority = patch.priority;
      if (patch.due !== undefined) row.due_date = patch.due || null;
      if (patch.done !== undefined) {
        row.is_done = patch.done;
        row.completed_at = patch.done ? new Date().toISOString() : null;
      }
      if (patch.completedAt !== undefined) {
        row.completed_at = patch.completedAt
          ? new Date(patch.completedAt).toISOString()
          : null;
      }

      const { data, error } = await client
        .from('tasks')
        .update(row)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return mapTask(data);
    },

    async deleteTask(id) {
      const { error } = await client.from('tasks').delete().eq('id', id);
      if (error) throw error;
      return true;
    },

    async exportAll() {
      const [projects, tasks] = await Promise.all([this.listProjects(), this.listTasks()]);
      return { projects, tasks };
    },

    async importAll() {
      throw new Error('Import is available in local mode. For Supabase, insert via SQL or app UI.');
    },
  };
}
