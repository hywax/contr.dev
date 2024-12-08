<template>
  <UTabs
    v-model="modelValue"
    :items="items"
    :content="false"
    :ui="{ indicator: 'bg-[var(--ui-bg)]', trigger: 'px-1 data-[state=active]:text-[var(--ui-text-highlighted)]' }"
    color="neutral"
    size="xs"
    @update:model-value="(modelValue = $event as T)"
  />
</template>

<script setup lang="ts" generic="T extends string | number">
defineProps<{
  items: {
    label: string
    value: T
    icon?: string
  }[]
}>()

const modelValue = defineModel<T>()
</script>
