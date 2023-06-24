import { shallowMount } from '@vue/test-utils'
import MyLogo from '@/components/MyLogo.vue'

describe('MyLogo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MyLogo)
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('v-avatar-stub').exists()).toBe(true)
  })

  it('renders the correct text', () => {
    expect(wrapper.find('v-avatar-stub').text()).toBe('Edi')
  })
})
