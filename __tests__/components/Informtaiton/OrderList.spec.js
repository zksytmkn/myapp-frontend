import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import OrderList from '@/components/Information/OrderList.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('OrderList.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  function createWrapper(propsData = {}) {
    return mount(OrderList, {
      localVue,
      vuetify,
      propsData,
      mocks: {
        $my: {
          informationLinkToDetail: () => '',
        },
      },
      stubs: {
        'info-menu': true, // stub info-menu component
      }
    });
  }

  it('renders v-card', () => {
    const wrapper = createWrapper();
    expect(wrapper.findComponent({ name: 'v-card' }).exists()).toBe(true);
  });

  it('renders title and message correctly', () => {
    const wrapper = createWrapper({ title: 'Test Title', message: 'Test Message' });
    expect(wrapper.findComponent({ name: 'v-list-item-title' }).text()).toBe('Test Title');
  });

  it('renders "該当する注文はありませんでした。" if orders is empty', () => {
    const wrapper = createWrapper();
    const listItems = wrapper.findAllComponents({ name: 'v-list-item' });
    expect(listItems.at(1).text()).toBe('該当する注文はありませんでした。');
  });

  it('renders correct number of order items when orders is not empty', () => {
    const wrapper = createWrapper({
      orders: [
        { id: 1, product: { name: 'Product1' } },
        { id: 2, product: { name: 'Product2' } }
      ],
      message: ' is ordered'
    });
    const listItems = wrapper.findAllComponents({ name: 'v-list-item-title' });
    expect(listItems.at(2).text()).toBe('Product1 is ordered');
    expect(listItems.at(3).text()).toBe('Product2 is ordered');
  });

  it('renders v-pagination when orders is not empty', () => {
    const wrapper = createWrapper({
      orders: [
        { id: 1, product: { name: 'Product1' } }
      ]
    });
    expect(wrapper.findComponent({ name: 'v-pagination' }).exists()).toBe(true);
  });
});
