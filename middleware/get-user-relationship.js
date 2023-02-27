export default async ({ store, params, $axios }) => {
  await $axios.$get(`/api/v1/relationships/${params.id}`)
    .then(relationship => store.dispatch('getUserRelationship', relationship))
}