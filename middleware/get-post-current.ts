export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/posts/${params.id}`)
  .then(post => store.dispatch('getCurrentPost', post))}