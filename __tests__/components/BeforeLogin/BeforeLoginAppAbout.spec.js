import { mount } from '@vue/test-utils';
import BeforeLoginAppAbout from '@/components/BeforeLogin/BeforeLoginAppAbout.vue';

describe('BeforeLoginAppAbout.vue', () => {

  // このコンポーネントが正しくマウントされるかをテスト
  test('is a Vue instance', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    expect(wrapper.vm).toBeTruthy();
  });

  // タイトルが正しくレンダリングされるかテスト
  test('renders the correct title', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    expect(wrapper.find('v-card-title').text()).toBe('＊『Edible』ができること');
  });

  // showImgsの初期値がtrueであるかテスト
  test('showImgs is initially true', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    expect(wrapper.vm.showImgs).toBe(true);
  });

  // showImgsがwindowサイズに応じて変更されるかテスト
  test('showImgs changes based on window width', async () => {
    const wrapper = mount(BeforeLoginAppAbout);
    
    // ウィンドウの幅を1280pxに設定
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 1280});
    await wrapper.vm.getWindowWidth();
    expect(wrapper.vm.showImgs).toBe(true);

    // ウィンドウの幅を1200pxに設定
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 1200});
    await wrapper.vm.getWindowWidth();
    expect(wrapper.vm.showImgs).toBe(false);
  });

  // 画像が正しくレンダリングされるかテスト
  test('renders images correctly', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    const img = wrapper.find('v-img');
    expect(img.exists()).toBe(true);
    expect(img.attributes().src).toBe('test-file-stub');
  });

  // 登録ボタンが表示されているかテスト
  test('renders the registration button', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    const button = wrapper.find('before-login-app-bar-signup-button');
    expect(button.exists()).toBe(true);
  });

  // ゲストログインボタンが表示されているかテスト
  test('renders the guest login button', () => {
    const wrapper = mount(BeforeLoginAppAbout);
    const button = wrapper.find('before-login-app-bar-guest-login-button');
    expect(button.exists()).toBe(true);
  });

  // 登録ボタンがクリックされたときのイベントをテスト
  test('emits an event when the registration button is clicked', async () => {
    const wrapper = mount(BeforeLoginAppAbout);
    const button = wrapper.find('before-login-app-bar-signup-button');
    
    // ボタンをクリック
    await button.trigger('click');
    
    // イベントが正しく発生したかチェック
    expect(wrapper.emitted('registration-button-clicked')).toBeTruthy();
  });

  // ゲストログインボタンがクリックされたときのイベントをテスト
  test('emits an event when the guest login button is clicked', async () => {
    const wrapper = mount(BeforeLoginAppAbout);
    const button = wrapper.find('before-login-app-bar-guest-login-button');
    
    // ボタンをクリック
    await button.trigger('click');
    
    // イベントが正しく発生したかチェック
    expect(wrapper.emitted('guest-login-button-clicked')).toBeTruthy();
  });
});
