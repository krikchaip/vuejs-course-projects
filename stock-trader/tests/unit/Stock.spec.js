import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Stock from '@/components/Stock'

describe('Props', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapperWithVuex()
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
    const Body = createWrapperWithVuex().find('.card-body')
    const Quantity = Body.find('input[type="number"]')
    const BuyButton = Body.find('button')

    expect(Quantity.exists()).toBeTruthy()
    expect(BuyButton.exists()).toBeTruthy()
  })

  it('should match snapshot', () => {
    const Body = createWrapperWithVuex().find('.card-body')
    expect(Body.html()).toMatchSnapshot()
  })
})

describe('Data', () => {
  describe('quantity', () => {
    it('should react when number input changes value', () => {
      const wrapper = createWrapperWithVuex()
      const inputNumber = wrapper.find('input[type="number"]')

      inputNumber.element.value = 10
      inputNumber.trigger('input')

      expect(wrapper.vm.quantity).toBe(10)
    })
  })
})

describe('Buy Stock', () => {
  it('should commit to proper mutations', () => {
    const WITHDRAW_FUNDS = jest.fn()
    const ADD_STOCK = jest.fn()

    const store = { mutations: { WITHDRAW_FUNDS, ADD_STOCK } }
    const wrapper = createWrapperWithVuex({ store })

    const order = { name: 'FOREX', price: 100, quantity: 5 }
    wrapper.vm.buyStock(order)

    expect(WITHDRAW_FUNDS).toBeCalledWith(expect.anything(), 500)
    expect(ADD_STOCK).toBeCalledWith(expect.anything(), order)
  })

  it('should reset quantity when purchase completed', () => {
    const order = { name: 'FOREX', price: 100, quantity: 5 }
    const wrapper = shallowMount(Stock, {
      mocks: {
        $store: { commit: () => {} }
      }
    })
    const numberInput = wrapper.find('input[type="number"]')

    wrapper.vm.buyStock(order)
    expect(numberInput.element.value).toBeFalsy()
  })

  describe('Button', () => {
    it('should initially be disabled', () => {
      const wrapper = createWrapperWithVuex()
      const button = wrapper.find('button')

      expect(button.element.disabled).toBeTruthy()
    })

    it('should clickable when everything is fine', () => {
      const store = { state: { funds: 10000 } }
      const wrapper = createWrapperWithVuex({ store })
      const button = wrapper.find('button')

      wrapper.setProps({ name: 'WIN', price: 100 })
      wrapper.setData({ quantity: 10 })
      expect(button.element.disabled).toBeFalsy()
    })

    it('should call the method with order object when clicked', () => {
      const buyStock = jest.fn()
      const wrapper = createWrapperWithVuex({
        store: { state: { funds: 10000 } },
        propsData: { name: 'WIN', price: 100 },
        data: () => ({ quantity: 1 }),
        methods: { buyStock }
      })
      const button = wrapper.find('button')

      button.trigger('click')
      expect(buyStock).toBeCalledWith(expect.objectContaining({
        name: 'WIN',
        price: 100,
        quantity: 1
      }))
    })

    it('should be disabled when not enough funds', () => {
      const store = { state: { funds: 500 } }
      const wrapper = createWrapperWithVuex({ store })
      const button = wrapper.find('button')

      wrapper.setProps({ name: 'VUE', price: 1000 })
      wrapper.setData({ quantity: 1 })
      expect(button.element.disabled).toBeTruthy()
    })

    it('should be disabled if quantity is less than 1', () => {
      const wrapper = createWrapperWithVuex()
      const button = wrapper.find('button')

      wrapper.setData({ quantity: 0 })
      expect(button.element.disabled).toBeTruthy()

      wrapper.setData({ quantity: -1 })
      expect(button.element.disabled).toBeTruthy()
    })
  })

  describe('Number Input', () => {
    it('should not warn when everything is legit', () => {
      const store = { state: { funds: 10000 } }
      const wrapper = createWrapperWithVuex({
        store,
        propsData: { name: 'VUE', price: 100 },
        data: () => ({ quantity: 5 })
      })
      const numberInput = wrapper.find('input[type="number"]')

      expect(numberInput.classes()).not.toContain('is-invalid')
    })

    it('should warn when not enough funds', () => {
      const wrapper = createWrapperWithVuex({
        propsData: { name: 'VUE', price: 99999 },
        data: () => ({ quantity: 1 })
      })
      const numberInput = wrapper.find('input[type="number"]')

      expect(numberInput.classes()).toContain('is-invalid')
    })

    it('should warn if quantity is less than 1', () => {
      const wrapper = createWrapperWithVuex({
        data: () => ({ quantity: 0 })
      })
      const numberInput = wrapper.find('input[type="number"]')

      expect(numberInput.classes()).toContain('is-invalid')
    })
  })
})

function createWrapperWithVuex(mountOptions = {
  store: {
    state: { funds: 0 }
  }
}) {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const store = new Vuex.Store(mountOptions.store)

  return shallowMount(Stock, {
    ...mountOptions,
    localVue,
    store
  })
}
