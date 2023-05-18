<template>
  <div>
    <ProductList
      title="購入済み"
      message="購入しておりません。"
      :products="orderedProducts"
      :other-products="true"
    />
  </div>
</template>

<script>
export default {
  middleware: 'get-order-list',
  computed: {
    orderedProducts() {
      const orders = this.$store.state.order.list;
      const allOrders = orders.buyer.concat(orders.close);

      return this.$store.state.product.list
      .filter(product => allOrders.some(order => order.product_id === product.id)).sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  },
}
</script>
