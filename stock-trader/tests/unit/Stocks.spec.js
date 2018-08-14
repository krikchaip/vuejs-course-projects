import { shallowMount } from '@vue/test-utils'
import Stocks from '@/views/Stocks'

describe('given stocks data prepared', () => {
  const stocksData = [
    { name: 'BMW', price: 100 },
    { name: 'Google', price: 200 },
    { name: 'Apple', price: 250 },
    { name: 'Twitter', price: 50 }
  ]
  const wrapper = shallowMount(Stocks, {
    mocks: {
      $store: { state: { stocksData } }
    }
  })

  it('each stock should receive its data', () => {
    const Stock = wrapper.findAll({ name: 'Stock' })
    const StockProps = Stock.wrappers.map(s => s.props())

    expect(StockProps).toMatchObject(stocksData)
  })
})
