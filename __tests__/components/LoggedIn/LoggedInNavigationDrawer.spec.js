import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LoggedInNavigationDrawer from '@/components/LoggedIn/LoggedInNavigationDrawer.vue';

describe('LoggedInNavigationDrawer.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(LoggedInNavigationDrawer, {
      localVue,
      vuetify,
      router,
      stubs: ['router-link'],
      mocks: {
        $vuetify: {
          breakpoint: {
            width: 500
          }
        }
      },
      propsData: {
        drawer: true
      },
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  // 農産物メニューが表示されているかテスト
  test('renders the product menu', () => {
    const wrapper = createComponent();
    const productMenus = wrapper.findAll('.v-list-group');
    // navMenusが1つ以上存在することを確認
    expect(productMenus.length).toBeGreaterThan(0);
  });

  // その他メニューが表示されているかテスト
  test('renders the other menu', () => {
    const wrapper = createComponent();
    const otherMenus = wrapper.findAll('.v-list-item');
    // otherMenusが2つ以上存在することを確認
    expect(otherMenus.length).toBeGreaterThan(1);
  });
});
