import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import MypageMenu from '@/components/Mypage/MypageMenu.vue';

describe('MypageMenu.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(MypageMenu, {
      localVue,
      vuetify,
      router,
      mocks: {
        $store: {
          state: {
            user: {
              current: options.currentUser || null
            }
          }
        },
        $auth: {
          user: options.authUser || { id: 456 }
        },
        $my: {
          userLinkToProfile: id => `/profile/${id}`,
          userLinkToFollowing: id => `/following/${id}`,
          userLinkToFollowed: id => `/followers/${id}`
        }
      }
    });
  };

  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders the title "マイページ"', async () => {
    const wrapper = createComponent();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'v-list-item-title' }).text()).toBe('マイページ');
  });

  test('renders links with correct href when currentUser is set', async () => {
    const currentUser = { id: 123 };
    const wrapper = createComponent({ currentUser });
  
    await wrapper.vm.$nextTick();
  
    const links = wrapper.findAll('.v-list-item');
    expect(links.at(1).props('to')).toBe('/profile/123');
    expect(links.at(2).props('to')).toBe('/following/123');
    expect(links.at(3).props('to')).toBe('/followers/123');
  });
  
  test('renders links with correct href when currentUser is not set', async () => {
    const wrapper = createComponent();
  
    await wrapper.vm.$nextTick();
  
    const links = wrapper.findAll('.v-list-item');
    expect(links.at(1).props('to')).toBe('/profile/456');
    expect(links.at(2).props('to')).toBe('/following/456');
    expect(links.at(3).props('to')).toBe('/followers/456');
  });
  
  test('renders personal info link only when currentUser is the same as $auth.user', async () => {
    const currentUser = { id: 123 };
    const authUser = { id: 123 };
    const wrapperWithSameUser = createComponent({ currentUser, authUser });
  
    await wrapperWithSameUser.vm.$nextTick();
  
    const linksWithSameUser = wrapperWithSameUser.findAll('.v-list-item');
    expect(linksWithSameUser.at(4).isVisible()).toBe(true);
  
    const currentUserDifferent = { id: 123 };
    const authUserDifferent = { id: 456 };
    const wrapperWithDifferentUser = createComponent({ currentUser: currentUserDifferent, authUser: authUserDifferent });
  
    await wrapperWithDifferentUser.vm.$nextTick();
  
    const linksWithDifferentUser = wrapperWithDifferentUser.findAll('.v-list-item');
    expect(linksWithDifferentUser.at(4).isVisible()).toBe(false);
  });
});
