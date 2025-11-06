<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center justify-center mb-4">
          <Icon name="noto:crescent-moon" class="text-5xl mr-2" />
          <h1 class="text-4xl font-bold dream-gradient-text">{{ t('app.title') }}</h1>
        </NuxtLink>
        <h2 class="text-2xl font-bold text-gray-800">{{ t('auth.login.title') }}</h2>
        <p class="text-gray-600 mt-2">{{ t('auth.login.subtitle') }}</p>
      </div>

      <!-- Login Form -->
      <div class="glass-card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              {{ t('auth.login.email') }}
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              {{ t('auth.login.password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full dream-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ loading ? t('auth.login.submit') + '...' : t('auth.login.submit') }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="mt-6 text-center text-gray-600">
          {{ t('auth.login.noAccount') }}
          <NuxtLink to="/register" class="text-purple-600 hover:text-purple-700 font-semibold">
            {{ t('auth.login.signUp') }}
          </NuxtLink>
        </p>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-gray-600 hover:text-purple-600 inline-flex items-center space-x-2">
          <Icon name="mdi:arrow-left" />
          <span>{{ t('nav.home') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: false,
})

const { t } = useI18n()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await signIn(email.value, password.value)
    navigateTo('/dashboard')
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err.message || t('auth.errors.generic')
  } finally {
    loading.value = false
  }
}
</script>

