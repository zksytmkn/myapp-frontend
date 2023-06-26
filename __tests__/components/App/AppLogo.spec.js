import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AppLogo from '@/components/App/AppLogo.vue'

const localVue = createLocalVue()

describe('AppLogo', () => {
  let wrapper
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = shallowMount(AppLogo, {
      localVue,
      vuetify,
    })
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('v-avatar-stub').exists()).toBe(true)
  })

  it('renders the correct text', () => {
    expect(wrapper.find('v-avatar-stub').text()).toBe('Edi')
  })
})
