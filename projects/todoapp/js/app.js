import { CONFIG } from './config.js';
import { createApi } from './api.js';
import {
  escapeHtml,
  formatDue,
  initials,
  priorityLabel,
  todayISO,
} from './utils.js';

const THEME_KEY = 'dayforge.theme';

class DayforgeApp {
  constructor() {
    this.api = createApi();
    this.user = null;
    this.projects = [];
    this.tasks = [];
    this.ui = {
      screen: 'landing', // landing | auth | app
      authMode: 'signin', // signin | signup
      view: 'inbox',
      projectId: null,
      search: '',
      sort: 'created',
      priorityFilter: 'all',
    };

    this.els = this.cacheDom();
    this.bindEvents();
    this.applyTheme(localStorage.getItem(THEME_KEY) || 'dark');
    this.els.backendModeLabel.textContent = CONFIG.mode;
    this.boot();
  }

  cacheDom() {
    const $ = (id) => document.getElementById(id);
    return {
      landing: $('landing'),
      authScreen: $('authScreen'),
      app: $('app'),
      sidebar: $('sidebar'),
      backendModeLabel: $('backendModeLabel'),
      goAuthBtn: $('goAuthBtn'),
      goWorkspaceBtn: $('goWorkspaceBtn'),
      heroStartBtn: $('heroStartBtn'),
      themeBtnLanding: $('themeBtnLanding'),
      themeBtnApp: $('themeBtnApp'),
      authForm: $('authForm'),
      authTitle: $('authTitle'),
      authSubtitle: $('authSubtitle'),
      authEmail: $('authEmail'),
      authPassword: $('authPassword'),
      passwordField: $('passwordField'),
      authSubmitBtn: $('authSubmitBtn'),
      authToggleModeBtn: $('authToggleModeBtn'),
      authSwitchText: $('authSwitchText'),
      authBackBtn: $('authBackBtn'),
      userAvatar: $('userAvatar'),
      userName: $('userName'),
      userEmail: $('userEmail'),
      projectList: $('projectList'),
      addProjectBtn: $('addProjectBtn'),
      openSidebarBtn: $('openSidebarBtn'),
      closeSidebarBtn: $('closeSidebarBtn'),
      composer: $('composer'),
      taskTitle: $('taskTitle'),
      taskNotes: $('taskNotes'),
      taskProject: $('taskProject'),
      taskPriority: $('taskPriority'),
      taskDue: $('taskDue'),
      taskList: $('taskList'),
      emptyState: $('emptyState'),
      searchInput: $('searchInput'),
      sortSelect: $('sortSelect'),
      viewTitle: $('viewTitle'),
      viewSubtitle: $('viewSubtitle'),
      priorityFilters: $('priorityFilters'),
      statActive: $('statActive'),
      statToday: $('statToday'),
      statDone: $('statDone'),
      exportBtn: $('exportBtn'),
      importBtn: $('importBtn'),
      importFile: $('importFile'),
      signOutBtn: $('signOutBtn'),
      editModal: $('editModal'),
      editForm: $('editForm'),
      editId: $('editId'),
      editTitle: $('editTitle'),
      editNotes: $('editNotes'),
      editProject: $('editProject'),
      editPriority: $('editPriority'),
      editDue: $('editDue'),
      projectModal: $('projectModal'),
      projectForm: $('projectForm'),
      projectName: $('projectName'),
      projectColor: $('projectColor'),
      toastStack: $('toastStack'),
      navBtns: [...document.querySelectorAll('.nav-btn[data-view]')],
      countEls: {
        inbox: document.querySelector('[data-count="inbox"]'),
        today: document.querySelector('[data-count="today"]'),
        upcoming: document.querySelector('[data-count="upcoming"]'),
        completed: document.querySelector('[data-count="completed"]'),
      },
    };
  }

  async boot() {
    try {
      const session = await this.api.getSession();
      if (session.user && CONFIG.mode === 'supabase') {
        this.user = session.user;
        await this.enterApp();
      } else {
        this.showScreen('landing');
      }
    } catch (err) {
      console.error(err);
      this.showScreen('landing');
      this.toast(err.message || 'Failed to start app');
    }
  }

  bindEvents() {
    const e = this.els;

    e.goAuthBtn.addEventListener('click', () => this.showScreen('auth'));
    e.goWorkspaceBtn.addEventListener('click', () => this.showScreen('auth'));
    e.heroStartBtn.addEventListener('click', () => this.showScreen('auth'));
    e.authBackBtn.addEventListener('click', () => this.showScreen('landing'));

    e.themeBtnLanding.addEventListener('click', () => this.toggleTheme());
    e.themeBtnApp.addEventListener('click', () => this.toggleTheme());

    e.authToggleModeBtn.addEventListener('click', () => {
      this.ui.authMode = this.ui.authMode === 'signin' ? 'signup' : 'signin';
      this.renderAuthCopy();
    });

    e.authForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.handleAuthSubmit();
    });

    e.openSidebarBtn.addEventListener('click', () => e.sidebar.classList.add('is-open'));
    e.closeSidebarBtn.addEventListener('click', () => e.sidebar.classList.remove('is-open'));

    e.navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.ui.view = btn.dataset.view;
        this.ui.projectId = null;
        e.sidebar.classList.remove('is-open');
        this.render();
      });
    });

    e.addProjectBtn.addEventListener('click', () => {
      e.projectName.value = '';
      e.projectModal.showModal();
    });

    e.projectForm.addEventListener('submit', async (event) => {
      const action = event.submitter?.value || 'cancel';
      if (action !== 'save') return;
      const name = e.projectName.value.trim();
      if (!name) return;
      try {
        await this.api.createProject({ name, color: e.projectColor.value });
        await this.refreshData();
        this.toast(`Project “${name}” created`);
      } catch (err) {
        this.toast(err.message || 'Could not create project');
      }
    });

    e.composer.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.createTask();
    });

    e.searchInput.addEventListener('input', () => {
      this.ui.search = e.searchInput.value.trim().toLowerCase();
      this.renderTasks();
    });

    e.sortSelect.addEventListener('change', () => {
      this.ui.sort = e.sortSelect.value;
      this.renderTasks();
    });

    e.priorityFilters.addEventListener('click', (event) => {
      const chip = event.target.closest('[data-priority]');
      if (!chip) return;
      this.ui.priorityFilter = chip.dataset.priority;
      [...e.priorityFilters.children].forEach((c) => c.classList.toggle('is-active', c === chip));
      this.renderTasks();
    });

    e.taskList.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.closest('.task').dataset.id;
      const action = btn.dataset.action;
      if (action === 'toggle') await this.toggleTask(id);
      if (action === 'edit') this.openEdit(id);
      if (action === 'delete') await this.removeTask(id);
    });

    e.editForm.addEventListener('submit', async (event) => {
      const action = event.submitter?.value || 'cancel';
      const id = e.editId.value;
      if (action === 'delete') {
        await this.removeTask(id);
        return;
      }
      if (action === 'save') {
        try {
          await this.api.updateTask(id, {
            title: e.editTitle.value.trim(),
            notes: e.editNotes.value.trim(),
            projectId: e.editProject.value || null,
            priority: Number(e.editPriority.value),
            due: e.editDue.value,
          });
          await this.refreshData();
          this.toast('Task updated');
        } catch (err) {
          this.toast(err.message || 'Update failed');
        }
      }
    });

    e.exportBtn.addEventListener('click', async () => {
      try {
        const data = await this.api.exportAll();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dayforge-${todayISO()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.toast('Backup exported');
      } catch (err) {
        this.toast(err.message || 'Export failed');
      }
    });

    e.importBtn.addEventListener('click', () => e.importFile.click());
    e.importFile.addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        await this.api.importAll(JSON.parse(text));
        await this.refreshData();
        this.toast('Import complete');
      } catch (err) {
        this.toast(err.message || 'Import failed');
      } finally {
        e.importFile.value = '';
      }
    });

    e.signOutBtn.addEventListener('click', async () => {
      try {
        await this.api.signOut();
      } catch {
        /* ignore */
      }
      this.user = null;
      this.showScreen('landing');
      this.toast('Signed out');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        e.sidebar.classList.remove('is-open');
      }
    });
  }

  renderAuthCopy() {
    const signin = this.ui.authMode === 'signin';
    this.els.authTitle.textContent = signin ? 'Sign in' : 'Create account';
    this.els.authSubtitle.textContent = signin
      ? 'Continue to your professional workspace.'
      : 'Set up your Dayforge workspace.';
    this.els.authSubmitBtn.textContent = signin ? 'Sign in' : 'Create account';
    this.els.authSwitchText.textContent = signin ? 'Need an account?' : 'Already have an account?';
    this.els.authToggleModeBtn.textContent = signin ? 'Create one' : 'Sign in';

    // Local mode does not require a real password
    const needsPassword = CONFIG.mode === 'supabase';
    this.els.passwordField.classList.toggle('is-hidden', !needsPassword);
    this.els.authPassword.required = needsPassword;
  }

  async handleAuthSubmit() {
    const email = this.els.authEmail.value.trim();
    const password = this.els.authPassword.value;

    try {
      if (this.ui.authMode === 'signup') {
        const result = await this.api.signUp({ email, password });
        if (result.needsEmailConfirm) {
          this.toast('Check your email to confirm, then sign in');
          this.ui.authMode = 'signin';
          this.renderAuthCopy();
          return;
        }
        this.user = result.user;
      } else {
        const result = await this.api.signIn({ email, password });
        this.user = result.user;
      }
      await this.enterApp();
    } catch (err) {
      this.toast(err.message || 'Authentication failed');
    }
  }

  showScreen(name) {
    this.ui.screen = name;
    this.els.landing.classList.toggle('is-hidden', name !== 'landing');
    this.els.authScreen.classList.toggle('is-hidden', name !== 'auth');
    this.els.app.classList.toggle('is-hidden', name !== 'app');
    this.els.authScreen.setAttribute('aria-hidden', name === 'auth' ? 'false' : 'true');
    this.els.app.setAttribute('aria-hidden', name === 'app' ? 'false' : 'true');
    if (name === 'auth') this.renderAuthCopy();
  }

  async enterApp() {
    if (!this.user) {
      const session = await this.api.getSession();
      this.user = session.user;
    }
    this.showScreen('app');
    this.els.userName.textContent = this.user?.name || 'Operator';
    this.els.userEmail.textContent = this.user?.email || 'local';
    this.els.userAvatar.textContent = initials(this.user?.name || this.user?.email || 'DF');
    await this.refreshData();
  }

  async refreshData() {
    const [projects, tasks] = await Promise.all([
      this.api.listProjects(),
      this.api.listTasks(),
    ]);
    this.projects = projects;
    this.tasks = tasks;
    this.hydrateSelects();
    this.render();
  }

  hydrateSelects() {
    const options = [
      '<option value="">Inbox (no project)</option>',
      ...this.projects.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`),
    ].join('');
    this.els.taskProject.innerHTML = options;
    this.els.editProject.innerHTML = options;
  }

  async createTask() {
    const title = this.els.taskTitle.value.trim();
    if (!title) return;
    try {
      await this.api.createTask({
        title,
        notes: this.els.taskNotes.value.trim(),
        projectId: this.els.taskProject.value || null,
        priority: Number(this.els.taskPriority.value),
        due: this.els.taskDue.value,
      });
      this.els.composer.reset();
      this.els.taskPriority.value = '2';
      await this.refreshData();
      this.toast('Task added');
    } catch (err) {
      this.toast(err.message || 'Could not add task');
    }
  }

  async toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      await this.api.updateTask(id, {
        done: !task.done,
        completedAt: !task.done ? Date.now() : null,
      });
      await this.refreshData();
    } catch (err) {
      this.toast(err.message || 'Could not update task');
    }
  }

  async removeTask(id) {
    try {
      await this.api.deleteTask(id);
      await this.refreshData();
      this.toast('Task deleted');
    } catch (err) {
      this.toast(err.message || 'Could not delete task');
    }
  }

  openEdit(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    this.hydrateSelects();
    this.els.editId.value = task.id;
    this.els.editTitle.value = task.title;
    this.els.editNotes.value = task.notes || '';
    this.els.editProject.value = task.projectId || '';
    this.els.editPriority.value = String(task.priority);
    this.els.editDue.value = task.due || '';
    this.els.editModal.showModal();
  }

  getVisibleTasks() {
    const today = todayISO();
    let list = [...this.tasks];

    if (this.ui.projectId) {
      list = list.filter((t) => !t.done && t.projectId === this.ui.projectId);
    } else if (this.ui.view === 'inbox') {
      list = list.filter((t) => !t.done && !t.projectId);
    } else if (this.ui.view === 'today') {
      list = list.filter((t) => !t.done && t.due && t.due <= today);
    } else if (this.ui.view === 'upcoming') {
      list = list.filter((t) => !t.done && t.due && t.due > today);
    } else if (this.ui.view === 'completed') {
      list = list.filter((t) => t.done);
    }

    if (this.ui.priorityFilter !== 'all') {
      list = list.filter((t) => String(t.priority) === this.ui.priorityFilter);
    }

    if (this.ui.search) {
      list = list.filter((t) => `${t.title} ${t.notes || ''}`.toLowerCase().includes(this.ui.search));
    }

    list.sort((a, b) => {
      if (this.ui.sort === 'priority') return b.priority - a.priority || b.createdAt - a.createdAt;
      if (this.ui.sort === 'due') {
        if (!a.due && !b.due) return b.createdAt - a.createdAt;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return a.due.localeCompare(b.due);
      }
      if (this.ui.sort === 'alpha') return a.title.localeCompare(b.title);
      return b.createdAt - a.createdAt;
    });

    return list;
  }

  render() {
    const today = todayISO();
    const active = this.tasks.filter((t) => !t.done);
    const dueToday = active.filter((t) => t.due && t.due <= today);
    const upcoming = active.filter((t) => t.due && t.due > today);
    const done = this.tasks.filter((t) => t.done);

    this.els.countEls.inbox.textContent = active.filter((t) => !t.projectId).length;
    this.els.countEls.today.textContent = dueToday.length;
    this.els.countEls.upcoming.textContent = upcoming.length;
    this.els.countEls.completed.textContent = done.length;

    this.els.statActive.textContent = active.length;
    this.els.statToday.textContent = dueToday.length;
    this.els.statDone.textContent = done.length;

    const titles = {
      inbox: ['Inbox', 'Capture and triage unassigned work.'],
      today: ['Today', 'Due today or overdue.'],
      upcoming: ['Upcoming', 'Scheduled for later.'],
      completed: ['Completed', 'Finished work.'],
    };

    if (this.ui.projectId) {
      const project = this.projects.find((p) => p.id === this.ui.projectId);
      this.els.viewTitle.textContent = project?.name || 'Project';
      this.els.viewSubtitle.textContent = 'Active tasks in this project.';
    } else {
      const [title, subtitle] = titles[this.ui.view] || titles.inbox;
      this.els.viewTitle.textContent = title;
      this.els.viewSubtitle.textContent = subtitle;
    }

    this.els.navBtns.forEach((btn) => {
      btn.classList.toggle('is-active', !this.ui.projectId && btn.dataset.view === this.ui.view);
    });

    this.els.projectList.innerHTML = this.projects
      .map((p) => {
        const count = active.filter((t) => t.projectId === p.id).length;
        const on = this.ui.projectId === p.id ? 'is-active' : '';
        return `
          <button type="button" class="project-btn ${on}" data-project-id="${p.id}">
            <span style="display:flex;align-items:center;gap:.55rem">
              <span class="dot" style="background:${p.color}"></span>
              ${escapeHtml(p.name)}
            </span>
            <span class="count">${count}</span>
          </button>
        `;
      })
      .join('');

    [...this.els.projectList.querySelectorAll('[data-project-id]')].forEach((btn) => {
      btn.addEventListener('click', () => {
        this.ui.projectId = btn.dataset.projectId;
        this.ui.view = 'project';
        this.els.sidebar.classList.remove('is-open');
        this.render();
      });
    });

    this.renderTasks();
  }

  renderTasks() {
    const tasks = this.getVisibleTasks();
    this.els.emptyState.classList.toggle('is-hidden', tasks.length > 0);
    this.els.taskList.innerHTML = tasks
      .map((task) => {
        const project = this.projects.find((p) => p.id === task.projectId);
        return `
          <li class="task ${task.done ? 'is-done' : ''}" data-id="${task.id}">
            <button type="button" class="check ${task.done ? 'is-on' : ''}" data-action="toggle">✓</button>
            <div>
              <div class="task__title">${escapeHtml(task.title)}</div>
              ${task.notes ? `<p class="task__notes">${escapeHtml(task.notes)}</p>` : ''}
              <div class="meta">
                <span class="badge p${task.priority}">${priorityLabel(task.priority)}</span>
                <span class="badge">${formatDue(task.due)}</span>
                ${
                  project
                    ? `<span class="badge" style="border-color:${project.color}55">${escapeHtml(project.name)}</span>`
                    : '<span class="badge">Inbox</span>'
                }
              </div>
            </div>
            <div class="task__actions">
              <button type="button" class="icon-btn" data-action="edit" aria-label="Edit">✎</button>
              <button type="button" class="icon-btn" data-action="delete" aria-label="Delete">🗑</button>
            </div>
          </li>
        `;
      })
      .join('');
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  toggleTheme() {
    const now = document.documentElement.getAttribute('data-theme');
    this.applyTheme(now === 'dark' ? 'light' : 'dark');
  }

  toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    this.els.toastStack.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
}

new DayforgeApp();
