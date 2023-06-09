import { mutations } from './index.js';

let state;

beforeEach(() => {
  state = {
    styles: {
      beforeLoginAppBarHeight: 56
    },
    loggedIn: {
      homePath: {
        name: 'products-list'
      },
      rememberPath: {
        name: 'products-list',
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
      list: [],
      comment: [],
      favorite: [],
      unfavorite: [],
      searchCondition: {
        name: '',
        seller: '',
        description: '',
        category: '',
        prefecture: '',
      }
    },
    post: {
      current: null,
      list: [],
      comment: [],
      favorite: [],
      unfavorite: [],
      searchCondition: {
        name: '',
        poster: '',
        text: ''
      },
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
      },
    },
    user: {
      login: null,
      current: null,
      list: [],
      relationship: [],
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
      list: [],
      message: []
    },
  };
});

test('setProductList should set the product list in the state', () => {
  const products = [
    { id: 1, favorites_count: 5, unfavorites_count: 3 },
    { id: 2, favorites_count: 4, unfavorites_count: 2 },
  ];

  mutations.setProductList(state, products);

  expect(state.product.list).toEqual(products);
});

test('setCurrentProduct should set the current product in the state', () => {
  const product = { id: 1, favorites_count: 5, unfavorites_count: 3 };

  mutations.setCurrentProduct(state, product);

  expect(state.product.current).toEqual(product);
});

test('setProductComment should set the product comment in the state', () => {
  const comments = [
    { id: 1, content: "This is a product comment." },
    { id: 2, content: "Another product comment." },
  ];

  mutations.setProductComment(state, comments);

  expect(state.product.comment).toEqual(comments);
});

test('setProductFavorite should set the product favorite in the state', () => {
  const favorites = [
    {
      product: { id: 1 },
      favorites_count: 10,
      unfavorites_count: 2,
    },
    {
      product: { id: 2 },
      favorites_count: 5,
      unfavorites_count: 3,
    }
  ];

  const processedFavorites = favorites.map(favorite => ({
    ...favorite.product,
    favorites_count: favorite.favorites_count,
    unfavorites_count: favorite.unfavorites_count,
  }));

  mutations.setProductFavorite(state, processedFavorites);

  expect(state.product.favorite).toEqual(processedFavorites);
});

test('setProductUnfavorite should set the product unfavorite in the state', () => {
  const unfavorites = [{ id: 1 }, { id: 2 }, { id: 3 }];

  mutations.setProductUnfavorite(state, unfavorites);

  expect(state.product.unfavorite).toEqual(unfavorites);
});

test('setProductSearchCondition should set the product search condition in the state', () => {
  const searchCondition = {
    name: 'Test',
    seller: 'Test Seller',
    description: 'Test Description',
    category: ['野菜'],
    prefecture: ['北海道']
  };

  mutations.setProductSearchCondition(state, searchCondition);

  expect(state.product.searchCondition).toEqual(searchCondition);
});

test('incrementProductFavoritesCount should increment the favorites count of a product', () => {
  state.product.list = [
    { id: 1, favorites_count: 0 },
    { id: 2, favorites_count: 1 },
  ];

  mutations.incrementProductFavoritesCount(state, 1);

  expect(state.product.list[0].favorites_count).toEqual(1);
});

test('incrementProductUnfavoritesCount should increment the unfavorites count of a product', () => {
  state.product.list = [
    { id: 1, unfavorites_count: 0 },
    { id: 2, unfavorites_count: 1 },
  ];

  mutations.incrementProductUnfavoritesCount(state, 1);

  expect(state.product.list[0].unfavorites_count).toEqual(1);
});

test('decrementProductFavoritesCount should decrement the favorites count of a product', () => {
  state.product.list = [
    { id: 1, favorites_count: 1 },
    { id: 2, favorites_count: 1 },
  ];

  mutations.decrementProductFavoritesCount(state, 1);

  expect(state.product.list[0].favorites_count).toEqual(0);
});

test('decrementProductUnfavoritesCount should decrement the unfavorites count of a product', () => {
  state.product.list = [
    { id: 1, unfavorites_count: 1 },
    { id: 2, unfavorites_count: 1 },
  ];

  mutations.decrementProductUnfavoritesCount(state, 1);

  expect(state.product.list[0].unfavorites_count).toEqual(0);
});

test('incrementCurrentProductFavoritesCount should increment the favorites count of the current product', () => {
  state.product.current = { id: 1, favorites_count: 0 };

  mutations.incrementCurrentProductFavoritesCount(state);

  expect(state.product.current.favorites_count).toEqual(1);
});

test('incrementCurrentProductUnfavoritesCount should increment the unfavorites count of the current product', () => {
  state.product.current = { id: 1, unfavorites_count: 0 };

  mutations.incrementCurrentProductUnfavoritesCount(state);

  expect(state.product.current.unfavorites_count).toEqual(1);
});

test('decrementCurrentProductFavoritesCount should decrement the favorites count of the current product', () => {
  state.product.current = { id: 1, favorites_count: 1 };

  mutations.decrementCurrentProductFavoritesCount(state);

  expect(state.product.current.favorites_count).toEqual(0);
});

test('decrementCurrentProductUnfavoritesCount should decrement the unfavorites count of the current product', () => {
  state.product.current = { id: 1, unfavorites_count: 1 };

  mutations.decrementCurrentProductUnfavoritesCount(state);

  expect(state.product.current.unfavorites_count).toEqual(0);
});

test('setPostList should set the post list in the state', () => {
  const posts = [
    { id: 1, favorites_count: 5, unfavorites_count: 3 },
    { id: 2, favorites_count: 4, unfavorites_count: 2 },
  ];

  mutations.setPostList(state, posts);

  expect(state.post.list).toEqual(posts);
});

test('setCurrentPost should set the current post in the state', () => {
  const post = { id: 1, favorites_count: 5, unfavorites_count: 3 };

  mutations.setCurrentPost(state, post);

  expect(state.post.current).toEqual(post);
});

test('setPostComment should set the post comment in the state', () => {
  const comments = [
    { id: 1, content: "This is a post comment." },
    { id: 2, content: "Another post comment." },
  ];

  mutations.setPostComment(state, comments);

  expect(state.post.comment).toEqual(comments);
});

test('setPostFavorite should set the post favorite in the state', () => {
  const favorites = [
    {
      post: { id: 1 },
      favorites_count: 10,
      unfavorites_count: 2,
    },
    {
      post: { id: 2 },
      favorites_count: 5,
      unfavorites_count: 3,
    }
  ];

  const processedFavorites = favorites.map(favorite => ({
    ...favorite.post,
    favorites_count: favorite.favorites_count,
    unfavorites_count: favorite.unfavorites_count,
  }));

  mutations.setPostFavorite(state, processedFavorites);

  expect(state.post.favorite).toEqual(processedFavorites);
});

test('setPostUnfavorite should set the post unfavorite in the state', () => {
  const unfavorites = [{ id: 1 }, { id: 2 }, { id: 3 }];

  mutations.setPostUnfavorite(state, unfavorites);

  expect(state.post.unfavorite).toEqual(unfavorites);
});

test('setPostSearchCondition should set the post search condition in the state', () => {
  const searchCondition = {title: 'Title', poster: 'Poster', body: 'Body'};

  mutations.setPostSearchCondition(state, searchCondition);

  expect(state.post.searchCondition).toEqual(searchCondition);
});

test('incrementPostFavoritesCount should increment the favorites count of a post', () => {
  state.post.list = [
    { id: 1, favorites_count: 0 },
    { id: 2, favorites_count: 1 },
  ];

  mutations.incrementPostFavoritesCount(state, 1);

  expect(state.post.list[0].favorites_count).toEqual(1);
});

test('incrementPostUnfavoritesCount should increment the unfavorites count of a post', () => {
  state.post.list = [
    { id: 1, unfavorites_count: 0 },
    { id: 2, unfavorites_count: 1 },
  ];

  mutations.incrementPostUnfavoritesCount(state, 1);

  expect(state.post.list[0].unfavorites_count).toEqual(1);
});

test('decrementPostFavoritesCount should decrement the favorites count of a post', () => {
  state.post.list = [
    { id: 1, favorites_count: 1 },
    { id: 2, favorites_count: 1 },
  ];

  mutations.decrementPostFavoritesCount(state, 1);

  expect(state.post.list[0].favorites_count).toEqual(0);
});

test('decrementPostUnfavoritesCount should decrement the unfavorites count of a post', () => {
  state.post.list = [
    { id: 1, unfavorites_count: 1 },
    { id: 2, unfavorites_count: 1 },
  ];

  mutations.decrementPostUnfavoritesCount(state, 1);

  expect(state.post.list[0].unfavorites_count).toEqual(0);
});

test('incrementCurrentPostFavoritesCount should increment the favorites count of the current post', () => {
  state.post.current = { id: 1, favorites_count: 0 };

  mutations.incrementCurrentPostFavoritesCount(state);

  expect(state.post.current.favorites_count).toEqual(1);
});

test('incrementCurrentPostUnfavoritesCount should increment the unfavorites count of the current post', () => {
  state.post.current = { id: 1, unfavorites_count: 0 };

  mutations.incrementCurrentPostUnfavoritesCount(state);

  expect(state.post.current.unfavorites_count).toEqual(1);
});

test('decrementCurrentPostFavoritesCount should decrement the favorites count of the current post', () => {
  state.post.current = { id: 1, favorites_count: 1 };

  mutations.decrementCurrentPostFavoritesCount(state);

  expect(state.post.current.favorites_count).toEqual(0);
});

test('decrementCurrentPostUnfavoritesCount should decrement the unfavorites count of the current post', () => {
  state.post.current = { id: 1, unfavorites_count: 1 };

  mutations.decrementCurrentPostUnfavoritesCount(state);

  expect(state.post.current.unfavorites_count).toEqual(0);
});

test('setCommunityList should set the community list in the state', () => {
  const communities = [
    { id: 1, name: 'Community 1' },
    { id: 2, name: 'Community 2' },
  ];

  mutations.setCommunityList(state, communities);

  expect(state.community.list).toEqual(communities);
});

test('setCurrentCommunity should set the current community in the state', () => {
  const community = { id: 1, name: 'Community 1' };

  mutations.setCurrentCommunity(state, community);

  expect(state.community.current).toEqual(community);
});

test('setCommunityMessage should set the community message in the state', () => {
  const messages = [
    { id: 1, content: "This is the first community message." },
    { id: 2, content: "This is the second community message." },
  ];

  mutations.setCommunityMessage(state, messages);

  expect(state.community.message).toEqual(messages);
});

test('setCommunitySearchCondition should set the community search condition in the state', () => {
  const searchCondition = { name: 'community', maker: 'maker', description: 'description' };

  mutations.setCommunitySearchCondition(state, searchCondition);

  expect(state.community.searchCondition).toEqual(searchCondition);
});

test('setParticipationCommunity should set the participation community in the state', () => {
  const participations = [
    { id: 1, community: { id: 1, name: 'Community 1' }, user_id: 1 },
    { id: 2, community: { id: 2, name: 'Community 2' }, user_id: 2 },
  ];

  mutations.setParticipationCommunity(state, participations);

  expect(state.community.participation).toEqual(participations);
});

test('setInvitationCommunity should set the invitation community in the state', () => {
  const invitations = [
    { id: 1, community: { id: 1, name: 'Community 1' }, invited_id: 1 },
    { id: 2, community: { id: 2, name: 'Community 2' }, invited_id: 2 },
  ];

  mutations.setInvitationCommunity(state, invitations);

  expect(state.community.invitation).toEqual(invitations);
});

test('setCart should set the cart in the state', () => {
  const carts = [
    { id: 1, product: { id: 1, name: 'Product 1', favorites_count: 10, unfavorites_count: 5 }, quantity: 1 },
    { id: 2, product: { id: 2, name: 'Product 2', favorites_count: 20, unfavorites_count: 10 }, quantity: 2 },
  ];

  mutations.setCart(state, carts);

  expect(state.carts).toEqual(carts);
});

test('setOrder should set the order list in the state', () => {
  const orders = [
    { id: 1, total: 100 },
    { id: 2, total: 200 },
  ];

  mutations.setOrder(state, orders);

  expect(state.order.list).toEqual(orders);
});

test('setCurrentOrder should set the current order in the state', () => {
  const order = { id: 1, total: 100 };

  mutations.setCurrentOrder(state, order);

  expect(state.order.current).toEqual(order);
});

test('setOrderMessage should set the order message in the state', () => {
  const messages = [
    { id: 1, content: "This is the first order message." },
    { id: 2, content: "This is the second order message." },
  ];

  mutations.setOrderMessage(state, messages);

  expect(state.order.message).toEqual(messages);
});

test('setUserList should set the user list in the state', () => {
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ];

  mutations.setUserList(state, users);

  expect(state.user.list).toEqual(users);
});

test('setCurrentUser should set the current user in the state', () => {
  const user = { id: 1, name: 'User 1' };

  mutations.setCurrentUser(state, user);

  expect(state.user.current).toEqual(user);
});

test('setUserRelationship should set the user relationship in the state', () => {
  const relationship = {
    following: [{id: 1, name: 'User 1'}, {id: 2, name: 'User 2'}],
    followers: [{id: 3, name: 'User 3'}],
  };

  mutations.setUserRelationship(state, relationship);

  expect(state.user.relationship).toEqual(relationship);
});

test('setLoggedInUser should set the logged in user in the state', () => {
  const user = { id: 1, name: 'User 1' };

  mutations.setLoggedInUser(state, user);

  expect(state.user.login).toEqual(user);
});

test('setAuthToken should set the auth token in the state', () => {
  const token = "abcd1234";

  mutations.setAuthToken(state, token);

  expect(state.auth.token).toEqual(token);
});

test('setAuthExpires should set the auth expires in the state', () => {
  const expires = "2024-05-18";

  mutations.setAuthExpires(state, expires);

  expect(state.auth.expires).toEqual(expires);
});

test('setAuthPayload should set the auth payload in the state', () => {
  const payload = { id: 1, name: 'User 1' };

  mutations.setAuthPayload(state, payload);

  expect(state.auth.payload).toEqual(payload);
});

test('setToast should set the toast object in the state', () => {
  const toastObject = { msg: "This is a toast message.", color: "transparent", timeout: 4000 };

  mutations.setToast(state, toastObject);

  expect(state.toast).toEqual(toastObject);
});

test('setRememberPath should set the remember path in the state', () => {
  const path = "/home";

  mutations.setRememberPath(state, path);

  expect(state.loggedIn.rememberPath).toEqual(path);
});

test('setLoginType should set the login type in the state', () => {
  const type = "user";

  mutations.setLoginType(state, type);

  expect(state.loginType).toEqual(type);
});

test('setLogoutSuccess should set the logout success in the state', () => {
  const success = true;

  mutations.setLogoutSuccess(state, success);

  expect(state.logoutSuccess).toEqual(success);
});
