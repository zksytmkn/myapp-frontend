const homePath = 'products-list'

const createSearchCondition = (fields) => {
  const condition = {}
  fields.forEach(field => {
    condition[field] = ''
  })
  return condition
}

const createRelatedData = (items) => {
  const data = {}
  items.forEach(item => {
    data[item] = []
  })
  return data
}

export const state = () => ({
  styles: {
    beforeLoginAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    },
    rememberPath: {
      name: homePath,
      params: {}
    },
    redirectPaths: [
      'index',
      'signup',
      'login'
    ]
  },
  loginType: null,
  logoutSuccess: false,
  product: {
    current: null,
    ...createRelatedData(['list', 'comment', 'favorite', 'unfavorite']),
    searchCondition: createSearchCondition(['name', 'seller', 'description', 'category', 'prefecture']),
  },
  post: {
    current: null,
    ...createRelatedData(['list', 'comment', 'favorite', 'unfavorite']),
    searchCondition: createSearchCondition(['name', 'poster', 'text'])
  },
  community: {
    current: null,
    ...createRelatedData(['list', 'message', 'participation', 'invitation']),
    searchCondition: createSearchCondition(['name', 'maker', 'text'])
  },
  user: {
    login: null,
    current: null,
    ...createRelatedData(['list', 'relationship']),
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
  order: {
    current: null,
    ...createRelatedData(['list', 'message'])
  },
})

export const getters = {
  cartProducts: state => state.carts.map(cart => ({
    price: cart.product.price,
    quantity: cart.quantity,
  })),
  cartTotalPrice: (state, getters) => getters.cartProducts.reduce((total, cart) => total + cart.price * cart.quantity * 1.1, 0),
  cartTotalQuantity: (state, getters) => getters.cartProducts.reduce((total, cart) => total + cart.quantity, 0),
  productButtonClass: state => (actionType, id) => {
    if (actionType === 'favorite' && state.product.favorite.some(item => item.id === id)) {
      return 'likeColor';
    } else if (actionType === 'unfavorite' && state.product.unfavorite.some(item => item.id === id)) {
      return 'dislikeColor';
    } else {
      return 'grey';
    }
  },
  postButtonClass: state => (actionType, id) => {
    if (actionType === 'favorite' && state.post.favorite.some(item => item.id === id)) {
      return 'likeColor';
    } else if (actionType === 'unfavorite' && state.post.unfavorite.some(item => item.id === id)) {
      return 'dislikeColor';
    } else {
      return 'grey';
    }
  }
};

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
  setProductUnfavorite (state, payload) {
    state.product.unfavorite = payload
  },
  incrementProductFavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.favorites_count++;
  },
  decrementProductFavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.favorites_count--;
  },
  incrementProductUnfavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.unfavorites_count++;
  },
  decrementProductUnfavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.unfavorites_count--;
  },
  incrementCurrentProductFavoritesCount(state) {
    const product = state.product.current
    product.favorites_count++;
  },
  decrementCurrentProductFavoritesCount(state) {
    const product = state.product.current
    product.favorites_count--;
  },
  incrementCurrentProductUnfavoritesCount(state) {
    const product = state.product.current
    product.unfavorites_count++;
  },
  decrementCurrentProductUnfavoritesCount(state) {
    const product = state.product.current
    product.unfavorites_count--;
  },
  setCart (state, payload) {
    state.carts = payload
  },
  setOrder (state, payload) {
    state.order.list = payload
  },
  setOrderMessage (state, payload) {
    state.order.message = payload
  },
  setCurrentOrder (state, payload) {
    state.order.current = payload
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
  setPostUnfavorite (state, payload) {
    state.post.unfavorite = payload
  },
  incrementPostFavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.favorites_count++;
  },
  decrementPostFavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.favorites_count--;
  },
  incrementPostUnfavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.unfavorites_count++;
  },
  decrementPostUnfavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.unfavorites_count--;
  },
  incrementCurrentPostFavoritesCount(state) {
    const post = state.post.current
    post.favorites_count++;
  },
  decrementCurrentPostFavoritesCount(state) {
    const post = state.post.current
    post.favorites_count--;
  },
  incrementCurrentPostUnfavoritesCount(state) {
    const post = state.post.current
    post.unfavorites_count++;
  },
  decrementCurrentPostUnfavoritesCount(state) {
    const post = state.post.current
    post.unfavorites_count--;
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
  setUserRelationship (state, payload) {
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
  setProductSearchCondition (state, payload) {
    state.product.searchCondition = payload;
  },
  setPostSearchCondition (state, payload) {
    state.post.searchCondition = payload;
  },
  setCommunitySearchCondition (state, payload) {
    state.community.searchCondition = payload
  },
  setLoginType(state, type) {
    state.loginType = type;
  },
  setLogoutSuccess(state, payload) {
    state.logoutSuccess = payload;
  },
}

export const actions = {
  getProductList({ commit }, products) {
    const processedProducts = products.map(product => ({
      ...product.product,
      favorites_count: product.favorites_count,
      unfavorites_count: product.unfavorites_count,
    }));
    commit('setProductList', processedProducts);
  },
  getCurrentProduct ({ commit }, product) {
    const processedProduct = {
      ...product.product,
      favorites_count: product.favorites_count,
      unfavorites_count: product.unfavorites_count,
    };
    commit('setCurrentProduct', processedProduct);
  },
  getProductFavorite ({ commit }, favorites) {
    const processedFavorites = favorites.map(favorite => ({
      ...favorite.product,
      favorites_count: favorite.favorites_count,
      unfavorites_count: favorite.unfavorites_count,
    }));
    commit('setProductFavorite', processedFavorites)
  },
  getPostList ({ commit }, posts) {
    const processedPosts = posts.map(post => ({
      ...post.post,
      favorites_count: post.favorites_count,
      unfavorites_count: post.unfavorites_count,
    }));
    commit('setPostList', processedPosts)
  },
  getCurrentPost ({ commit }, post) {
    const processedPost = {
      ...post.post,
      favorites_count: post.favorites_count,
      unfavorites_count: post.unfavorites_count,
    };
    commit('setCurrentPost', processedPost);
  },
  getPostFavorite ({ commit }, favorites) {
    const processedFavorites = favorites.map(favorite => ({
      ...favorite.post,
      favorites_count: favorite.favorites_count,
      unfavorites_count: favorite.unfavorites_count,
    }));
    commit('setPostFavorite', processedFavorites)
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
  getRememberPath ({ state, commit }, { name, params }) {
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
}