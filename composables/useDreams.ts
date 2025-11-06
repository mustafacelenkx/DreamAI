export interface Dream {
  id?: string
  user_id: string
  dream_text: string
  interpretation: string
  language: string
  created_at?: string
}

export const useDreams = () => {
  const { $supabase } = useNuxtApp()
  const { user } = useAuth()

  // Save a dream
  const saveDream = async (dreamText: string, interpretation: string, language: string) => {
    if (!user.value) throw new Error('User not authenticated')

    const { data, error } = await $supabase
      .from('dreams')
      .insert({
        user_id: user.value.id,
        dream_text: dreamText,
        interpretation,
        language,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get all user dreams
  const getUserDreams = async () => {
    if (!user.value) throw new Error('User not authenticated')

    const { data, error } = await $supabase
      .from('dreams')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Dream[]
  }

  // Get a single dream
  const getDream = async (id: string) => {
    const { data, error } = await $supabase
      .from('dreams')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Dream
  }

  // Delete a dream
  const deleteDream = async (id: string) => {
    const { error } = await $supabase
      .from('dreams')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Get dream statistics
  const getDreamStats = async () => {
    if (!user.value) throw new Error('User not authenticated')

    const { data, error } = await $supabase
      .from('dreams')
      .select('language')
      .eq('user_id', user.value.id)

    if (error) throw error

    const total = data.length
    const byLanguage = data.reduce((acc: any, dream) => {
      acc[dream.language] = (acc[dream.language] || 0) + 1
      return acc
    }, {})

    return {
      total,
      byLanguage,
    }
  }

  return {
    saveDream,
    getUserDreams,
    getDream,
    deleteDream,
    getDreamStats,
  }
}

