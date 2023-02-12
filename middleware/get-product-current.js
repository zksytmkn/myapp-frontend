export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/products/${params.id}`)
    .then(product => store.dispatch('getCurrentProduct', product))
}