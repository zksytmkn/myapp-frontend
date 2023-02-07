export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/users')
    .then(users => store.dispatch('getUserList', users))
}