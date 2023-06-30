import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BeforeLoginAppBarSignupButton from '@/components/BeforeLogin/BeforeLoginAppBarSignupButton.vue';

const localVue = createLocalVue();

describe('BeforeLoginAppBarSignupButton.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    // $my オブジェクトをモック
    const $my = {
      pageTitle: jest.fn().mockReturnValue('Signup')
    };

    // コンポーネントをマウントする
    wrapper = shallowMount(BeforeLoginAppBarSignupButton, {
      localVue,
      vuetify,
      mocks: {
        $my
      },
      stubs: {
        'before-login-app-bar-signup-button': true,
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
    const button = wrapper.find('v-btn-stub');
    expect(button.classes()).toContain('ml-2');
    expect(button.classes()).toContain('font-weight-bold');
    expect(button.attributes('color')).toBe('blue');
    expect(button.attributes('outlined')).toBe('true');
  });

  it('has a slot with page title', () => {
    // slotの中にpageTitleが正しく表示されているか確認
    const slotContent = wrapper.find('v-btn-stub').html();
    expect(slotContent).toContain('Signup');
  });

  it('navigates to the correct page on click', () => {
    // クリックしたときに正しいページに遷移するか確認
    const button = wrapper.find('v-btn-stub');
    expect(button.attributes('to')).toBe('/signup');
  });
});
