import { CONFIG } from './config.js';
import { createLocalApi } from './local-api.js';
import { createSupabaseApi } from './supabase-api.js';

export function createApi() {
  if (CONFIG.mode === 'supabase') {
    return createSupabaseApi();
  }
  return createLocalApi();
}
