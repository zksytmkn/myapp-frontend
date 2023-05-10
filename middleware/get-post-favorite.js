export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/post_favorites`)
    .then(userFavorites => store.commit('setPostFavorite', userFavorites))
}