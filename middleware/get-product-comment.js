export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/product_comments`, { params: { product_id: params.id } })
    .then(comments => store.dispatch('getProductComment', comments))
}
