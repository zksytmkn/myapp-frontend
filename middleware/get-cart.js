export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/carts')
    .then(carts => store.dispatch('getCarts', carts))
}
