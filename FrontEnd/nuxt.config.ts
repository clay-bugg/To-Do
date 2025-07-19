import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["nuxt-icon", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: 3000
  }
  
});