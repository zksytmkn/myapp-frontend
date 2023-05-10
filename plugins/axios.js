export default ({ $axios, $auth, isDev }) => {
  // リクエストログ
  $axios.onRequest((config) => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    if ($auth.token) {
      config.headers.common.Authorization = `Bearer ${$auth.token}`
    }
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(config)
    }
  })
  // レスポンスログ
  $axios.onResponse((config) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(config)
    }
  })
  // エラーログ
  $axios.onError((e) => {
    // eslint-disable-next-line no-console
    console.log(e.response)
  })
}