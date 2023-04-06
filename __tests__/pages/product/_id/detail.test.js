import { shallowMount } from '@vue/test-utils'
import Detail from '@/pages/product/_id/detail.vue'

describe('Detail', () => {
  it('renders the product detail page', () => {
    const wrapper = shallowMount(Detail, {
      propsData: {
        productId: 1,
      },
    })

    expect(wrapper.text()).toContain('Product Details')
    expect(wrapper.find('.product-name').text()).toBe('Test Product')
    expect(wrapper.vm.productId).toBe(1)
  })
})