<template>
  <div>
    <OrderList
      title="注文（完了）"
      message="order.product.user_id !== $auth.user.id ? 'を購入しました。' : 'が購入されました。'"
      :orders="orderMenus"
    />
  </div>
</template>

<script>
export default {
  computed: {
    orderMenus () {
      const copyOrderMenus = Array.from(this.$store.state.order.list.close)
      return copyOrderMenus.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>