export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/products')
    .then(productsWithFavorites => {
      const products = productsWithFavorites.map(productWithFavorites => ({
        ...productWithFavorites.product,
        favorites_count: productWithFavorites.favorites_count,
        unfavorites_count: productWithFavorites.unfavorites_count
      }))
      store.dispatch('getProductList', products)
    })
}
