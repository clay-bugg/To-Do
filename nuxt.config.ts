
export default defineNuxtConfig({
  modules: ["nuxt-icon"],
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/main.css",
    "tippy.js/dist/tippy.css"
  ],
});