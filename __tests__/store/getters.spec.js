import { getters } from '../../store/index.js'

let state;

beforeEach(() => {
  state = {
    carts: [
      {
        product: { price: 100 },
        quantity: 2,
      },
      {
        product: { price: 200 },
        quantity: 3,
      }
    ],
    product: {
      favorite: [{ id: 1 }, { id: 2 }],
      unfavorite: [{ id: 3 }]
    },
    post: {
      favorite: [{ id: 1 }],
      unfavorite: [{ id: 2 }, { id: 3 }]
    }
  };
});

test('should calculate cartProducts correctly', () => {
  const result = getters.cartProducts(state);

  expect(result).toEqual([
    { price: 100, quantity: 2 },
    { price: 200, quantity: 3 },
  ]);
});

test('should calculate cartTotalPrice correctly', () => {
  const cartProducts = getters.cartProducts(state);
  const result = getters.cartTotalPrice(state, { cartProducts });

  expect(result).toEqual(880);
});

test('should calculate cartTotalQuantity correctly', () => {
  const cartProducts = getters.cartProducts(state);
  const result = getters.cartTotalQuantity(state, { cartProducts });

  expect(result).toEqual(5);
});

test('should return correct productButtonClass', () => {
  expect(getters.productButtonClass(state)('favorite', 1)).toEqual('likeColor');
  expect(getters.productButtonClass(state)('favorite', 3)).toEqual('grey');
  expect(getters.productButtonClass(state)('unfavorite', 3)).toEqual('dislikeColor');
  expect(getters.productButtonClass(state)('unfavorite', 1)).toEqual('grey');
});

test('should return correct postButtonClass', () => {
  expect(getters.postButtonClass(state)('favorite', 1)).toEqual('likeColor');
  expect(getters.postButtonClass(state)('favorite', 2)).toEqual('grey');
  expect(getters.postButtonClass(state)('unfavorite', 2)).toEqual('dislikeColor');
  expect(getters.postButtonClass(state)('unfavorite', 1)).toEqual('grey');
});
