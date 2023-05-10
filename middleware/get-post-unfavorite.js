export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/post_unfavorites`)
    .then(userUnfavorites => store.commit('setPostUnfavorite', userUnfavorites))
}