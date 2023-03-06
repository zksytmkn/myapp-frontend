export default async ({ store, $axios, $auth }) => {
  await $axios.$get(`/api/v1/post_unfavorites/${$auth.user.id}`)
    .then(unfavorite => store.dispatch('getPostUnfavorite', unfavorite))
}