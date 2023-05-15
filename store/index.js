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
  }
})

export const getters = {
  cartProducts: state => state.carts.map(cart => ({
    price: cart.product.price,
    quantity: cart.quantity,
  })),
  cartTotalPrice: (state, getters) => getters.cartProducts.reduce((total, cart) => total + cart.price * cart.quantity * 1.1, 0),
  cartTotalQuantity: (state, getters) => getters.cartProducts.reduce((total, cart) => total + cart.quantity, 0),
  buttonClass: state => (actionType, id) => {
    if (actionType === 'favorite' && state.product.favorite.some(item => item.id === id)) {
      return 'likeColor';
    } else if (actionType === 'unfavorite' && state.product.unfavorite.some(item => item.id === id)) {
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
  setProductFavoritesCount (state, count) {
    state.product.favorites_count = count
  },
  incrementProductFavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.favorites_count++;
  },
  decrementProductFavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.favorites_count--;
  },
  setProductUnfavorite (state, payload) {
    state.product.unfavorite = payload
  },
  setProductUnfavoritesCount (state, count) {
    state.product.unfavorites_count = count
  },
  incrementProductUnfavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
    product.unfavorites_count++;
  },
  decrementProductUnfavoritesCount(state, id) {
    const product = state.product.list.find(product => product.id === id);
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
  setPostFavoritesCount (state, count) {
    state.post.favorites_count = count
  },  
  incrementPostFavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.favorites_count++;
  },
  decrementPostFavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.favorites_count--;
  },
  setPostUnfavorite (state, payload) {
    state.post.unfavorite = payload
  },
  setPostUnfavoritesCount (state, count) {
    state.post.unfavorites_count = count
  },
  incrementPostUnfavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
    post.unfavorites_count++;
  },
  decrementPostUnfavoritesCount(state, id) {
    const post = state.post.list.find(post => post.id === id);
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
  setProductSearchCondition (state, payload) {
    state.product.searchCondition = payload;
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
  getProductList({ commit }, products) {
    const processedProducts = products.map(product => ({
      ...product.product,
      favorites_count: product.favorites_count,
      unfavorites_count: product.unfavorites_count,
    }));
    commit('setProductList', processedProducts);
  },
  getCurrentProduct ({ commit }, { product, favoritesCount, unfavoritesCount }) {
    commit('setCurrentProduct', product)
    commit('setProductFavoritesCount', favoritesCount)
    commit('setProductUnfavoritesCount', unfavoritesCount)
  },
  getProductFavorite ({ commit }, favorites) {
    const processedFavorites = favorites.map(favorite => ({
      ...favorite.product,
      favorites_count: favorite.favorites_count,
      unfavorites_count: favorite.unfavorites_count,
    }));
    commit('setProductFavorite', processedFavorites)
  },
  getProductUnfavorite ({ commit }, unfavorites) {
    unfavorites = unfavorites || []
    commit('setProductUnfavorite', unfavorites)
  },
  getCarts ({ commit }, carts) {
    carts = carts || []
    commit('setCart', carts) 
  },
  getOrders ({ commit }, orders) {
    orders = orders || []
    commit('setOrder', orders)
  },
  getCurrentOrder ({ commit }, order) {
    commit('setCurrentOrder', order) 
  },
  getOrderMessage ({ commit }, messages) {
    messages = messages || []
    commit('setOrderMessage', messages)
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
  getPostFavorite ({ commit }, favorites) {
    favorites = favorites || []
    commit('setPostFavorite', favorites)
  },
  getPostUnfavorite ({ commit }, unfavorites) {
    unfavorites = unfavorites || []
    commit('setPostUnfavorite', unfavorites)
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
  getRememberPath ({ state, commit }, { name, params }) {
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
  updateProductSearchCondition ({ commit }, { name, seller, description, category, prefecture }) {
    category = category || []
    prefecture = prefecture || []
    commit('setProductSearchCondition', { name, seller, description, category, prefecture })
  },
  updatePostSearchCondition ({ commit }, { name, poster, text }) {
    commit('setPostSearchCondition', { name, poster, text })
  },
  updateCommunitySearchCondition ({ commit }, { name, maker, type, prefecture }) {
    commit('setCommunitySearchCondition', { name, maker, type, prefecture })
  },
  async handlePostFavorites({ commit }, { id, type, method }) {
    try {
      // ログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
      const [favorites, unfavorites] = await Promise.all([
        this.$axios.$get('api/v1/post_favorites'),
        this.$axios.$get('api/v1/post_unfavorites')
      ]);

      // APIリクエストを送信
      if (method === 'delete') {
        await this.$axios[method](`/api/v1/post_${type}s/${id}/user`);
      } else {
        await this.$axios[method](`/api/v1/post_${type}s`, { post_id: id });
      }

      // 更新後のログインユーザーのpost_favoritesとpost_unfavoritesを取得し、Vuexストアに反映
      const [updatedFavorites, updatedUnfavorites] = await Promise.all([
        this.$axios.$get('api/v1/post_favorites'),
        this.$axios.$get('api/v1/post_unfavorites')
      ]);
  
      // Vuexストア内のデータを直接更新
      if (method === 'post') {
        if (type === 'favorite') {
          if (unfavorites.some(unfavorite => unfavorite.id === id)) {
            commit('decrementPostUnfavoritesCount', id);
          }
          commit('incrementPostFavoritesCount', id);
        } else {
          if (favorites.some(favorite => favorite.id === id)) {
            commit('decrementPostFavoritesCount', id);
          }
          commit('incrementPostUnfavoritesCount', id);
        }
      } else if (method === 'delete') {
        if (type === 'favorite') {
          commit('decrementPostFavoritesCount', id);
        } else {
          commit('decrementPostUnfavoritesCount', id);
        }
      }
  
      commit('setPostFavorite', updatedFavorites);
      commit('setPostUnfavorite', updatedUnfavorites);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
}