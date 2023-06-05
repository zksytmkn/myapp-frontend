import { state as originalState } from './index.js';

let state;

beforeEach(() => {
  state = originalState();
});

test('should have the correct initial state for styles', () => {
  expect(state.styles).toEqual({ beforeLoginAppBarHeight: 56 });
});

test('should have the correct initial state for loggedIn', () => {
  expect(state.loggedIn).toEqual({
    homePath: { name: 'products-list' },
    rememberPath: { name: 'products-list', params: {} },
    redirectPaths: ['index', 'signup', 'login']
  });
});

test('should have the correct initial state for product', () => {
  expect(state.product).toEqual({
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
      prefecture: ''
    }
  });
});

test('should have the correct initial state for post', () => {
  expect(state.post).toEqual({
    current: null,
    list: [],
    comment: [],
    favorite: [],
    unfavorite: [],
    searchCondition: {
      name: '',
      poster: '',
      text: ''
    }
  });
});

test('should have the correct initial state for community', () => {
  expect(state.community).toEqual({
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
  });
});

test('should have the correct initial state for user', () => {
  expect(state.user).toEqual({
    login: null,
    current: null,
    list: [],
    relationship: [],
  });
});

test('should have the correct initial state for auth', () => {
  expect(state.auth).toEqual({
    token: null,
    expires: 0,
    payload: {}
  });
});

test('should have the correct initial state for toast', () => {
  expect(state.toast).toEqual({
    msg: null,
    color: 'transparent',
    timeout: 4000
  });
});

test('should have the correct initial state for carts', () => {
  expect(state.carts).toEqual([]);
});

test('should have the correct initial state for order', () => {
  expect(state.order).toEqual({
    current: null,
    list: [],
    message: []
  });
});
