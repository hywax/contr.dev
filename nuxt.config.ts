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
      allowIndexation: '',
    },
    githubToken: '',
  },
  nitro: {
    storage: {
      cache: { driver: 'fs', base: 'data/cache' },
      blob: { driver: 'fs', base: 'data/blob' },
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
