import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppAbout from '@/components/BeforeLogin/BeforeLoginAppAbout.vue';

describe('BeforeLoginAppAbout.vue', () => {

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const $t = (msg) => msg;

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    return mount(BeforeLoginAppAbout, {
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

  // ゲストログインボタンが表示されているかテスト
  test('renders the guest login button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-guest-login-button-stub');
      expect(button.exists()).toBe(true);
  });

  // このコンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
      const wrapper = createComponent();
      expect(wrapper.vm).toBeTruthy();
  });

  // showImgsの初期値がtrueであるかテスト
  test('showImgs is initially true', () => {
      const wrapper = createComponent();
      expect(wrapper.vm.showImgs).toBe(true);
  });

  // showImgsがwindowサイズに応じて変更されるかテスト
  test('showImgs changes based on window width', async () => {
      const wrapper = createComponent();
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1280,
        configurable: true
      });
      await wrapper.vm.getWindowWidth();
      expect(wrapper.vm.showImgs).toBe(true);

      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1200,
        configurable: true
      });
      await wrapper.vm.getWindowWidth();
      expect(wrapper.vm.showImgs).toBe(false);
  });

  // 登録ボタンが表示されているかテスト
  test('renders the signup button', () => {
      const wrapper = createComponent();
      const button = wrapper.find('before-login-app-bar-signup-button-stub');
      expect(button.exists()).toBe(true);
  });

});