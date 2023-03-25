export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/participations')
    .then(participations => store.dispatch('getParticipationCommunity', participations))
}