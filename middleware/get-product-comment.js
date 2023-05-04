export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/products/${params.id}/product_comments`)
    .then(comments => store.dispatch('getProductComment', comments))
}
