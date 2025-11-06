import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('user', () => null)
  const loading = useState('authLoading', () => true)

  // Get current user
  const getUser = async () => {
    loading.value = true
    try {
      const { data: { user: currentUser } } = await $supabase.auth.getUser()
      user.value = currentUser
    } catch (error) {
      console.error('Error getting user:', error)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // Sign up
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await $supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    user.value = data.user
    return data
  }

  // Sign in
  const signIn = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    user.value = data.user
    return data
  }

  // Sign out
  const signOut = async () => {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    user.value = null
    navigateTo('/login')
  }

  // Initialize auth state
  const initAuth = async () => {
    await getUser()

    // Listen for auth changes
    $supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    getUser,
    initAuth,
  }
}

