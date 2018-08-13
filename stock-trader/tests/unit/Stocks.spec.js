import { shallowMount } from '@vue/test-utils'
import Stocks from '@/views/Stocks'

describe('fetchStocksData', () => {
  it('should resolve array of objects with name and price', async () => {
    const wrapper = shallowMount(Stocks)
    const data = await wrapper.vm.fetchStocksData()

    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        price: expect.any(Number)
      })
    ]))
  })
})

describe('given stocksData initially unset', () => {
  const stocksData = null
  const wrapper = shallowMount(Stocks, {
    data: () => ({ stocksData })
  })

  it('should initialize when mounted', () => {
    expect(wrapper.vm.stocksData).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        price: expect.any(Number)
      })
    ]))
  })
})

describe('given stocks data prepared', () => {
  const stocksData = [
    { name: 'BMW', price: 100 },
    { name: 'Google', price: 200 },
    { name: 'Apple', price: 250 },
    { name: 'Twitter', price: 50 }
  ]
  const wrapper = shallowMount(Stocks)

  wrapper.setData({ stocksData })

  it('should render all corresponding data', () => {
    const Stock = wrapper.findAll({ name: 'Stock' })
    const StockProps = Stock.wrappers.map(s => s.props())

    expect(StockProps).toMatchObject(stocksData)
  })
})
