/**
 * Dayforge app configuration
 * ---------------------------------
 * mode:
 *   'local'    → uses browser localStorage (offline demo)
 *   'supabase' → uses Supabase Auth + Postgres
 *
 * For Supabase:
 * 1. Create a project at https://supabase.com
 * 2. Run supabase/schema.sql in the SQL Editor
 * 3. Paste Project URL + anon (public) key below
 * 4. Set mode to 'supabase'
 */

export const CONFIG = {
    appName: 'Dayforge',
    mode: 'local', // change to 'supabase' when ready

    supabaseUrl: 'https://xxxxxxxxxxxxxx.supabase.co',
    supabaseAnonKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};
