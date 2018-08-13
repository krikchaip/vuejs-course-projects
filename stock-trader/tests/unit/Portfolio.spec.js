import { shallowMount } from '@vue/test-utils'
import Portfolio from '@/views/Portfolio'

describe('given some stocks in user portfolio', () => {
  const BMX = { name: 'BMX', price: 100, quantity: 3 }
  const $store = { state: { stocks: [BMX] } }

  const wrapper = shallowMount(Portfolio, {
    mocks: { $store }
  })

  it('should render user stocks', () => {
    const StockUser = wrapper.findAll({ name: 'StockUser' })
    expect(StockUser.length).toBe(wrapper.vm.$store.state.stocks.length)
  })

  it('each user stock should receive its data', () => {
    const StockUserProps =
      wrapper.findAll({ name: 'StockUser' }).wrappers
      .map(stockUser => stockUser.props())

    expect(StockUserProps).toMatchObject([BMX])
  })
})
