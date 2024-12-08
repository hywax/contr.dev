<template>
  <div v-if="error">
    <UAlert
      color="error"
      variant="subtle"
      :title="$t('errors.title')"
      :description="error.message || $t('errors.message')"
    />
  </div>
  <div v-else>
    <div
      v-if="loading"
      class="grid gap-1.5 justify-center"
      :style="{ gridTemplateColumns: `repeat(${state.columns}, minmax(0, 48px))` }"
    >
      <USkeleton v-for="i in state.columns * 2 + 5" :key="i" class="rounded-full aspect-square" />
    </div>
    <div v-else-if="image">
      <img :src="image" :alt="repository" class="mx-auto">
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import type { GeneratorSchema } from '#shared/schemas'

interface GeneratorPreviewProps {
  image?: string
  repository?: string
  loading?: boolean
  state: GeneratorSchema
  error?: NuxtError
}

defineProps<GeneratorPreviewProps>()
</script>
