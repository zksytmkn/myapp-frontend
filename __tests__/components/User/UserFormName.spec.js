import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import UserFormName from '@/components/User/UserFormName.vue';

describe('UserFormName.vue', () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const createComponent = (propsData = {}) => {
    return mount(UserFormName, {
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
    expect(wrapper.find('label').text()).toBe('ユーザー名を入力');
  });

  it('emits update:name event when name is changed', async () => {
    const wrapper = createComponent();
    const input = wrapper.find('input');
    const newValue = 'newusername';

    await input.setValue(newValue);
    expect(wrapper.emitted('update:name')).toBeTruthy();
    expect(wrapper.emitted('update:name')[0]).toEqual([newValue]);
  });
});
