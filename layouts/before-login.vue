<template>
  <v-app>
    <before-login-app-bar />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'LayoutsBeforeLogin'
}
</script>