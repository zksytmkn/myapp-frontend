<template>
  <v-app-bar
    app
    :height="beforeLoginAppBarHeight"
    color="white"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
  </v-app-bar>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      beforeLoginAppBarHeight: $store.state.styles.beforeLoginAppBarHeight
    }
  }
}
</script>