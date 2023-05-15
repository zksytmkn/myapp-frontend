export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/post_unfavorites`)
    .then(unfavorites => store.dispatch('getPostUnfavorite', unfavorites))
}