<template>
  <div
    id="post"
  >
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
        <app-toaster />
        <logged-in-app-post-eye-catch/>
        <nuxt />
      </v-main>
      <app-footer />
    </v-app>
  </div>
</template>

<script>
export default {
  middleware: ['authentication', 'get-post-list', 'get-post-favorite', 'get-post-favorites', 'get-post-unfavorite', 'get-post-unfavorites','get-cart'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style lang="scss">
#post {
  .v-parallax__content {
    padding: 0;
  }
}
</style>