export default async ({ store, $axios }) => {
  if (!store.state.post.list.length) {
    await $axios.$get('/api/v1/posts')
      .then(posts => store.dispatch('getPostList', posts))
  }
}
