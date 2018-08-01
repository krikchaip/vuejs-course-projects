import { shallowMount } from '@vue/test-utils'
import Stock from '@/components/Stock'

describe('Props', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Stock)
  })

  // ! pushing too hard. End up relying on implementation detail
  it('name as a String', () => {
    const { name: nameOptions } = wrapper.vm.$options.props
    expect(nameOptions.type).toBe(String)
  })

  // ! pushing too hard. End up relying on implementation detail
  it('price as a Number', () => {
    const { price: priceOptions } = wrapper.vm.$options.props
    expect(priceOptions.type).toBe(Number)
  })

  // * NOT BAD - but what if I don't use .card-header?
  it('displays name and price correctly', () => {
    wrapper.setProps({ name: 'BMW', price: 110 })
    expect(wrapper.find('.card-header').text()).toMatchSnapshot()
  })
})

// * NOT BAD - but relying on .card-body bootstrap4 class
describe('Stock Body', () => {
  it('should contain input number and buy button', () => {
    const Body = shallowMount(Stock).find('.card-body')
    const Quantity = Body.find('input[type="number"]')
    const BuyButton = Body.find('button')

    expect(Quantity.exists()).toBeTruthy()
    expect(BuyButton.exists()).toBeTruthy()
  })

  it('should match snapshot', () => {
    const Body = shallowMount(Stock).find('.card-body')
    expect(Body.html()).toMatchSnapshot()
  })
})
