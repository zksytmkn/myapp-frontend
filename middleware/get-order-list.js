export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/orders')
    .then(orders => store.commit('setOrder', orders))
}
