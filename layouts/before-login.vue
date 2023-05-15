<template>
  <v-app>
    <before-login-app-bar />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer-top />
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '../components/App/AppFooter.vue'
export default {
  components: { AppFooter },
  middleware: ['logged-in-redirect']
}
</script>