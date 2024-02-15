import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL="https://vieaewaxbebsvimzymdb.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZWFld2F4YmVic3ZpbXp5bWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzA1NTcsImV4cCI6MTk2MzU0NjU1N30.yDGicg-g3byasU6j95kHlYQejvjYbHDnhuhJgoo5qa0"
const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)