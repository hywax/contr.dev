<template>
  <GeneratorForm
    v-model="state"
    :loading="status === 'pending'"
    @submit="execute()"
  />

  <GeneratorPreview
    :image="image"
    :repository="state.repo"
    :loading="status === 'pending'"
    :state="state"
    :error="error"
    class="mt-8"
  />
</template>

<script setup lang="ts">
import type { GeneratorSchema } from '#shared/schemas'
import { generatorSchemaDefault } from '#shared/schemas'

const runtimeConfig = useRuntimeConfig()

const state = reactive<GeneratorSchema>({
  ...generatorSchemaDefault,
})

const { execute, status, data: image, error } = useAsyncData('image', async () => {
  image.value = ''

  return new Promise<string>((resolve, reject) => {
    const img = new Image()
    const query = new URLSearchParams()

    query.set('repo', state.repo)

    if (state.columns !== generatorSchemaDefault.columns) {
      query.set('columns', state.columns.toString())
    }

    if (state.size !== generatorSchemaDefault.size) {
      query.set('size', state.size)
    }

    if (state.shape !== generatorSchemaDefault.shape) {
      query.set('shape', state.shape)
    }

    img.src = `${runtimeConfig.public.baseURL}/image?${query.toString()}`
    img.onload = () => resolve(img.src)
    img.onerror = reject
  })
}, { immediate: false })
</script>
