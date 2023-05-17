export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/orders/${params.id}`)
    .then(order => store.commit('setCurrentOrder', order))
}
