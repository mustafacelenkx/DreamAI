// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      {
        code: 'tr',
        name: 'Türkçe',
        file: 'tr.ts',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.ts',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'tr',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  
  app: {
    head: {
      title: 'DreamAI - Rüya Yorumları',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Yapay zeka destekli rüya yorumlama uygulaması' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})

