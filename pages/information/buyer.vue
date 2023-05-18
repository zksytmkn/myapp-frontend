<template>
  <div>
    <OrderList
      title="注文（購入）"
      message="を購入しました。"
      :orders="orderMenus"
    />
  </div>
</template>

<script>
export default {
  computed: {
    orderMenus () {
      const copyOrderMenus = Array.from(this.$store.state.order.list.buyer)
      return copyOrderMenus.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>