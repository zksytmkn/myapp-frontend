export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/product_favorites`)
    .then(favorites => store.dispatch('getProductFavorite', favorites))
}
