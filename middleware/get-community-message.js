export default async ({ store, params, $axios }) => {
  await $axios.$get(`api/v1/community_messages/${params.id}`)
  .then(messages => store.dispatch('getCommunityMessage', messages))}