export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/orders/${params.id}/order_messages`)
    .then(messages => store.commit('setOrderMessage', messages))
}
