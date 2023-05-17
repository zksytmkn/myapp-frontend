export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/communities/${params.id}`)
    .then(community => store.commit('setCurrentCommunity', community))
}