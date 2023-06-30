import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppBarGuestLoginButton from '@/components/BeforeLogin/BeforeLoginAppBarGuestLoginButton.vue';

const localVue = createLocalVue();

describe('BeforeLoginAppBarGuestLoginButton.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify(); // Vuetifyインスタンスを作成

    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Signup')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarGuestLoginButton, {
      localVue,
      vuetify, // Vuetifyインスタンスを渡す
      mocks: {
        $my
      },
      stubs: {
        // 必要なコンポーネントをスタブ化
        'before-login-app-bar-guest-login-button': true,
        'v-btn': true
      }
    });
  });

  it('renders correctly', () => {
    // コンポーネントが正しくレンダリングされているか確認
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has the correct default properties', () => {
    // デフォルトのプロパティが正しいか確認
    const button = wrapper.find('v-btn-stub'); // スタブのために -stub サフィックスを使う
    expect(button.classes()).toContain('ml-2');
    expect(button.classes()).toContain('font-weight-bold');
    expect(button.attributes('color')).toBe('orange');
    expect(button.attributes('outlined')).toBe('true');
  });

  it('has a slot with page title', () => {
    // slotの中にpageTitleが正しく表示されているか確認
    const slotContent = wrapper.find('v-btn-stub').text(); // スタブのために -stub サフィックスを使う
    expect(slotContent).toContain('Signup');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn-stub'); // スタブのために -stub サフィックスを使う
    expect(button.attributes('to')).toBe('/signup');
  });
});
