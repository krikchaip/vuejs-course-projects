import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('funds getter is set', () => {
  const $store = {
    getters: { funds: '100,000' }
  }

  it('should display correct funds with messages', () => {
    const wrapper = shallowMount(Home, { mocks: { $store } })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$store.getters.funds = '9,000'
    expect(wrapper.html()).toMatchSnapshot()
  })
})
