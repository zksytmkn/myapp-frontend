export default async ({ store, $axios, $auth }) => {
  await $axios.$get(`/api/v1/product_favorites/${$auth.user.id}`)
    .then(favorite => store.dispatch('getProductFavorite', favorite))
}