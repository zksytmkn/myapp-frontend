<template>
  <div>
    <ProductList
      title="全ての農産物"
      message="農産物はありませんでした。"
      :products="products"
    />
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
  mounted() {
    const loginType = this.$store.state.loginType;
  
    if (loginType) {
      let message = '';
  
      switch (loginType) {
        case 'user':
          message = 'ログインしました';
          break;
        case 'guest':
          message = 'ゲストログインしました';
          break;
      }
  
      this.$store.dispatch('getToast', { msg: message, color: 'success' });
  
      // メッセージ表示後、loginTypeをnullにリセット
      this.$store.commit('setLoginType', null);
    }
  }
}
</script>