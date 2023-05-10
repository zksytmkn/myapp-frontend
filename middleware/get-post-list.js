export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/posts')
    .then(posts => store.dispatch('getPostList', posts))
}