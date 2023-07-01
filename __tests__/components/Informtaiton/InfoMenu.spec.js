import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import InfoMenu from '@/components/Information/InfoMenu.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('InfoMenu.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  function createWrapper() {
    return mount(InfoMenu, {
      localVue,
      vuetify,
    });
  }

  it('renders v-card', () => {
    const wrapper = createWrapper();
    expect(wrapper.findComponent({ name: 'v-card' }).exists()).toBe(true);
  });

  it('renders initial info menus', () => {
    const wrapper = createWrapper();
    const listItems = wrapper.findAllComponents({ name: 'v-list-item' });
    expect(listItems.length).toBe(4); // 1 for title and 3 for menu items
  });

  it('renders menu items with correct text and link', () => {
    const wrapper = createWrapper();
    const infoMenus = [
      { name: '注文（購入）', link: '/information/buyer' },
      { name: '注文（販売）', link: '/information/seller' },
      { name: '注文（完了）', link: '/information/close' }
    ];

    const listItems = wrapper.findAllComponents({ name: 'v-list-item' });

    infoMenus.forEach((infoMenu, index) => {
      const listItem = listItems.at(index + 1); // +1 to skip the title item
      expect(listItem.text()).toContain(infoMenu.name);
      expect(listItem.props('to')).toBe(infoMenu.link);
    });
  });
});
