import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppAboutBar from '@/components/BeforeLogin/BeforeLoginAppAbout.vue';

describe('BeforeLoginAppAboutBar.vue', () => {

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const $t = (msg) => msg;

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    return mount(BeforeLoginAppAboutBar, {
      localVue,
      vuetify,
      mocks: { $t },
      stubs: {
        'nuxt-link': true,
        'before-login-app-bar-guest-login-button': true,
        'before-login-app-bar-signup-button': true,
        ...options.stubs
      },  
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
      const wrapper = createComponent();
      expect(wrapper.vm).toBeTruthy();
  });

  // ゲストログインボタンが表示されているかテスト
  test('renders the signup button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-signup-button-stub');
      expect(button.exists()).toBe(true);
  });

  // 登録ボタンが表示されているかテスト
  test('renders the signup button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-signup-button-stub');
      expect(button.exists()).toBe(true);
  });

});
