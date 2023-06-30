import { shallowMount } from '@vue/test-utils';
import BeforeLoginAppBarSignupButton from '@/components/BeforeLogin/BeforeLoginAppBarSignupButton.vue';

describe('BeforeLoginAppBarSignupButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Signup')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarSignupButton, {
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
    expect(button.attributes('color')).toBe('blue');
    expect(button.attributes('outlined')).toBe(''); // 'outlined' property exists
  });

  it('has a slot with page title', () => {
    // slotの中にpageTitleが正しく表示されているか確認
    const slotContent = wrapper.find('v-btn').html();
    expect(slotContent).toContain('Signup');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn');
    expect(button.attributes('to')).toBe('/signup');
  });
});
