import { shallowMount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppFooter, {
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
