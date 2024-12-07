<template>
  <header class="max-w-[var(--ui-container)] mx-auto flex justify-between items-center p-6">
    <div class="text-xs md:text-sm flex items-center gap-4">
      <ULink v-for="(link, key) in links" :key="key" :href="link.to">
        {{ link.label }} <UIcon name="arrow-up-right" class="text-xs hidden sm:inline-block" />
      </ULink>
    </div>
    <div class="flex gap-1.5">
      <ThemeToggle />
      <LanguageSelect />
    </div>
  </header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const links = computed(() => [
  { label: $t('app.link.github'), to: appConfig.links.github },
  { label: $t('app.link.kofi'), to: appConfig.links.kofi },
])
</script>
