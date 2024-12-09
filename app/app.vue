<template>
  <UApp :locale="localeApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { en, ru } from '@nuxt/ui/locale'

const { locale } = useI18n()
const i18nHead = useLocaleHead()
const config = useAppConfig()

const appLocales = { en, ru }
const localeApp = computed(() => appLocales[locale.value] ?? en)

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: [
    ...(i18nHead.value.link || []),
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicon.svg' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'apple-mobile-web-app-title', content: config.app.name },
  ],
  titleTemplate: (titleChunk) => {
    const defaultPostfix = config.app.name

    if (!titleChunk || titleChunk === defaultPostfix) {
      return defaultPostfix
    }

    return `${titleChunk} - ${defaultPostfix}`
  },
}))
</script>
