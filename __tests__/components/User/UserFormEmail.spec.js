import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import UserFormEmail from '@/components/User/UserFormEmail.vue';

describe('UserFormEmail.vue', () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const createComponent = (propsData = {}) => {
    return mount(UserFormEmail, {
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
    const label = 'カスタムラベル';
    const wrapper = createComponent({ label });
    expect(wrapper.find('label').text()).toBe(label);
  });

  it('emits update:email event when email is changed', async () => {
    const wrapper = createComponent();
    const input = wrapper.find('input');
    const newValue = 'test@example.com';

    await input.setValue(newValue);
    expect(wrapper.emitted('update:email')).toBeTruthy();
    expect(wrapper.emitted('update:email')[0]).toEqual([newValue]);
  });
});
