import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['nuxt-icon', '@pinia/nuxt'],
  pinia: {
    plugins: ['pinia-plugin-persistedstate'],
  },
  css: ['@/assets/css/main.css'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: 3000,
  },
})
