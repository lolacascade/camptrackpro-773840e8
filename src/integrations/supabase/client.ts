import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mlptncnvjlforntqjvbo.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1scHRuY252amxmb3JudHFqdmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MDQ0NjMsImV4cCI6MjA0OTA4MDQ2M30.otKo7p21wIiQ7ACkKSq-vZrorOuIsggAtreV6PWFt_k";

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});