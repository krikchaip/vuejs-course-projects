import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

// * NOT BAD - what happen when you don't put funds in <strong> tag?
it('display funds from vuex getter', () => {
  const getters = { funds: '100,000' }
  const wrapper = shallowMount(Home, {
    mocks: { $store: { getters } }
  })

  expect(wrapper.find('strong').text()).toBe('Your Funds: $100,000')

  getters.funds = '99,999'
  wrapper.vm.$forceUpdate()
  expect(wrapper.find('strong').text()).toBe('Your Funds: $99,999')
})
