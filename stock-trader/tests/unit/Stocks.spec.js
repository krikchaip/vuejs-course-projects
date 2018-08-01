import { shallowMount } from '@vue/test-utils'
import Stocks from '@/views/Stocks'

describe('getStocksData', () => {
  // * NOT BAD - but testing for returned results also, concluded a function
  it('should be a method', () => {
    const wrapper = shallowMount(Stocks)
    expect(wrapper.vm.getStocksData).toBeInstanceOf(Function)
  })

  // * NOT BAD - but relying on implementation
  it('return array of objects with name and price', () => {
    const wrapper = shallowMount(Stocks)
    const StocksData =
      { name: expect.any(String), price: expect.any(Number) }

    expect(wrapper.vm.getStocksData())
      .toEqual(expect.arrayContaining([
        expect.objectContaining(StocksData)
      ]))
  })

  // ! "data" depends on other tests
  it('renders Stock as many as the data', () => {
    const wrapper = shallowMount(Stocks)
    const Stock = wrapper.findAll({ name: 'Stock' })
    const data = wrapper.vm.getStocksData()

    expect(Stock.length).toBe(data.length)
  })
})

// * NOT BAD - you shouldn't care what to pass. just expect the result
describe('Stock', () => {
  it('passes name and price from data as props', () => {
    const Stock = shallowMount(Stocks).find({ name: 'Stock' })
    expect(Stock.props().name).toBeDefined()
    expect(Stock.props().price).toBeDefined()
  })
})
