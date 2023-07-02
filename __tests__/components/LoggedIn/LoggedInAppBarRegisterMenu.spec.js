import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import LoggedInAppBarRegisterMenu from '@/components/LoggedIn/LoggedInAppBarRegisterMenu.vue';

describe('LoggedInAppBarRegisterMenu.vue', () => {
  let vuetify;
  let localVue;

  beforeEach(() => {
    vuetify = new Vuetify();
    localVue = createLocalVue();
  });

  const createComponent = (options = {}) => {
    return mount(LoggedInAppBarRegisterMenu, {
      localVue,
      vuetify,
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  // 登録のアイコンが表示されているかテスト
  test('renders the register icon', () => {
    const wrapper = createComponent();
    const registerIcon = wrapper.findComponent({ name: 'VIcon' });
    expect(registerIcon.exists()).toBe(true);
  });
});
