export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/post_comments')
    .then(comments => store.dispatch('getPostComment', comments))
}