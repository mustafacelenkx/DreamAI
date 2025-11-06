<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12 animate-float">
        <div class="flex items-center justify-center mb-4">
          <Icon name="noto:crescent-moon" class="text-6xl mr-3" />
          <h1 class="text-5xl sm:text-6xl font-bold dream-gradient-text">
            {{ t('app.title') }}
          </h1>
        </div>
        <p class="text-gray-600 text-lg sm:text-xl">
          {{ t('app.subtitle') }}
        </p>
      </header>

      <!-- Main Card -->
      <div class="glass-card p-6 sm:p-8 mb-8">
        <form @submit.prevent="interpretDream" class="space-y-6">
          <!-- Dream Input -->
          <div>
            <label for="dream" class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="noto:sparkles" class="inline text-xl mr-1" />
              {{ t('form.label') }}
            </label>
            <textarea
              id="dream"
              v-model="dreamText"
              rows="6"
              class="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none"
              :placeholder="t('form.placeholder')"
              :disabled="isLoading"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!dreamText.trim() || isLoading"
            class="w-full dream-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            <Icon
              v-if="isLoading"
              name="svg-spinners:ring-resize"
              class="text-2xl"
            />
            <Icon
              v-else
              name="noto:crystal-ball"
              class="text-2xl"
            />
            <span>{{ isLoading ? t('form.submitting') : t('form.submit') }}</span>
          </button>
        </form>
      </div>

      <!-- Interpretation Result -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform translate-y-8"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-8"
      >
        <div v-if="interpretation" class="glass-card p-6 sm:p-8">
          <div class="flex items-start space-x-3 mb-4">
            <Icon name="noto:thought-balloon" class="text-3xl flex-shrink-0 mt-1" />
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ t('result.title') }}</h2>
              <div class="h-1 w-20 dream-gradient rounded-full"></div>
            </div>
          </div>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {{ interpretation }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <!-- Save Dream Button (only if logged in) -->
            <button
              v-if="user && !dreamSaved"
              @click="handleSaveDream"
              :disabled="savingDream"
              class="flex-1 sm:flex-initial dream-gradient text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Icon
                :name="savingDream ? 'svg-spinners:ring-resize' : 'noto:floppy-disk'"
                class="text-xl"
              />
              <span>{{ savingDream ? t('form.saving') : t('form.save') }}</span>
            </button>

            <!-- Saved Message -->
            <div
              v-if="dreamSaved"
              class="flex-1 sm:flex-initial bg-green-50 border-2 border-green-200 text-green-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2"
            >
              <Icon name="noto:check-mark" class="text-xl" />
              <span>{{ t('form.saved') }}</span>
            </div>

            <!-- New Dream Button -->
            <button
              @click="resetForm"
              class="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Icon name="noto:sparkles" class="text-xl" />
              <span>{{ t('form.newDream') }}</span>
            </button>
          </div>

          <!-- Login Prompt (if not logged in) -->
          <div v-if="!user" class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <p class="text-sm text-purple-700 text-center">
              <NuxtLink to="/login" class="font-semibold hover:underline">{{ t('nav.login') }}</NuxtLink>
              {{ locale === 'tr' ? 'yapın veya' : 'or' }}
              <NuxtLink to="/register" class="font-semibold hover:underline">{{ t('nav.register') }}</NuxtLink>
              {{ locale === 'tr' ? 'olun rüyalarınızı kaydetmek için' : 'to save your dreams' }}
            </p>
          </div>
        </div>
      </Transition>

      <!-- Error Message -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
      >
        <div
          v-if="error"
          class="glass-card p-4 sm:p-6 bg-red-50/80 border-red-200"
        >
          <div class="flex items-start space-x-3">
            <Icon name="noto:cross-mark" class="text-2xl flex-shrink-0" />
            <div>
              <h3 class="font-semibold text-red-800 mb-1">{{ t('error.title') }}</h3>
              <p class="text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Footer -->
      <footer class="mt-12 text-center text-gray-600 text-sm">
        <p class="flex items-center justify-center space-x-2">
          <Icon name="noto:magic-wand" class="text-lg" />
          <span>{{ t('app.poweredBy') }}</span>
        </p>
        <p class="mt-2">
          <a
            href="https://github.com/mustafacelenkx/DreamAI"
            target="_blank"
            class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center space-x-1"
          >
            <Icon name="mdi:github" class="text-lg" />
            <span>GitHub</span>
          </a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t, setLocale, availableLocales } = useI18n()
const { user } = useAuth()
const { saveDream } = useDreams()

const dreamText = ref('')
const interpretation = ref('')
const isLoading = ref(false)
const error = ref('')
const savingDream = ref(false)
const dreamSaved = ref(false)

const interpretDream = async () => {
  if (!dreamText.value.trim()) return

  isLoading.value = true
  error.value = ''
  interpretation.value = ''
  dreamSaved.value = false

  try {
    // Create language-specific prompt
    const promptTemplate = locale.value === 'tr' 
      ? `Lütfen aşağıdaki rüyayı profesyonel bir rüya yorumcusu gibi yorumla. Yorumun Türkçe, anlamlı, pozitif ve yapıcı olsun. Rüyanın sembolik anlamlarını ve olası mesajlarını açıkla:

"${dreamText.value}"

Not: Yorumun en az 3-4 paragraf olsun ve rüyadaki önemli sembolleri ele al.`
      : `Please interpret the following dream like a professional dream interpreter. Your interpretation should be in English, meaningful, positive, and constructive. Explain the symbolic meanings and possible messages of the dream:

"${dreamText.value}"

Note: Your interpretation should be at least 3-4 paragraphs and address important symbols in the dream.`

    const response = await $fetch<string>(
      `https://text.pollinations.ai/${encodeURIComponent(promptTemplate)}`,
      {
        method: 'GET',
      }
    )

    interpretation.value = response
  } catch (err) {
    console.error('Error interpreting dream:', err)
    error.value = t('error.message')
  } finally {
    isLoading.value = false
  }
}

const handleSaveDream = async () => {
  if (!user.value || !dreamText.value || !interpretation.value) return

  savingDream.value = true
  try {
    await saveDream(dreamText.value, interpretation.value, locale.value)
    dreamSaved.value = true
  } catch (err) {
    console.error('Error saving dream:', err)
    error.value = t('error.message')
  } finally {
    savingDream.value = false
  }
}

const resetForm = () => {
  dreamText.value = ''
  interpretation.value = ''
  error.value = ''
  dreamSaved.value = false
}
</script>
