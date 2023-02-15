export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/post_comments/${params.id}`)
  .then(comments => store.dispatch('getPostComment', comments))}