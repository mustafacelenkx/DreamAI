<template>
  <div>
    <!-- Navigation -->
    <nav class="glass-card sticky top-0 z-50 mb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Icon name="noto:crescent-moon" class="text-3xl" />
            <span class="text-2xl font-bold dream-gradient-text">{{ t('app.title') }}</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <!-- Language Switcher -->
            <div class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/50">
              <Icon name="noto:globe-with-meridians" class="text-xl" />
              <select
                v-model="currentLocale"
                @change="changeLanguage"
                class="bg-transparent text-gray-700 font-medium outline-none cursor-pointer text-sm"
              >
                <option
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :value="loc.code"
                >
                  {{ loc.name }}
                </option>
              </select>
            </div>

            <!-- Navigation Links -->
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              {{ t('nav.home') }}
            </NuxtLink>

            <template v-if="user">
              <NuxtLink
                to="/dashboard"
                class="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {{ t('nav.dashboard') }}
              </NuxtLink>
              <button
                @click="handleLogout"
                class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {{ t('nav.logout') }}
              </button>
            </template>

            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {{ t('nav.login') }}
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="dream-gradient text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                {{ t('nav.register') }}
              </NuxtLink>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-gray-700 hover:text-purple-600"
          >
            <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-3xl" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-purple-100">
            <div class="flex flex-col space-y-4">
              <!-- Language Switcher -->
              <div class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/50">
                <Icon name="noto:globe-with-meridians" class="text-xl" />
                <select
                  v-model="currentLocale"
                  @change="changeLanguage"
                  class="bg-transparent text-gray-700 font-medium outline-none cursor-pointer flex-1"
                >
                  <option
                    v-for="loc in availableLocales"
                    :key="loc.code"
                    :value="loc.code"
                  >
                    {{ loc.name }}
                  </option>
                </select>
              </div>

              <NuxtLink
                to="/"
                class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.home') }}
              </NuxtLink>

              <template v-if="user">
                <NuxtLink
                  to="/dashboard"
                  class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2"
                  @click="mobileMenuOpen = false"
                >
                  {{ t('nav.dashboard') }}
                </NuxtLink>
                <button
                  @click="handleLogout"
                  class="text-gray-700 hover:text-red-600 font-medium transition-colors text-left px-3 py-2"
                >
                  {{ t('nav.logout') }}
                </button>
              </template>

              <template v-else>
                <NuxtLink
                  to="/login"
                  class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2"
                  @click="mobileMenuOpen = false"
                >
                  {{ t('nav.login') }}
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="dream-gradient text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all text-center"
                  @click="mobileMenuOpen = false"
                >
                  {{ t('nav.register') }}
                </NuxtLink>
              </template>
            </div>
          </div>
        </Transition>
      </div>
    </nav>

    <!-- Page Content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
const { locale, t, setLocale, availableLocales } = useI18n()
const { user, signOut, initAuth } = useAuth()

const currentLocale = ref(locale.value)
const mobileMenuOpen = ref(false)

// Watch for locale changes
watch(currentLocale, (newLocale) => {
  setLocale(newLocale)
})

const changeLanguage = () => {
  setLocale(currentLocale.value)
  mobileMenuOpen.value = false
}

const handleLogout = async () => {
  await signOut()
  mobileMenuOpen.value = false
}

// Initialize auth on mount
onMounted(async () => {
  await initAuth()
})
</script>

