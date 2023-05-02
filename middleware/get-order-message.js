export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/order_messages/${params.id}`)
  .then(messages => store.dispatch('getOrderMessage', messages))}