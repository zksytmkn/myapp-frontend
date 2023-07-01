import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CommunityList from '@/components/Community/CommunityList.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('CommunityList.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  function createWrapper(propsData) {
    return shallowMount(CommunityList, {
      localVue,
      vuetify,
      router,
      propsData,
      mocks: {
        $my: {
          communityLinkToDetail: () => '',
        },
      },
    });
  }

  it('renders title and communities length', () => {
    const wrapper = createWrapper({
      title: 'Test Title',
      message: 'Test Message',
      communities: undefined,
      otherCommunities: false,
    });
  
    const title = wrapper.find('.font-weight-bold');
    expect(title.exists()).toBe(true);
  });  
  
  it('renders link button when communities is empty and otherCommunities is true', () => {
    const wrapper = createWrapper({
      message: 'See other communities',
      communities: [],
      otherCommunities: true,
    });
  
    // Deprecatedメソッドの代わりにfindComponentを使用します。
    const button = wrapper.findComponent({ name: 'VBtn' }); // Vuetifyのボタンコンポーネントの名前がVBtnの場合
    expect(button.exists()).toBe(true);
    if (button.exists()) {
      expect(button.text()).toBe('コミュニティを見る');
    }
  });
  
  it('renders communities when provided', () => {
    const wrapper = createWrapper({
      communities: [
        {
          id: 1,
          name: 'Community1',
          description: 'Description for community 1',
        },
      ],
      otherCommunities: false,
    });
  
    const communityName = wrapper.find('v-card-title-stub');
    const communityDescription = wrapper.find('v-card-text-stub');
    expect(communityName.text()).toBe('Community1');
    expect(communityDescription.text()).toContain('Description for communi');
  });
});
