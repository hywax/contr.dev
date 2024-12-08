<template>
  <div class="mt-4 px-6">
    <GeneratorCTA class="mb-8" />
    <GeneratorFactory />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: $t('app.meta.title'),
  description: $t('app.meta.description'),
})
</script>
