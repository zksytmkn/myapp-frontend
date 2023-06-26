import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AppFooter from '@/components/App/AppFooter.vue'

describe('AppFooter.vue', () => {
  let wrapper
  let vuetify

  beforeEach(() => {
    const localVue = createLocalVue()

    vuetify = new Vuetify()
    localVue.use(Vuetify)

    wrapper = mount(AppFooter, {
      localVue,
      vuetify,
      mocks: {
        $config: { appName: 'MyApp' },
      },
    })
  })

  it('renders the correct copyright year', () => {
    const beginningYear = 2022
    const thisYear = new Date().getFullYear()
    const expectedYear = (beginningYear < thisYear)
      ? `${beginningYear} - ${thisYear}` : beginningYear

    expect(wrapper.text()).toContain(`©${expectedYear}`)
  })

  it('renders the correct app name', () => {
    expect(wrapper.text()).toContain('MyApp')
  })

  it('sets the correct height', () => {
    expect(wrapper.vm.height).toBe(33)
  })

  it('sets the correct margin-top style', () => {
    expect(wrapper.attributes().style).toBe('margin-top: 33px;')
  })
})
