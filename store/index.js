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
    list: []
  },
  post: {
    current: null,
    list: []
  },
  community: {
    current: null,
    list: []
  },
  user: {
    current: null
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  }
})

export const getters = {}

export const mutations = {
  setProductList (state, payload) {
    state.product.list = payload
  },
  setCurrentProduct (state, payload) {
    state.product.current = payload
  },
  setPostList (state, payload) {
    state.post.list = payload
  },
  setCurrentPost (state, payload) {
    state.post.current = payload
  },
  setCommunityList (state, payload) {
    state.community.list = payload
  },
  setCurrentCommunity (state, payload) {
    state.community.current = payload
  },
  setCurrentUser (state, payload) {
    state.user.current = payload
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
  }
}

export const actions = {
  getProductList ({ commit }, products) {
    products = products || []
    commit('setProductList', products)
  },
  getCurrentProduct ( { state, commit }, params ) {
    let currentProduct = null
    if (params && params.id) {
      const id = Number(params.id)
      currentProduct = state.product.list.find(product => product.id === id) || null  
    }
    commit('setCurrentProduct', currentProduct)
  },
  getPostList ({ commit }, posts) {
    posts = posts || []
    commit('setPostList', posts)
  },
  getCurrentPost ( { state, commit }, params ) {
    let currentPost = null
    if (params && params.id) {
      const id = Number(params.id)
      currentPost = state.post.list.find(post => post.id === id) || null  
    }
    commit('setCurrentPost', currentPost)
  },
  getCommunityList ({ commit }, communities) {
    communities = communities || []
    commit('setCommunityList', communities)
  },
  getCurrentCommunity ( { state, commit }, params ) {
    let currentCommunity = null
    if (params && params.id) {
      const id = Number(params.id)
      currentCommunity = state.community.list.find(community => community.id === id) || null  
    }
    commit('setCurrentCommunity', currentCommunity)
  },
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
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
    color = color || 'error'
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
  }
}