<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          購入済み（{{ orderedProducts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list v-show="!orderedProducts.length" color="transparent">
        <v-list-item>
          <v-list-item-title>
            購入しておりません。
          </v-list-item-title>
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
    </v-container>
    <ProductList :product-list="orderedProducts" />
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
