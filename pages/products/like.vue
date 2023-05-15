<template>
  <div>
    <v-container>
      <v-list-item class="font-weight-bold">
        いいね（{{ likeProducts.length }}件）
      </v-list-item>
      <v-divider/>
      <v-list v-show="!likeProducts.length" color="transparent">
        <v-list-item>
          <v-list-item-title>
            いいねしておりません。
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
    <ProductList :product-list="likeProducts" />
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
}
</script>
