import { shallowMount } from '@vue/test-utils';
import EditProduct from '@/product/_id/edit.vuu';

describe('EditProduct', () => {
  const product = { id: 1, name: 'TestProduct', price: 1000 };
  const wrapper = shallowMount(EditProduct, {
    propsData: {
      product,
    },
  });

  it('renders the correct product', () => {
    expect(wrapper.props().product).toBe(product);
  });

  it('displays the product name', () => {
    expect(wrapper.find('.product-name').text()).toMatch(product.name);
  });

  it('displays the product price', () => {
    expect(wrapper.find('.product-price').text()).toContain(product.price);
  });
});
