import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ubywxevxytjqeolxptjg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieXd4ZXZ4eXRqcWVvbHhwdGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDAwNzMsImV4cCI6MjA4MDc3NjA3M30.HkB8AyAnngrK-cnsJDjwHmsgBq-N_SJsrbODTMTvxns'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
