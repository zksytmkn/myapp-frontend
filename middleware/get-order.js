export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/orders/${store.state.user.login.id}`)
    .then(orders => store.dispatch('getOrders', orders))
}
