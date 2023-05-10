export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/product_unfavorites`)
    .then(userUnfavorites => store.commit('setProductUnfavorite', userUnfavorites))
}
