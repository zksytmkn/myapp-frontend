<template>
  <v-container>
    <v-btn
      v-if="!!currentProduct"
      small
      plain
      color="primary"
      :to="$my.productLinkTo(currentProduct.id, productPath)"
    >
      <v-icon
        left
      >
        mdi-chevron-double-left
      </v-icon>
      {{ $my.pageTitle(productPath) }}に戻る
    </v-btn>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: "logged-in",
  validate ({ route }) {
    return route.name !== 'account'
  },
  data () {
    return {
      productPath: 'product-id-detail'
    }
  },
  computed: {
    currentProduct () {
      return this.$store.state.product.current
    }
  }
}
</script>
