export default async ({ store, $axios }) => {
  if (!store.state.product.list.length) {
    await $axios.$get('/api/v1/products')
      .then(products => store.dispatch('getProductList', products))
  }
}
