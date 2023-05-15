<template>
  <v-app>
    <logged-in-app-bar
      clipped-left
    >
      <template #navigation-toggle-button>
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
        />
      </template>
    </logged-in-app-bar>
    <logged-in-navigation-drawer
      :drawer.sync="drawer"
    />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication', 'get-cart'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>