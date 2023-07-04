import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import SettingMenu from '@/components/Setting/SettingMenu.vue';

describe('SettingMenu.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(SettingMenu, {
      localVue,
      vuetify,
      router
    });
  };

  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders the title "設定"', () => {
    const wrapper = createComponent();
    expect(wrapper.findComponent({ name: 'VListItemTitle' }).text()).toBe('設定');
  });

  test('renders menu items with correct links', () => {
    const wrapper = createComponent();
    const menuItems = wrapper.findAll('.v-list-item');
    
    expect(menuItems.at(1).props('to')).toBe('/settings/profile');
    expect(menuItems.at(2).props('to')).toBe('/settings/password');
    expect(menuItems.at(3).props('to')).toBe('/settings/email');
    expect(menuItems.at(4).props('to')).toBe('/settings/address');
    expect(menuItems.at(5).props('to')).toBe('/settings/deactivate');
  });
});
