export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/relationships/${params.id}/user_follow_relationships`)
    .then(relationship => store.commit('setUserRelationship', relationship))
}
