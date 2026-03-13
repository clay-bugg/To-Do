import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxt/icon", "@pinia/nuxt", "@nuxtjs/supabase"],
  css: ["@/assets/css/main.scss"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
  },
});
