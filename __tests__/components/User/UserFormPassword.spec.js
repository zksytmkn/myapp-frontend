import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import UserFormPassword from '@/components/User/UserFormPassword.vue';

describe('UserFormPassword.vue', () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const createComponent = (propsData = {}) => {
    return mount(UserFormPassword, {
      localVue,
      vuetify,
      propsData
    });
  };

  it('is a Vue instance', () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the text field with the correct label', () => {
    const wrapper = createComponent();
    expect(wrapper.find('label').text()).toBe('パスワードを入力');
  });

  it('emits update:password event when password is changed', async () => {
    const wrapper = createComponent();
    const input = wrapper.find('input');
    const newValue = 'NewPassword123!';

    await input.setValue(newValue);
    expect(wrapper.emitted('update:password')).toBeTruthy();
    expect(wrapper.emitted('update:password')[0]).toEqual([newValue]);
  });

  it('validates password correctly', async () => {
    const wrapper = createComponent({ setValidation: true });
    const input = wrapper.find('input');

    // Test invalid password
    await input.setValue('invalid');

    expect(wrapper.find('.v-messages__message').exists()).toBe(true);
    expect(wrapper.find('.v-messages__message').text()).toContain('8文字以上。英数字と記号を含む必要があります。');
  });
});
