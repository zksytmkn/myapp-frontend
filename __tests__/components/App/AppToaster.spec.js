import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Store } from 'vuex'
import AppToaster from '@/components/AppToaster.vue'

const localVue = createLocalVue()
localVue.use(Store)

describe('AppToaster.vue', () => {
  let store

  beforeEach(() => {
    store = new Store({
      state: { toast: { msg: null, timeout: 3000, color: 'success' } },
      actions: { getToast: jest.fn() },
    })
  })

  it('renders v-snackbar with the correct message', () => {
    store.state.toast.msg = 'Test message'
    const wrapper = shallowMount(AppToaster, { store, localVue })
    expect(wrapper.find('v-snackbar-stub').text()).toContain('Test message')
  })

  it('setSnackbar getter returns true when toast.msg exists', () => {
    store.state.toast.msg = 'Test message'
    const wrapper = shallowMount(AppToaster, { store, localVue })
    expect(wrapper.vm.setSnackbar).toBe(true)
  })

  it('setSnackbar getter returns false when toast.msg does not exist', () => {
    store.state.toast.msg = null
    const wrapper = shallowMount(AppToaster, { store, localVue })
    expect(wrapper.vm.setSnackbar).toBe(false)
  })

  it('resetToast method resets toast.msg to null', () => {
    const wrapper = shallowMount(AppToaster, { store, localVue })
    wrapper.vm.resetToast()
    expect(store.actions.getToast).toHaveBeenCalledWith(expect.anything(), { msg: null })
  })
})
