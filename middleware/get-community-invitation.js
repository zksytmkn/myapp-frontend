export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/invitations')
    .then(invitations => store.commit('setInvitationCommunity', invitations))
}