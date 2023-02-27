export default async ({ store, $axios }) => {
  await $axios.$get(`/api/v1/invitations/${store.state.user.login.id}`)
    .then(invitation => store.dispatch('getInvitationCommunity', invitation))
}