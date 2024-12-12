<template>
  <div class="mt-4 px-6">
    <GeneratorCTA class="mb-8" />
    <GeneratorFactory />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: $t('app.meta.title'),
  description: $t('app.meta.description'),
  ogTitle: $t('app.meta.title'),
  ogDescription: $t('app.meta.description'),
  ogImage: {
    url: `${runtimeConfig.public.i18n.baseUrl}/og-image.png`,
    width: 1280,
    height: 600,
    type: 'image/png',
    alt: $t('app.meta.description'),
  },
})
</script>
