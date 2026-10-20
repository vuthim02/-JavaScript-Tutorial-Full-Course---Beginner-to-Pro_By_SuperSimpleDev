# Dayforge — Professional full-stack ready Todo

A production-style task workspace with:

- Marketing landing page
- Auth screens (Sign in / Sign up)
- App shell (Inbox, Today, Upcoming, Completed, Projects)
- Swappable backend: **localStorage** or **Supabase**

## Project structure

```text
todoapp/
├── index.html
├── css/main.css
├── js/
│   ├── config.js          ← switch backend here
│   ├── api.js             ← picks local or supabase
│   ├── local-api.js       ← offline demo backend
│   ├── supabase-api.js    ← Supabase Auth + Postgres
│   ├── utils.js
│   └── app.js             ← UI / screens
└── supabase/
    ├── schema.sql         ← tables + RLS policies
    └── .env.example
```

## Run locally

Open `index.html` with a local static server (ES modules need http, not always `file://`):

```bash
cd projects/todoapp
python3 -m http.server 5173
```

Then visit: http://localhost:5173

Default mode is `local` (no Supabase account needed).

## Connect Supabase (when you are ready)

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run `supabase/schema.sql`
3. Copy **Project URL** + **anon public key** from Project Settings → API
4. Edit `js/config.js`:

```js
export const CONFIG = {
  appName: 'Dayforge',
  mode: 'supabase',
  supabaseUrl: 'https://xxxx.supabase.co',
  supabaseAnonKey: 'eyJhbGciOi...',
};
```

5. Enable Email auth in Supabase → Authentication → Providers
6. Refresh the app and use Sign up / Sign in

## Architecture (how full-stack maps)

| Layer | Today | Next |
|---|---|---|
| Frontend | HTML/CSS/JS modules | Keep, or move to React/Next later |
| Backend API | `js/*-api.js` in browser | Same client calls Supabase |
| Database | localStorage | Supabase Postgres (`projects`, `tasks`) |
| Auth | Local demo identity | Supabase Auth + RLS |

`app.js` never talks to storage directly. It only calls the API interface:

- `getSession / signIn / signUp / signOut`
- `listProjects / createProject`
- `listTasks / createTask / updateTask / deleteTask`

That means you can grow into a real backend without rewriting the UI.

## Suggested learning path

1. Use **local mode** and finish UI features you care about
2. Create Supabase project + run `schema.sql`
3. Flip `CONFIG.mode = 'supabase'`
4. Test sign-up, create project, create task
5. Later: Realtime subscriptions, Edge Functions, profiles table

## Notes

- The anon key is safe to use in frontend code, but always keep **RLS enabled**
- Never put the **service_role** key in frontend code
- For production hosting: Vercel / Netlify / Cloudflare Pages + custom domain
