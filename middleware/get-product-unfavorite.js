export default async ({ store, $axios, $auth }) => {
  await $axios.$get(`/api/v1/product_unfavorites/${$auth.user.id}`)
    .then(unfavorite => store.dispatch('getProductUnfavorite', unfavorite))
}
