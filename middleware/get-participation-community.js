export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/participations/${store.state.user.login.id}`)
    .then(participation => store.dispatch('getParticipationCommunity', participation))
}