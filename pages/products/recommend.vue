<template>
  <div
    id="products"
  >
    <logged-in-app-product-eye-catch/>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-list
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                >
                  おすすめ（{{ recommendProducts.length }}件）
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-list
            v-show="!recommendProducts.length"
            color="transparent"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  いいねしてみましょう。
                  <br/>
                  ＊おすすめはいいねに基づいております。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  class="font-weight-bold"
                  color="orange"
                  outlined
                  dark
                  to="/products/list"
                >
                  農産物を見る
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
    </v-container>

    <v-pagination
      class="my-6"
      v-model="page"
      v-show="recommendProducts.length"
      :length="7"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-product-list'],
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    recommendProducts () {
      const copyRecommendProducts = Array.from(this.$store.state.product.list.filter((x) => x.recommend === true))
      return copyRecommendProducts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      }).slice(this.pageSize*(this.page-1),this.pageSize*(this.page))
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