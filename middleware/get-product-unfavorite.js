export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/product_unfavorites`)
    .then(unfavorites => store.commit('setProductUnfavorite', unfavorites))
}
