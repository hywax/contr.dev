<template>
  <UDropdownMenu :items="items" :disabled="isDisabled">
    <UButton
      :aria-label="$t('app.language.label')"
      icon="language"
      color="neutral"
      variant="ghost"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const error = useError()
const { locales, locale, setLocale } = useI18n()

const isDisabled = computed(() => !!error.value)

const items = computed(() => {
  return locales.value.map((loc) => {
    return {
      label: loc.name || loc.code,
      icon: `flag-${loc.code}`,
      onSelect: () => setLocale(loc.code),
      disabled: loc.code === locale.value || isDisabled.value,
    }
  })
})
</script>
