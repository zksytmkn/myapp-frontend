const homePath = 'products-list'

export const state = () => ({
  styles: {
    homeAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    },
    rememberPath: {
      name: homePath,
      params: {}
    },
    // ログイン後アクセス不可ルート一覧
    redirectPaths: [
      'index',
      'signup',
      'login'
    ]
  },
  product: {
    current: null,
    list: [],
    comment: [],
    favorite: [],
    favorites: [],
    unfavorite: [],
    unfavorites: [],
    searchCondition: {
      name: '',
      seller: '',
      text: '',
      type: [],
      prefecture: []
    }
  },
  post: {
    current: null,
    list: [],
    comment: [],
    favorite: [],
    favorites: [],
    unfavorite: [],
    unfavorites: [],
    searchCondition: {
      name: '',
      poster: '',
      text: ''
    }
  },
  community: {
    current: null,
    list: [],
    message: [],
    participation: [],
    invitation: [],
    searchCondition: {
      name: '',
      maker: '',
      text: ''
    }
  },
  user: {
    login: null,
    current: null,
    list: [],
    relationship: []
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  toast: {
    msg: null,
    color: 'transparent',
    timeout: 4000
  },
  carts: [],
  orders: []
})

export const getters = {
  cartProducts: (state) => {
    return state.carts.map((cart) => {
      return {
        price: cart.product.price,
        quantity: cart.quantity,
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, cart) => {
      return total + cart.price * cart.quantity * 1.1
    }, 0)
  },
  cartTotalQuantity: (state, getters) => {
    return getters.cartProducts.reduce((total, cart) => {
      return total + cart.quantity
    }, 0)
  }
}

export const mutations = {
  setProductList (state, payload) {
    state.product.list = payload
  },
  setCurrentProduct (state, payload) {
    state.product.current = payload
  },
  setProductComment (state, payload) {
    state.product.comment = payload
  },
  setProductFavorite (state, payload) {
    state.product.favorite = payload
  },
  setProductFavorites (state, payload) {
    state.product.favorites = payload
  },
  setProductUnfavorite (state, payload) {
    state.product.unfavorite = payload
  },
  setProductUnfavorites (state, payload) {
    state.product.unfavorites = payload
  },
  setProductQuantity (state, { id, quantity }) {
    state.product.list.find(product => product.id === id).quantity = quantity
  },
  setProductFavoriteQuantity (state, { id, quantity }) {
    state.product.favorite.find(product => product.id === id).quantity = quantity
  },
  setCurrentProductQuantity(state, payload) {
    state.product.current.quantity = payload
  },
  setCarts (state, payload) {
    state.carts = payload
  },
  setOrders (state, payload) {
    state.orders = payload
  },
  setPostList (state, payload) {
    state.post.list = payload
  },
  setCurrentPost (state, payload) {
    state.post.current = payload
  },
  setPostComment (state, payload) {
    state.post.comment = payload
  },
  setPostFavorite (state, payload) {
    state.post.favorite = payload
  },
  setPostFavorites (state, payload) {
    state.post.favorites = payload
  },
  setPostUnfavorite (state, payload) {
    state.post.unfavorite = payload
  },
  setPostUnfavorites (state, payload) {
    state.post.unfavorites = payload
  },
  setCommunityList (state, payload) {
    state.community.list = payload
  },
  setCurrentCommunity (state, payload) {
    state.community.current = payload
  },
  setCommunityMessage (state, payload) {
    state.community.message = payload
  },
  setUserList (state, payload) {
    state.user.list = payload
  },
  setCurrentUser (state, payload) {
    state.user.current = payload
  },
  setRelationship (state, payload) {
    state.user.relationship = payload
  },
  setParticipationCommunity (state, payload) {
    state.community.participation = payload
  },
  setInvitationCommunity (state, payload) {
    state.community.invitation = payload
  },
  setLoggedInUser (state, payload) {
    state.user.login = payload
  },
  setAuthToken (state, payload) {
    state.auth.token = payload
  },
  setAuthExpires (state, payload) {
    state.auth.expires = payload
  },
  setAuthPayload (state, payload) {
    state.auth.payload = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  },
  setProductSearchCondition (state, { name, seller, text, type, prefecture }) {
    state.product.searchCondition.name = name
    state.product.searchCondition.seller = seller
    state.product.searchCondition.text = text
    state.product.searchCondition.type = type
    state.product.searchCondition.prefecture = prefecture
  },
  setPostSearchCondition (state, { name, poster, text }) {
    state.post.searchCondition.name = name
    state.post.searchCondition.poster = poster
    state.post.searchCondition.text = text
  },
  setCommunitySearchCondition (state, { name, maker, type, prefecture }) {
    state.community.searchCondition.name = name
    state.community.searchCondition.maker = maker
    state.community.searchCondition.type = type
    state.community.searchCondition.prefecture = prefecture
  }
}

export const actions = {
  getProductList ({ commit }, products) {
    products = products || []
    commit('setProductList', products)
  },
  getCurrentProduct ({ commit }, product) {
    commit('setCurrentProduct', product)
  },
  getProductComment ({ commit }, comments) {
    comments = comments || []
    commit('setProductComment', comments)
  },
  getProductFavorite ({ commit }, favorite) {
    favorite = favorite || []
    commit('setProductFavorite', favorite)
  },
  getProductFavorites ({ commit }, favorites) {
    favorites = favorites || []
    commit('setProductFavorites', favorites)
  },
  getProductUnfavorite ({ commit }, unfavorite) {
    unfavorite = unfavorite || []
    commit('setProductUnfavorite', unfavorite)
  },
  getProductUnfavorites ({ commit }, unfavorites) {
    unfavorites = unfavorites || []
    commit('setProductUnfavorites', unfavorites)
  },
  getProductQuantity ({ commit }, { id, quantity }) {
    commit('setProductQuantity', { id, quantity })
  },
  getProductFavoriteQuantity ({ commit }, { id, quantity }) {
    commit('setProductFavoriteQuantity', { id, quantity })
  },
  getCurrentProductQuantity ({ commit }, quantity) {
    commit('setCurrentProductQuantity', quantity)
  },
  getCarts ({ commit }, carts) {
    carts = carts || []
    commit('setCarts', carts) 
  },
  getOrders ({ commit }, orders) {
    orders = orders || []
    commit('setOrders', orders) 
  },
  getPostList ({ commit }, posts) {
    posts = posts || []
    commit('setPostList', posts)
  },
  getCurrentPost ({ commit }, post) {
    commit('setCurrentPost', post)
  },
  getPostComment ({ commit }, comments) {
    comments = comments || []
    commit('setPostComment', comments)
  },
  getPostFavorite ({ commit }, favorite) {
    favorite = favorite || []
    commit('setPostFavorite', favorite)
  },
  getPostFavorites ({ commit }, favorites) {
    favorites = favorites || []
    commit('setPostFavorites', favorites)
  },
  getPostUnfavorite ({ commit }, unfavorite) {
    unfavorite = unfavorite || []
    commit('setPostUnfavorite', unfavorite)
  },
  getPostUnfavorites ({ commit }, unfavorites) {
    unfavorites = unfavorites || []
    commit('setPostUnfavorites', unfavorites)
  },
  getCommunityList ({ commit }, communities) {
    communities = communities || []
    commit('setCommunityList', communities)
  },
  getCurrentCommunity ({ commit }, community) {
    commit('setCurrentCommunity', community)
  },
  getCommunityMessage ({ commit }, messages) {
    messages = messages || []
    commit('setCommunityMessage', messages)
  },
  getUserList ({ commit }, users) {
    users = users || []
    commit('setUserList', users)
  },
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getUserRelationship ({ commit }, relationship) {
    commit('setRelationship', relationship)
  },
  getParticipationCommunity ({ commit }, community) {
    commit('setParticipationCommunity', community)
  },
  getInvitationCommunity ({ commit }, community) {
    commit('setInvitationCommunity', community)
  },
  getLoggedInUser ({ commit }, user) {
    commit('setLoggedInUser', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, expires) {
    expires = expires || 0
    commit('setAuthExpires', expires)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  },
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'transparent'
    timeout = timeout || 4000
    commit('setToast', { msg, color, timeout })
  },
  // ログイン前ユーザーがアクセスしたルートを記録する
  getRememberPath ({ state, commit }, { name, params }) {
    // ログイン前パスが渡された場合はloggedIn.homePathに書き換える
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
  updateProductSearchCondition ({ commit }, { name, seller, text, type, prefecture }) {
    commit('setProductSearchCondition', { name, seller, text, type, prefecture })
  },
  updatePostSearchCondition ({ commit }, { name, poster, text }) {
    commit('setPostSearchCondition', { name, poster, text })
  },
  updateCommunitySearchCondition ({ commit }, { name, maker, type, prefecture }) {
    commit('setCommunitySearchCondition', { name, maker, type, prefecture })
  }
}