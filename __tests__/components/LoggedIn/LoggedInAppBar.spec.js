import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LoggedInAppBar from '@/components/LoggedIn/LoggedInAppBar.vue';

describe('LoggedInAppBar.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(LoggedInAppBar, {
      localVue,
      vuetify,
      router,
      stubs: {
        'nuxt-link': true,
        'app-logo': true,
        'app-title': true,
        'logged-in-app-bar-cart-menu': true,
        'logged-in-app-bar-register-menu': true,
        'logged-in-app-bar-account-menu': true,
        'logged-in-app-bar-breadcrumbs': true,
        ...options.stubs
      },
      mocks: {
        $store: {
          state: {
            loggedIn: {
              homePath: { name: 'home' }
            }
          }
        },
        $route: {
          name: 'home'
        },
        $vuetify: {
          breakpoint: {
            width: 500
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

  // Edibleロゴが存在するかテスト
  test('contains app-logo', () => {
    const wrapper = createComponent();
    expect(wrapper.find('app-logo-stub').exists()).toBe(true);
  });

  // カートメニューが表示されているかテスト
  test('renders the cart menu', () => {
    const wrapper = createComponent();
    const cartMenu = wrapper.find('logged-in-app-bar-cart-menu-stub');
    expect(cartMenu.exists()).toBe(true);
  });

  // 登録メニューが表示されているかテスト
  test('renders the register menu', () => {
    const wrapper = createComponent();
    const registerMenu = wrapper.find('logged-in-app-bar-register-menu-stub');
    expect(registerMenu.exists()).toBe(true);
  });

  // アカウントメニューが表示されているかテスト
  test('renders the account menu', () => {
    const wrapper = createComponent();
    const accountMenu = wrapper.find('logged-in-app-bar-account-menu-stub');
    expect(accountMenu.exists()).toBe(true);
  });

  // パンくずリストが表示されているかテスト
  test('renders breadcrumbs when width is greater than 460', () => {
    const wrapper = createComponent();
    const breadcrumbs = wrapper.find('logged-in-app-bar-breadcrumbs-stub');
    expect(breadcrumbs.exists()).toBe(true);
  });
});
