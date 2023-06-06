import { mutations } from './index.js';

let state;

beforeEach(() => {
  state = {
    product: {
      list: [],
      current: null
    },
    post: {
      list: [],
      current: null
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
  const comment = "This is a product comment.";

  mutations.setProductComment(state, comment);

  expect(state.product.comment).toEqual(comment);
});

test('setProductFavorite should set the product favorite in the state', () => {
  const favorite = true;

  mutations.setProductFavorite(state, favorite);

  expect(state.product.favorite).toEqual(favorite);
});

test('setProductUnfavorite should set the product unfavorite in the state', () => {
  const unfavorite = false;

  mutations.setProductUnfavorite(state, unfavorite);

  expect(state.product.unfavorite).toEqual(unfavorite);
});

test('setProductSearchCondition should set the product search condition in the state', () => {
  const searchCondition = 'condition';

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