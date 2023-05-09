export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/posts/${params.id}/post_comments`)
    .then(comments => store.dispatch('getPostComment', comments))
}
