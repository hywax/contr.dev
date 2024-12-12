<template>
  <UForm
    ref="form"
    :state="modelValue"
    :schema="generatorSchema"
    :validate-on="['change']"
    :disabled="props.loading"
    class="flex gap-2"
    @submit="emit('submit', $event.data)"
  >
    <UFormField class="w-full" name="repo" :ui="{ error: 'absolute mt-0.5' }">
      <UInput
        v-model="modelValue.repo"
        :ui="{ base: 'py-2.5' }"
        :placeholder="$t('generator.form.repository.placeholder')"
        class="w-full"
      >
        <template #trailing>
          <UPopover arrow>
            <UButton
              variant="link"
              icon="setting"
              color="neutral"
              :aria-label="$t('generator.form.preferences')"
              :disabled="form?.disabled"
            />

            <template #content>
              <div class="p-4 space-y-2">
                <UFormField :label="$t('generator.form.columns.label')" name="columns">
                  <UInputNumber v-model="modelValue.columns" :min="1" :max="64" />
                </UFormField>
                <UFormField :label="$t('generator.form.size.label')" name="size">
                  <URadioGroupTab v-model="modelValue.size" :items="sizeVariants" />
                </UFormField>
                <UFormField :label="$t('generator.form.shape.label')" name="shape">
                  <URadioGroupTab v-model="modelValue.shape" :items="shapeVariants" />
                </UFormField>
              </div>
            </template>
          </UPopover>
        </template>
      </UInput>
    </UFormField>

    <UButton
      class="px-4"
      icon="generate"
      type="submit"
      :label="$t('generator.form.action')"
      :loading="loading"
    />
  </UForm>
</template>

<script setup lang="ts">
import type { GeneratorSchema } from '#shared/schema'
import type { Form } from '#ui/types'
import { generatorSchemaDefault } from '#shared/schema'
import { z } from 'zod'

const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: GeneratorSchema): void
}>()

const modelValue = defineModel<GeneratorSchema>({
  required: true,
})

const form = ref<Form<GeneratorSchema> | null>(null)

const { locale } = useI18n()
watch(locale, () => form.value?.clear())

const generatorSchema = z.object({
  repo: z.string().regex(/^[\w-]+\/[\w.-]+$/, {
    message: $t('generator.form.repository.validation'),
  }),
  columns: z.preprocess((c) => Number(c), z.number({
    message: $t('generator.form.columns.validation'),
  }).min(1).max(64)).default(generatorSchemaDefault.columns),
  size: z.enum(['small', 'medium', 'large'], {
    message: $t('generator.form.size.validation'),
  }).default(generatorSchemaDefault.size),
  shape: z.enum(['circle', 'square'], {
    message: $t('generator.form.shape.validation'),
  }).default(generatorSchemaDefault.shape),
})

const sizeVariants = computed(() => [
  { label: $t('generator.form.size.variants.small'), value: 'small' },
  { label: $t('generator.form.size.variants.medium'), value: 'medium' },
  { label: $t('generator.form.size.variants.large'), value: 'large' },
])

const shapeVariants = computed(() => [
  { label: $t('generator.form.shape.variants.circle'), value: 'circle' },
  { label: $t('generator.form.shape.variants.square'), value: 'square' },
])
</script>
