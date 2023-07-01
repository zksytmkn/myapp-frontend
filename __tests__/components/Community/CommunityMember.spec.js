import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import CommunityMember from '@/components/Community/CommunityMember.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('CommunityMember.vue', () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = {
      state: {
        community: {
          current: {
            participation: [
              { id: 1, name: 'User1' },
              { id: 2, name: 'User2' }
            ]
          }
        }
      }
    };
  });

  function createWrapper() {
    return mount(CommunityMember, {
      localVue,
      vuetify,
      mocks: {
        $my: {
          userLinkToProfile: () => '',
        },
        $store: store
      }
    });
  }

  it('renders v-menu', () => {
    const wrapper = createWrapper();
    expect(wrapper.findComponent({ name: 'v-menu' }).exists()).toBe(true);
  });

  it('renders "参加メンバーを見る" button if users.length is greater than 0', () => {
    const wrapper = createWrapper();
    const button = wrapper.findComponent({ name: 'v-btn' });
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('参加メンバーを見る');
  });

  it('renders user names based on users array', async () => {
    const wrapper = createWrapper();
    const button = wrapper.findComponent({ name: 'v-btn' });
  
    await button.trigger('click');    
    await wrapper.vm.$nextTick();
  
    const listItems = wrapper.findAllComponents({ name: 'v-list-item-title' });
    expect(listItems.at(0).text()).toBe('User1');
    expect(listItems.at(1).text()).toBe('User2');
  });
});
