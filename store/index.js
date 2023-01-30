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
    searchCondition: {
      name: '',
      seller: '',
      text: '',
      type: [],
      region: [],
      prefecture: []
    }
  },
  post: {
    current: null,
    list: [],
    searchCondition: {
      name: '',
      poster: '',
      text: ''
    }
  },
  community: {
    current: null,
    list: [],
    searchCondition: {
      name: '',
      maker: '',
      text: ''
    }
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
  },
  items: []
})

export const getters = {
  cartProducts: (state) => {
    return state.items.map((item) => {
      const product = state.product.list.find((product) => product.id === item.id)
      return {
        name: product.name,
        text: product.text,
        price: product.price,
        inventory: product.inventory,
        like: product.like,
        dislike: product.dislike,
        quantity: item.quantity,
        id: item.id
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity * 1.1
    }, 0)
  },
  cartTotalQuantity: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.quantity
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
  },
  pushProductToCart (state, product) {
    state.items.push({
      id: product.id,
      quantity: product.quantity
    })
  },
  incrementItemQuantity (state, product) {
    state.items = state.items.map((item) => item.id === product.id ? {...item, quantity: item.quantity + product.quantity} : {...item, quantity: item.quantity})
  },
  pullProductFromCart (state, product) {
    const itemQuantity = state.items.find((item) => item.id === product.id).quantity
    state.items = state.items.filter((item) => item.id !== product.id)
    state.product.list = state.product.list.map((x) => x.id === product.id ? {...x, inventory: x.inventory + itemQuantity} : {...x})
  },
  setQuantity (state, { product, quantity }) {
    state.product.list = state.product.list.map((x) => x.id === product.id ? {...x, quantity} : {...x})
  },
  setCurrentQuantity (state, quantity) {
    state.product.current.quantity = quantity 
  },
  decrementProductInventory (state, product) {
    state.product.list = state.product.list.map((x) => x.id === product.id ? {...x, inventory: x.inventory - product.quantity} : {...x})
  },
  decrementCurrentProductInventory (state, product) {
    state.product.current.inventory -= product.quantity
  },
  setLikeState (state, product) {
    state.product.list = state.product.list.map((x) => x.id === product.id ? {...x, like: !product.like, dislike: product.dislike ? !product.dislike : product.dislike} : {...x})
  },
  setDislikeState (state, product) {
    state.product.list = state.product.list.map((x) => x.id === product.id ? {...x, like: product.like ? !product.like : product.like, dislike: !product.dislike} : {...x})
  },
  setCurrentLikeState (state, product) {
    state.product.current.like = !product.like
    state.product.current.dislike = product.dislike ? !product.dislike : product.dislike
  },
  setCurrentDislikeState (state, product) {
    state.product.current.dislike = !product.dislike
    state.product.current.like = product.like ? !product.like : product.like
  },
  setPostLikeState (state, post) {
    state.post.list = state.post.list.map((x) => x.id === post.id ? {...x, like: !post.like, dislike: post.dislike ? !post.dislike : post.dislike} : {...x})
  },
  setPostDislikeState (state, post) {
    state.post.list = state.post.list.map((x) => x.id === post.id ? {...x, like: post.like ? !post.like : post.like, dislike: !post.dislike} : {...x})
  },
  setCurrentPostLikeState (state, post) {
    state.post.current.like = !post.like
    state.post.current.dislike = post.dislike ? !post.dislike : post.dislike
  },
  setCurrentPostDislikeState (state, post) {
    state.post.current.dislike = !post.dislike
    state.post.current.like = post.like ? !post.like : post.like
  },
  setProductSearchCondition (state, { name, seller, text, type, region, prefecture }) {
    state.product.searchCondition.name = name
    state.product.searchCondition.seller = seller
    state.product.searchCondition.text = text
    state.product.searchCondition.type = type
    state.product.searchCondition.region = region
    state.product.searchCondition.prefecture = prefecture
  },
  setPostSearchCondition (state, { name, poster, text }) {
    state.post.searchCondition.name = name
    state.post.searchCondition.poster = poster
    state.post.searchCondition.text = text
  },
  setCommunitySearchCondition (state, { name, maker, type, region, prefecture }) {
    state.community.searchCondition.name = name
    state.community.searchCondition.maker = maker
    state.community.searchCondition.type = type
    state.community.searchCondition.region = region
    state.community.searchCondition.prefecture = prefecture
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
  },
  addProductToCart ({ state, commit }, product) {
    const cartItem = state.items.find(item => item.id === product.id)
    if(!cartItem) {
      commit('pushProductToCart', product)
    } else {
      commit('incrementItemQuantity', product)
    }
    commit('decrementProductInventory', product)
  },
  addCurrentProductToCart ({ state, commit }, product) {
    const cartItem = state.items.find(item => item.id === product.id)
    if(!cartItem) {
      commit('pushProductToCart', product)
    } else {
      commit('incrementItemQuantity', product)
    }
    commit('decrementCurrentProductInventory', product)
  },
  removeProductFromCart ({ commit }, product) {
    commit('pullProductFromCart', product)
  },
  updateQuantity ({ commit }, { product, quantity }) {
    commit('setQuantity', { product, quantity })
  },
  updateCurrentQuantity ({ commit }, quantity ) {
    commit('setCurrentQuantity', quantity )
  },
  updateLikeState ({ commit }, product) {
    commit('setLikeState', product)
  },
  updateDislikeState ({ commit }, product) {
    commit('setDislikeState', product)
  },
  updateCurrentLikeState ({ commit }, product) {
    commit('setCurrentLikeState', product)
  },
  updateCurrentDislikeState ({ commit }, product) {
    commit('setCurrentDislikeState', product)
  },
  updatePostLikeState ({ commit }, post ) {
    commit('setPostLikeState', post)
  },
  updatePostDislikeState ({ commit }, post) {
    commit('setPostDislikeState', post)
  },
  updateCurrentPostLikeState ({ commit }, post) {
    commit('setCurrentPostLikeState', post)
  },
  updateCurrentPostDislikeState ({ commit }, post) {
    commit('setCurrentPostDislikeState', post)
  },
  updateProductSearchCondition ({ commit }, { name, seller, text, type, region, prefecture }) {
    commit('setProductSearchCondition', { name, seller, text, type, region, prefecture })
  },
  updatePostSearchCondition ({ commit }, { name, poster, text }) {
    commit('setPostSearchCondition', { name, poster, text })
  },
  updateCommunitySearchCondition ({ commit }, { name, maker, type, region, prefecture }) {
    commit('setCommunitySearchCondition', { name, maker, type, region, prefecture })
  }
}