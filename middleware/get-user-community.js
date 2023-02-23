export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/users/${store.state.user.current.id}`)
    .then(community => store.dispatch('getUserCommunity', community))
}