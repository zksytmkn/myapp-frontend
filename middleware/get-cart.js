export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/carts')
    .then(carts => store.commit('setCart', carts))
}
