import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import PostEyeCatch from '@/components/Post/PostEyeCatch.vue';

const localVue = createLocalVue();

describe('PostEyeCatch.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(PostEyeCatch, {
      localVue,
      vuetify
    });

    // v-parallaxが存在するかを確認
    expect(wrapper.find('v-parallax-stub').exists()).toBe(true); // <-- スタブの名前で検索

    // イメージソースが正しいか確認
    const image = wrapper.find('v-img-stub'); // <-- スタブの名前で検索
    expect(image.attributes().src).toBe('https://picsum.photos/id/143/1920/1080?blur=1');

    // タイトルテキストが正しいか確認
    const title = wrapper.find('.text-h5.font-weight-bold');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('Farming, gardening, food loss ... and so on.');
  });
});
