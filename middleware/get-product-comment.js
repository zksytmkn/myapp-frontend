export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/product/')
    .then(comments => store.dispatch('getProductComment', comments))
}