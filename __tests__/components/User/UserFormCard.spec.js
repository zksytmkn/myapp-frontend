import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import UserFormCard from '@/components/User/UserFormCard.vue';

describe('UserFormCard.vue', () => {
  let localVue;
  let vuetify;
  const pageTitle = 'テストページ';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const createComponent = (propsData = {}) => {
    return mount(UserFormCard, {
      localVue,
      vuetify,
      propsData,
      mocks: {
        $route: { name: pageTitle },
        $config: { appName: 'テストアプリ' },
        $my: { pageTitle: (name) => name }
      },
      slots: {
        'user-form-card-content': '<div class="slot-content">テストコンテンツ</div>',
      },
    });
  };

  it('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the page title correctly', () => {
    const wrapper = createComponent();
    expect(wrapper.find('h1').text()).toContain(pageTitle);
  });

  it('renders slot content correctly', () => {
    const wrapper = createComponent();
    expect(wrapper.find('.slot-content').exists()).toBe(true);
  });
});
