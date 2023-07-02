import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import UserList from '@/components/Mypage/UserList.vue';

describe('UserList.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(UserList, {
      localVue,
      vuetify,
      router,
      stubs: {
        'mypage-menu': true,
      },
      propsData: options.props,
      mocks: {
        $my: {
          userLinkToProfile: id => `/profile/${id}`,
        },
      },
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  // タイトルが正しく表示されているかテスト
  test('renders the title', () => {
    const wrapper = createComponent({
      props: {
        title: 'Test Title',
      },
    });
    expect(wrapper.findComponent({ name: 'v-list-item-title' }).text()).toBe('Test Title');
  });
  
  test('renders message when no users', () => {
    const wrapper = createComponent({
      propsData: {
        message: 'No users found.',
        users: [],
      },
    });
    const messageItems = wrapper.findAllComponents({ name: 'v-list-item-title' });
    const messageTexts = messageItems.wrappers.map(w => w.text());
    expect(messageTexts).toContain('No users found.');
  });
  
  test('renders users with names and links to profile', () => {
    const wrapper = createComponent({
      propsData: {
        users: [
          { id: 1, name: 'Alice', image_url: null },
          { id: 2, name: 'Bob', image_url: 'http://example.com/bob.jpg' },
        ],
      },
    });
  
    const userItems = wrapper.findAllComponents({ name: 'v-list-item' }).wrappers.filter(w => w.isVisible());
  
    // Alice
    const alice = userItems[1]; // The first item is the "no users" message
    const aliceLink = alice.find('a');
    expect(aliceLink.element.getAttribute('href')).toMatch('/profile/1');
    expect(alice.findComponent({ name: 'v-list-item-title' }).text()).toBe('Alice');
  
    // Bob
    const bob = userItems[2]; // The first item is the "no users" message
    const bobLink = bob.find('a');
    expect(bobLink.element.getAttribute('href')).toMatch('/profile/2');
    expect(bob.findComponent({ name: 'v-list-item-title' }).text()).toBe('Bob');
  });
});
