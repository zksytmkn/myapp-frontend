<template>
  <div>
    <OrderList
      title="注文（販売）"
      message="が購入されました。"
      :orders="orderMenus"
    />
  </div>
</template>

<script>
export default {
  computed: {
    orderMenus () {
      const copyOrderMenus = Array.from(this.$store.state.order.list.seller)
      return copyOrderMenus.sort((a, b) => {
        if (a.created_at > b.created_at) { return -1 }
        if (a.created_at < b.created_at) { return 1 }
        return 0
      })
    }
  }
}
</script>