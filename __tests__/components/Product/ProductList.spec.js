import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ProductList from '@/components/Product/ProductList.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ProductList.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  function createWrapper(propsData) {
    return shallowMount(ProductList, {
      localVue,
      vuetify,
      router,
      propsData,
      mocks: {
        $my: {
          productLinkToDetail: () => '',
          productLinkToEdit: () => ''
        },
        $auth: {
          user: {
            id: 1
          }
        },
        $store: {
          state: {
            product: {
              favorite: [],
              unfavorite: []
            },
            carts: []
          },
          getters: {
            productButtonClass: () => () => 'mock-class'
          },
          commit: () => {},
          dispatch: () => Promise.resolve()
        },
        $axios: {
          $delete: () => Promise.resolve(),
          $get: () => Promise.resolve(),
          $post: () => Promise.resolve(),
          $patch: () => Promise.resolve()
        }
      },
    });
  }

  it('renders title and products length', () => {
    const wrapper = createWrapper({
      title: 'Test Title',
      message: 'Test Message',
      products: [],
      otherProducts: false,
    });

    const title = wrapper.find('.font-weight-bold');
    expect(title.exists()).toBe(true);
  });

  it('renders message when products is empty', () => {
    const wrapper = createWrapper({
      message: 'No products available',
      products: [],
      otherProducts: false,
    });

    const message = wrapper.find('v-list-item-title-stub');
    expect(message.exists()).toBe(true);
    if (message.exists()) {
      expect(message.text()).toBe('（0件）');
    }
  });

  it('renders products when provided', () => {
    const wrapper = createWrapper({
      products: [
        {
          id: 1,
          name: 'Product1',
          description: 'Description for product 1',
          image_url: 'path/to/image',
          price: 100,
          favorites_count: 5,
          unfavorites_count: 2
        },
      ],
      otherProducts: false,
    });

    const productName = wrapper.find('v-card-title-stub');
    const productDescription = wrapper.find('v-card-text-stub');
    expect(productName.exists()).toBe(true);
    expect(productDescription.exists()).toBe(true);
    if (productName.exists()) {
      expect(productName.text()).toContain('Product1');
    }
    if (productDescription.exists()) {
      expect(productDescription.text()).toContain('Description for product');
    }
  });
});
