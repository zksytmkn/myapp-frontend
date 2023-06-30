import { shallowMount } from '@vue/test-utils';
import BeforeLoginAppBarGuestLoginButton from '@/components/BeforeLogin/BeforeLoginAppBarGuestLoginButton.vue';

describe('BeforeLoginAppBarGuestLoginButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Signup')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarGuestLoginButton, {
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
    expect(button.attributes('color')).toBe('orange');
    expect(button.attributes('outlined')).toBe('');
  });

  it('has a slot with page title', () => {
    // slotの中にpageTitleが正しく表示されているか確認
    const slotContent = wrapper.find('v-btn').text();
    expect(slotContent).toContain('Signup');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn');
    expect(button.attributes('to')).toBe('/signup');
  });
});
