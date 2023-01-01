<template>
  <v-app>
    <before-login-app-bar />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-policy />
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'LayoutsBeforeLogin',
  middleware: ['logged-in-redirect']
}
</script>