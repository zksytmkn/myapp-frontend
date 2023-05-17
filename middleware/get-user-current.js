export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/users/${params.id}`)
    .then(user => store.commit('setCurrentUser', user))
}