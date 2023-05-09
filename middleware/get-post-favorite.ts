export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/post_favorites`)
    .then(favorite => store.dispatch('getPostFavorite', favorite))
}