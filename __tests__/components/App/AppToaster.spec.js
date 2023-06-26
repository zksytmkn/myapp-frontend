import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import Vuetify from 'vuetify'
import AppToaster from '@/components/App/AppToaster.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('AppToaster.vue', () => {
  let actions
  let mutations
  let store

  beforeEach(() => {
    actions = {
      getToast: jest.fn((context, payload) => {
        context.commit('setToast', payload)
      }),
    }
    mutations = {
      setToast: (state, payload) => {
        state.toast = payload
      },
    }
    store = new Store({
      state: { toast: { msg: null, timeout: 3000, color: 'success' } },
      actions,
      mutations
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
    expect(store.state.toast.msg).toBeNull()
  })
})
