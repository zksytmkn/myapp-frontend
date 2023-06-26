import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AppTitle from '@/components/App/AppTitle.vue'

describe('AppTitle.vue', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuetify)

    wrapper = shallowMount(AppTitle, {
      localVue,
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
