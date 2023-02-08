<template>
  <div
    id="products"
  >
    <logged-in-app-product-eye-catch>
      <template
        v-slot
      >
        Various agricultural products are here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-product-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          購入済み（{{ purchasedProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!purchasedProducts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              購入しておりません。
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
      <v-container>
      </v-container>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="purchasedProducts.length"
      :length="7"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    purchasedProducts () {
      const copyProducts = Array.from(this.$store.state.product.list.filter((x) => x.purchased === true))
      return copyProducts.sort((a, b) => {
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