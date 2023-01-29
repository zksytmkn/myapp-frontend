<template>
  <div
    id="products"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Various vegetables or fruits are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          おすすめ（{{ recommendProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!recommendProducts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              いいねしてみましょう。
              <br/>
              ＊おすすめはいいねに基づいております。
            </p>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/products/list"
            >
              農産物を見てみる
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      :length="6"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-product-list'],
  computed: {
    recommendProducts () {
      const copyRecommendProducts = Array.from(this.$store.state.product.list.filter((x) => x.recommend === true))
      return copyRecommendProducts.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#products {
  .v-parallax__content {
    padding: 0;
  }
}
</style>