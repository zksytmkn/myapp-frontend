export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/products')
    .then(products => store.dispatch('getProductList', products))
}
