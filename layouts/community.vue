<template>
  <div
    id="community"
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
        <logged-in-app-community-eye-catch/>
        <nuxt />
      </v-main>
      <app-footer />
    </v-app>
  </div>
</template>

<script>
export default {
  middleware: ['authentication', 'get-community-list', 'get-cart'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style lang="scss">
#community {
  .v-parallax__content {
    padding: 0;
  }
}
</style>