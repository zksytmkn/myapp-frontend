export default async ({ store, $axios, $auth }) => {
  await $axios.$get(`/api/v1/post_favorites/${$auth.user.id}`)
    .then(favorite => store.dispatch('getPostFavorite', favorite))
}