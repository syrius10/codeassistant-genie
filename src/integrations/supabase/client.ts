// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gkmwqdwhmfyemlmzbnmp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrbXdxZHdobWZ5ZW1sbXpibm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NTgwNzksImV4cCI6MjA1OTIzNDA3OX0.JsaS_pLB-GONaBQgnzGCLRiXlxvquv0OUKkpNhkXsGU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);