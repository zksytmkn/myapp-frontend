export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/product_unfavorites`)
    .then(unfavorite => store.dispatch('getProductUnfavorite', unfavorite))
}
