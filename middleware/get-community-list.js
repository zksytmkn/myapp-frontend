export default async ({ store, $axios }) => {
  if (!store.state.community.list.length) {
    await $axios.$get('/api/v1/communities')
      .then(communities => store.dispatch('getCommunityList', communities))
  }
}