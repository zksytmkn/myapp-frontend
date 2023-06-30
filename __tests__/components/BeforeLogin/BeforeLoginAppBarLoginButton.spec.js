import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppBarLoginButton from '@/components/BeforeLogin/BeforeLoginAppBarLoginButton.vue';

const localVue = createLocalVue();

describe('BeforeLoginAppBarLoginButton.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify(); // Vuetifyインスタンスを作成

    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Login')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarLoginButton, {
      localVue,
      vuetify, // Vuetifyインスタンスを渡す
      mocks: {
        $my
      },
      stubs: {
        // 必要なコンポーネントをスタブ化
        'before-login-app-bar-login-button': true,
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
    expect(button.attributes('color')).toBe('black');
    expect(button.attributes('text')).toBe("true"); // 'text' property exists
  });

  it('displays the correct page title', () => {
    // ボタン内のテキストが正しいか確認
    const buttonText = wrapper.find('v-btn-stub').text(); // スタブのために -stub サフィックスを使う
    expect(buttonText).toContain('Login');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn-stub'); // スタブのために -stub サフィックスを使う
    expect(button.attributes('to')).toBe('/login');
  });
});
