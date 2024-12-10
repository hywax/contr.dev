import process from 'node:process'

export default defineNuxtConfig({
  modules: [
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    '@nuxt/ui',
  ],
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    public: {
      /**
       * Since in Cloudflare Pages it is not possible to transform the `CF_PAGES_URL`
       * environment key into `APP_PUBLIC_BASE_URL`, we set it manually.
       */
      baseUrl: process.env.CF_PAGES_URL,
    },
    githubToken: '',
  },
  nitro: {
    preset: 'cloudflare-pages',
    storage: {
      cache: { driver: 'cloudflareKVBinding', binding: 'CACHE' },
      blob: { driver: 'cloudflareR2Binding', binding: 'BLOB' },
    },
    devStorage: {
      cache: { driver: 'fs', base: '.data/cache' },
      blob: { driver: 'fs', base: '.data/blob' },
    },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    vueI18n: 'vue-i18n.options.ts',
    experimental: {
      autoImportTranslationFunctions: true,
      localeDetector: './localeDetector.ts',
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'ru-RU': 'ru',
    },
  },
  components: [
    { path: '~/components/UI', prefix: '' },
    '~/components',
  ],
  ui: {
    colorMode: true,
    fonts: true,
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Geist',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  colorMode: {
    classSuffix: '',
  },
  icon: {
    customCollections: [
      { prefix: 'contr', dir: './app/assets/icons' },
    ],
    clientBundle: {
      includeCustomCollections: true,
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
})
