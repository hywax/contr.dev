<template>
  <GeneratorForm
    v-model="state"
    :loading="status === 'pending'"
    @submit="execute()"
  />

  <GeneratorPreview
    :image="data?.image"
    :repository="state.repo"
    :loading="status === 'pending'"
    :state="state"
    :error="error"
    class="mt-8"
  />
</template>

<script setup lang="ts">
import type { GeneratorSchema } from '#shared/schema'
import { generatorSchemaDefault } from '#shared/schema'

const state = reactive<GeneratorSchema>({
  ...generatorSchemaDefault,
})

const { execute, status, data, error } = useFetch('/api/generate', {
  method: 'POST',
  body: state,
  watch: false,
  immediate: false,
})
</script>
