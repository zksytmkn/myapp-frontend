class MyInject {
  constructor (ctx) {
    this.app = ctx.app
    this.error = ctx.error
  }

  pageTitle (routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }

  dataFormat (dateStr) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(dateStr))
  }

  productLinkToDetail (id, name = 'product-id-detail') {
    return { name, params: { id } }
  }

  productLinkToEdit (id, name = 'product-id-edit') {
    return { name, params: { id } }
  }

  postLinkToDetail (id, name = 'post-id-detail') {
    return { name, params: { id } }
  }

  postLinkToEdit (id, name = 'post-id-edit') {
    return { name, params: { id } }
  }

  communityLinkToDetail (id, name = 'community-id-detail') {
    return { name, params: { id } }
  }

  communityLinkToEdit (id, name = 'community-id-edit') {
    return { name, params: { id } }
  }

  userLinkToProfile (id, name = "mypage-id-profile") {
    return { name, params: {id} }
  }

  // apiエラーハンドラー
  apiErrorHandler (response) {
    // ネットワークエラーの場合はresponseが存在しないので500を代入
    const statusCode = (response) ? response.status : 500
    const message = (response) ? response.statusText : 'Network Error'
    return this.error({ statusCode, message })
  }
}

export default ({ app, error }, inject) => {
  inject('my', new MyInject({ app, error }))
}