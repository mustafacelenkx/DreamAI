<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold dream-gradient-text mb-2">{{ t('dashboard.title') }}</h1>
        <p class="text-gray-600">{{ user?.user_metadata?.full_name || user?.email }}</p>
      </div>

      <!-- Stats -->
      <div v-if="stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass-card p-6">
          <div class="flex items-center space-x-3">
            <Icon name="noto:crescent-moon" class="text-4xl" />
            <div>
              <p class="text-gray-600 text-sm">{{ t('dashboard.total') }}</p>
              <p class="text-3xl font-bold text-gray-800">{{ stats.total }}</p>
            </div>
          </div>
        </div>
        
        <div class="glass-card p-6">
          <div class="flex items-center space-x-3">
            <Icon name="noto:flag-turkey" class="text-4xl" />
            <div>
              <p class="text-gray-600 text-sm">Türkçe</p>
              <p class="text-3xl font-bold text-gray-800">{{ stats.byLanguage.tr || 0 }}</p>
            </div>
          </div>
        </div>
        
        <div class="glass-card p-6">
          <div class="flex items-center space-x-3">
            <Icon name="noto:flag-united-states" class="text-4xl" />
            <div>
              <p class="text-gray-600 text-sm">English</p>
              <p class="text-3xl font-bold text-gray-800">{{ stats.byLanguage.en || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dreams List -->
      <div class="glass-card p-6 sm:p-8">
        <div v-if="loading" class="text-center py-12">
          <Icon name="svg-spinners:ring-resize" class="text-6xl mx-auto text-purple-600" />
          <p class="text-gray-600 mt-4">Loading...</p>
        </div>

        <div v-else-if="dreams.length === 0" class="text-center py-12">
          <Icon name="noto:sleeping-face" class="text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ t('dashboard.empty') }}</h3>
          <p class="text-gray-600 mb-6">{{ t('dashboard.emptyDesc') }}</p>
          <NuxtLink
            to="/"
            class="inline-flex items-center space-x-2 dream-gradient text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all"
          >
            <Icon name="noto:sparkles" class="text-xl" />
            <span>{{ t('nav.home') }}</span>
          </NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="dream in dreams"
            :key="dream.id"
            class="border-2 border-purple-100 rounded-xl p-6 hover:border-purple-300 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <Icon name="noto:crescent-moon" class="text-2xl" />
                  <span class="text-sm text-gray-500">
                    {{ formatDate(dream.created_at) }}
                  </span>
                  <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    {{ dream.language.toUpperCase() }}
                  </span>
                </div>
                <p class="text-gray-700 line-clamp-2">{{ dream.dream_text }}</p>
              </div>
              <button
                @click="confirmDelete(dream.id!)"
                class="ml-4 text-red-500 hover:text-red-700 transition-colors"
                :title="t('dashboard.delete')"
              >
                <Icon name="mdi:delete" class="text-2xl" />
              </button>
            </div>

            <!-- Interpretation Preview -->
            <div class="mt-4 pt-4 border-t border-purple-100">
              <p class="text-sm font-semibold text-gray-700 mb-2">{{ t('result.title') }}:</p>
              <p class="text-sm text-gray-600 line-clamp-3">{{ dream.interpretation }}</p>
            </div>

            <!-- Expand Button -->
            <button
              @click="toggleExpand(dream.id!)"
              class="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center space-x-1"
            >
              <span>{{ expandedDreams.includes(dream.id!) ? 'Show less' : t('dashboard.view') }}</span>
              <Icon :name="expandedDreams.includes(dream.id!) ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
            </button>

            <!-- Full Content -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[2000px]"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-[2000px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="expandedDreams.includes(dream.id!)" class="mt-4 space-y-4">
                <div>
                  <p class="text-sm font-semibold text-gray-700 mb-2">{{ t('form.label') }}:</p>
                  <p class="text-gray-700 whitespace-pre-wrap">{{ dream.dream_text }}</p>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-700 mb-2">{{ t('result.title') }}:</p>
                  <p class="text-gray-700 whitespace-pre-wrap">{{ dream.interpretation }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dream } from '~/composables/useDreams'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { user } = useAuth()
const { getUserDreams, deleteDream, getDreamStats } = useDreams()

const dreams = ref<Dream[]>([])
const stats = ref<any>(null)
const loading = ref(true)
const expandedDreams = ref<string[]>([])

// Load dreams
const loadDreams = async () => {
  loading.value = true
  try {
    dreams.value = await getUserDreams()
    stats.value = await getDreamStats()
  } catch (error) {
    console.error('Error loading dreams:', error)
  } finally {
    loading.value = false
  }
}

// Toggle expand
const toggleExpand = (id: string) => {
  const index = expandedDreams.value.indexOf(id)
  if (index > -1) {
    expandedDreams.value.splice(index, 1)
  } else {
    expandedDreams.value.push(id)
  }
}

// Confirm delete
const confirmDelete = async (id: string) => {
  if (confirm(t('dashboard.deleteConfirm'))) {
    try {
      await deleteDream(id)
      await loadDreams()
    } catch (error) {
      console.error('Error deleting dream:', error)
    }
  }
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Load on mount
onMounted(() => {
  loadDreams()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

