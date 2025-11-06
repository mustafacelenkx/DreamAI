export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, getUser } = useAuth()
  
  // Get user if not already loaded
  if (user.value === null) {
    await getUser()
  }

  // If user is not authenticated, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }
})

