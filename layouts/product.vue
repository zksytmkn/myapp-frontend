<template>
  <div
    id="product"
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
      <logged-in-navigation-drawer
        :drawer.sync="drawer"
      />
      <v-main>
        <app-toaster />
        <product-eye-catch/>
        <nuxt />
      </v-main>
      <app-footer />
    </v-app>
  </div>
</template>

<script>
export default {
  middleware: ['authentication', 'get-product-list', 'get-product-favorite', 'get-product-unfavorite', 'get-cart'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style lang="scss">
#product {
  .v-parallax__content {
    padding: 0;
  }
}
</style>