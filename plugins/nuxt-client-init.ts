export default async ({ $auth, $axios }) => {
  await $axios.$post(
    '/api/v1/auth_token/refresh',
    {},
    { validateStatus: status => $auth.resolveUnauthorized(status) }
  ).then(response => $auth.login(response))
}
