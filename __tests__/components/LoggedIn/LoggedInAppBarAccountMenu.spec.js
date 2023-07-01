import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import LoggedInAppBarAccountMenu from '@/components/LoggedIn/LoggedInAppBarAccountMenu.vue';

describe('LoggedInAppBarAccountMenu.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    return mount(LoggedInAppBarAccountMenu, {
      localVue,
      vuetify,
      router,
      stubs: {
        'v-menu': true,
        'v-btn': true,
        'v-icon': true,
        'v-list': true,
        'v-subheader': true,
        'v-list-item': true,
        'v-list-item-icon': true,
        'v-list-item-subtitle': true,
        'v-list-item-title': true,
        'v-divider': true,
        ...options.stubs
      },
      mocks: {
        $auth: {
          user: {
            name: 'John Doe',
            id: 1
          }
        },
        $my: {
          userLinkToProfile: (id) => ({ path: `/user/${id}` })
        }
      },
      ...options
    });
  };

  // コンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  // アカウントメニュー内にユーザー名が表示されているかテスト
  test('renders user name', () => {
    const wrapper = createComponent();
    const listItemSubtitle = wrapper.find('v-list-item-subtitle-stub');
    expect(listItemSubtitle.text()).toBe('John Doe');
  });

  // プロフィールリンクが正しく設定されているかテスト
  test('renders profile link correctly', () => {
    const wrapper = createComponent();
    const listItem = wrapper.findAll('v-list-item-stub').at(1); // インデックスを確認
    const toAttribute = listItem.props().to; // props() はオブジェクトを返すので、to を取得
    const expectedValue = { path: '/user/1' };
    expect(toAttribute).toEqual(expectedValue);
  });
  
  // プロフィール編集リンクが正しく設定されているかテスト
  test('renders profile settings link correctly', () => {
    const wrapper = createComponent();
    const listItem = wrapper.findAll('v-list-item-stub').at(2); // インデックスを確認
    const toAttribute = listItem.props().to; // props() はオブジェクトを返すので、to を取得
    const expectedValue = '/settings/profile';
    expect(toAttribute).toBe(expectedValue);
  });
  
  // ログアウトリンクが正しく設定されているかテスト
  test('renders logout link correctly', () => {
    const wrapper = createComponent();
    const listItem = wrapper.findAll('v-list-item-stub').at(3); // インデックスを確認
    const toAttribute = listItem.props().to; // props() はオブジェクトを返すので、to を取得
    const expectedValue = '/logout';
    expect(toAttribute).toBe(expectedValue);
  });
});
