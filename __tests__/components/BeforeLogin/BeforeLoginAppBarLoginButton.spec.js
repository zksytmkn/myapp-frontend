import { shallowMount } from '@vue/test-utils';
import BeforeLoginAppBarLoginButton from '@/components/BeforeLogin/BeforeLoginAppBarLoginButton.vue';

describe('BeforeLoginAppBarLoginButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Login')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarLoginButton, {
      mocks: {
        $my
      }
    });
  });

  it('renders correctly', () => {
    // コンポーネントが正しくレンダリングされているか確認
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has the correct default properties', () => {
    // デフォルトのプロパティが正しいか確認
    const button = wrapper.find('v-btn');
    expect(button.classes()).toContain('ml-2');
    expect(button.classes()).toContain('font-weight-bold');
    expect(button.attributes('color')).toBe('black');
    expect(button.attributes('text')).toBe(''); // 'text' property exists
  });

  it('displays the correct page title', () => {
    // ボタン内のテキストが正しいか確認
    const buttonText = wrapper.find('v-btn').text();
    expect(buttonText).toContain('Login');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn');
    expect(button.attributes('to')).toBe('/login');
  });
});
