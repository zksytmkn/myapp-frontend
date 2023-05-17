export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/communities/${params.id}/community_messages`)
    .then(messages => store.commit('setCommunityMessage', messages))
}
