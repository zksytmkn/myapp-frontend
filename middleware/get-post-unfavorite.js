export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/post_unfavorites`)
    .then(unfavorite => store.dispatch('getPostUnfavorite', unfavorite))
}