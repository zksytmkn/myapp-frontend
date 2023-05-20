<template>
  <div>
    <ProductList
      title="いいね"
      message="いいねしておりません。"
      :products="likeProducts"
      :other-products="true"
      :add-product-cart-to-method="addProductToCart"
    />
  </div>
</template>

<script>
export default {
  computed: {
    likeProducts() {
      return [...this.$store.state.product.favorite].sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
  watch: {
    '$store.state.carts': {
      deep: true,
      async handler() {
        const favorites = await this.$axios.$get('/api/v1/product_favorites')
        this.$store.dispatch('getProductFavorite', favorites);
      }
    }
  },
}
</script>
