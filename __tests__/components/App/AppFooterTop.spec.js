import { shallowMount } from '@vue/test-utils'
import AppFooterTop from '@/components/AppFooterTop.vue'

describe('AppFooterTop.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppFooterTop)
  })

  it('sets the correct height', () => {
    expect(wrapper.vm.height).toBe(73)
  })

  it('sets the correct height style', () => {
    expect(wrapper.attributes().style).toContain('height: 73px;')
  })

  it('renders the correct links', () => {
    const links = wrapper.findAll('nuxt-link-stub')

    expect(links.length).toBe(3)
    expect(links.at(0).attributes().to).toBe('/contact')
    expect(links.at(0).text()).toBe('お問い合わせ')

    expect(links.at(1).attributes().to).toBe('/tos')
    expect(links.at(1).text()).toBe('利用規約')

    expect(links.at(2).attributes().to).toBe('/policy')
    expect(links.at(2).text()).toBe('プライバシーポリシー')
  })
})
