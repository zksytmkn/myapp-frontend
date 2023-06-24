import { shallowMount } from '@vue/test-utils'
import AppTitle from '@/components/AppTitle.vue'

describe('AppTitle.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppTitle, {
      mocks: {
        $config: { appName: 'My App' }
      }
    })
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('v-toolbar-title-stub').exists()).toBe(true)
  })

  it('renders the correct app name', () => {
    expect(wrapper.find('v-toolbar-title-stub').text()).toBe('My App')
  })
})
