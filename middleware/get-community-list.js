export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/communities')
    .then(communities => store.dispatch('getCommunityList', communities))
}