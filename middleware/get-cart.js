export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/carts/${store.state.user.login.id}`)
    .then(carts => store.dispatch('getCarts', carts))
}
