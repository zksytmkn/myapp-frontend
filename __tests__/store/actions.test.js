import { actions } from '../../store/index.js'

let commit;

beforeEach(() => {
  commit = jest.fn();
});

test('getProductList should commit the processed products', () => {
  const products = [
    {
      product: { id: 1 },
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      product: { id: 2 },
      favorites_count: 4,
      unfavorites_count: 2
    }
  ];

  actions.getProductList({ commit }, products);

  expect(commit).toHaveBeenCalledWith('setProductList', [
    {
      id: 1,
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      id: 2,
      favorites_count: 4,
      unfavorites_count: 2
    }
  ]);
});

test('getCurrentProduct should commit the processed product', () => {
  const product = {
    product: { id: 1 },
    favorites_count: 5,
    unfavorites_count: 3
  };

  actions.getCurrentProduct({ commit }, product);

  expect(commit).toHaveBeenCalledWith('setCurrentProduct', {
    id: 1,
    favorites_count: 5,
    unfavorites_count: 3
  });
});

test('getProductFavorite should commit the processed favorites', () => {
  const favorites = [
    {
      product: { id: 1 },
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      product: { id: 2 },
      favorites_count: 4,
      unfavorites_count: 2
    }
  ];

  actions.getProductFavorite({ commit }, favorites);

  expect(commit).toHaveBeenCalledWith('setProductFavorite', [
    {
      id: 1,
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      id: 2,
      favorites_count: 4,
      unfavorites_count: 2
    }
  ]);
});

test('getPostList should commit the processed posts', () => {
  const posts = [
    {
      post: { id: 1 },
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      post: { id: 2 },
      favorites_count: 4,
      unfavorites_count: 2
    }
  ];

  actions.getPostList({ commit }, posts);

  expect(commit).toHaveBeenCalledWith('setPostList', [
    {
      id: 1,
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      id: 2,
      favorites_count: 4,
      unfavorites_count: 2
    }
  ]);
});

test('getCurrentPost should commit the processed post', () => {
  const post = {
    post: { id: 1 },
    favorites_count: 5,
    unfavorites_count: 3
  };

  actions.getCurrentPost({ commit }, post);

  expect(commit).toHaveBeenCalledWith('setCurrentPost', {
    id: 1,
    favorites_count: 5,
    unfavorites_count: 3
  });
});

test('getPostFavorite should commit the processed favorites', () => {
  const favorites = [
    {
      post: { id: 1 },
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      post: { id: 2 },
      favorites_count: 4,
      unfavorites_count: 2
    }
  ];

  actions.getPostFavorite({ commit }, favorites);

  expect(commit).toHaveBeenCalledWith('setPostFavorite', [
    {
      id: 1,
      favorites_count: 5,
      unfavorites_count: 3
    },
    {
      id: 2,
      favorites_count: 4,
      unfavorites_count: 2
    }
  ]);
});

test('getToast should commit the toast properties with defaults', () => {
  const toast = { msg: 'Test toast' };

  actions.getToast({ commit }, toast);

  expect(commit).toHaveBeenCalledWith('setToast', {
    msg: 'Test toast',
    color: 'transparent',
    timeout: 4000
  });
});

test('getToast should commit the toast properties with custom values', () => {
  const toast = { msg: 'Test toast', color: 'red', timeout: 5000 };

  actions.getToast({ commit }, toast);

  expect(commit).toHaveBeenCalledWith('setToast', {
    msg: 'Test toast',
    color: 'red',
    timeout: 5000
  });
});

test('getRememberPath should commit the remembered path with default params', () => {
  const path = { name: 'Test path' };

  actions.getRememberPath({ commit, state: { loggedIn: { redirectPaths: [], homePath: { name: 'Home' } } } }, path);

  expect(commit).toHaveBeenCalledWith('setRememberPath', {
    name: 'Test path',
    params: {}
  });
});

test('getRememberPath should commit the remembered path with custom params', () => {
  const path = { name: 'Test path', params: { id: 1 } };

  actions.getRememberPath({ commit, state: { loggedIn: { redirectPaths: [], homePath: { name: 'Home' } } } }, path);

  expect(commit).toHaveBeenCalledWith('setRememberPath', {
    name: 'Test path',
    params: { id: 1 }
  });
});

test('getRememberPath should commit homePath name if name is in redirectPaths', () => {
  const path = { name: 'Test path', params: { id: 1 } };

  actions.getRememberPath({ commit, state: { loggedIn: { redirectPaths: ['Test path'], homePath: { name: 'Home' } } } }, path);

  expect(commit).toHaveBeenCalledWith('setRememberPath', {
    name: 'Home',
    params: { id: 1 }
  });
});
