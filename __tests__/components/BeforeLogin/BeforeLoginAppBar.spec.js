import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppBar from '@/components/BeforeLogin/BeforeLoginAppBar.vue';

describe('BeforeLoginAppBar.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    return mount(BeforeLoginAppBar, {
      localVue,
      vuetify,
      stubs: {
        'nuxt-link': true,
        'app-logo': true,
        'app-title': true,
        'before-login-app-bar-signup-button': true,
        'before-login-app-bar-login-button': true,
        ...options.stubs
      },
      mocks: {
        $store: {
          state: {
            styles: {
              beforeLoginAppBarHeight: 100
            }
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

  // ヘッダーが store の値を正しく使用しているかをテスト
  test('uses beforeLoginAppBarHeight from store', () => {
      const wrapper = createComponent();
      expect(wrapper.vm.beforeLoginAppBarHeight).toBe(100);
  });

  // Edibleロゴが存在するかテスト
  test('contains app-logo', () => {
      const wrapper = createComponent();
      expect(wrapper.find('app-logo-stub').exists()).toBe(true);
  });

  // 登録ボタンが表示されているかテスト
  test('renders the signup button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-signup-button-stub');
      expect(button.exists()).toBe(true);
});

  // ログインボタンが表示されているかテスト
  test('renders the login button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-login-button-stub');
      expect(button.exists()).toBe(true);
  });

});
