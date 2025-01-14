import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

const user = ref(null)
export default function useAuthUser () {

const { supabase} = useSupabase()



  const login = async ( { email, password}) => {
    const { user, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return user
  }

  const loginWithSocialProvider = async (provider) =>{
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) throw error
    return user

  }

  const logout = async () => {
    const { error} = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

const register = async ({name, username, password, email,... meta})=> {
  const { user, error} = await supabase.auth.signUp(
    { name, username, password, email},
    {
      data: meta,
      redirectTo: '${window.location.origin}/me?fromEmail=registrationConfirmation'
    }

  )
  if (error) throw error
  return user
}

const update = async (data) => {
  const {user, error} = await supabase.auth.update(data)
  if (error) throw error
  return user
}

const sendPasswordRestEmail = async () => {
const {user, error} = await supabase.auth.api.resetPasswordForEmail(email)
if (error) throw error
return user
}

return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail
}
}
