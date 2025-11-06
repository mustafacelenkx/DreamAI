<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize auth on app mount
const { initAuth } = useAuth()

onMounted(async () => {
  await initAuth()
})
</script>

