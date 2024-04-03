import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://mwldvohktrqlbyodehlt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bGR2b2hrdHJxbGJ5b2RlaGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxNDA3OTksImV4cCI6MjAxNzcxNjc5OX0.-Wu8GAAcQVyleFdeAV8UOyzFzHed9jMMNtJUJRrJ10c'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})


export default function useSupabase () {
  return { supabase}
}
