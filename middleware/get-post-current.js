export default async ({ store, params }) => {
  return await store.dispatch('getCurrentPost', params)
}