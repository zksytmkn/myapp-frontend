<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          全ての農産物（{{ products.length }}件）
        </v-list-item-title>
        </v-list-item>
      <v-divider />
    </v-container>
    <ProductList :product-list="products" />
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      const products = [...this.$store.state.product.list];
      return products.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
}
</script>