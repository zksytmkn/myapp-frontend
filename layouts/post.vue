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
    <project-navigation-drawer
      :drawer.sync="drawer"
    />
    <v-main>
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication', 'get-post-list', 'get-post-current'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>