import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import LoggedInAppBarCartMenu from '@/components/LoggedIn/LoggedInAppBarCartMenu.vue';

describe('LoggedInAppBarCartMenu.vue', () => {
  let vuetify;
  let localVue;

  beforeEach(() => {
    vuetify = new Vuetify();
    localVue = createLocalVue();
  });

  const createComponent = (options = {}) => {
    return mount(LoggedInAppBarCartMenu, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          getters: {
            cartTotalQuantity: () => 3,
          }
        }
      },
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  // カートのアイコンが表示されているかテスト
  test('renders the cart icon', () => {
    const wrapper = createComponent();
    const cartIcon = wrapper.findComponent({ name: 'VIcon' });
    expect(cartIcon.exists()).toBe(true);
  });

  // カート内の商品の総数が表示されているかテスト
  test('displays the total quantity of items in the cart', () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain('3');
  });
});
