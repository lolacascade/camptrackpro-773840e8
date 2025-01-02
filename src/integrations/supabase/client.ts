import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://mlptncnvjlforntqjvbo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1scHRuY252amxmb3JudHFqdmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MDQ0NjMsImV4cCI6MjA0OTA4MDQ2M30.otKo7p21wIiQ7ACkKSq-vZrorOuIsggAtreV6PWFt_k";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);