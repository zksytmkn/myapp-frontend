import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ProductEyeCatch from '@/components/Product/ProductEyeCatch.vue';

const localVue = createLocalVue();

describe('ProductEyeCatch.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(ProductEyeCatch, {
      localVue,
      vuetify
    });

    // v-parallaxが存在するかを確認
    expect(wrapper.find('v-parallax-stub').exists()).toBe(true);

    // イメージソースが正しいか確認
    const image = wrapper.find('v-img-stub');
    expect(image.attributes().src).toBe('https://picsum.photos/id/517/1920/1080?blur=1');

    // タイトルテキストが正しいか確認
    const title = wrapper.find('.text-h5.font-weight-bold');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('Orang, apple, potato, carrot, tomato ... and so on.');
  });
});
