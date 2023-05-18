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
export default {
  middleware: 'logged-in-redirect'
}
</script>