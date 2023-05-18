<template>
  <div>
    <ProductList
      title="いいね"
      message="いいねしておりません。"
      :products="likeProducts"
      :other-products="true"
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
}
</script>
