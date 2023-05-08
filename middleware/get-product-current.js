export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/products/${params.id}`)
    .then(productWithFavorites => {
      const product = {
        ...productWithFavorites.product,
        favorites_count: productWithFavorites.favorites_count,
        unfavorites_count: productWithFavorites.unfavorites_count
      }
      store.dispatch('getCurrentProduct', product)
    })
}
