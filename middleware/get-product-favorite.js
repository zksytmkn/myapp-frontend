export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/product_favorites`)
    .then(favorite => store.dispatch('getProductFavorite', favorite))
}
