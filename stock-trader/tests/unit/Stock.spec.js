import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Stock from '@/components/Stock'

const localVue = createLocalVue()
localVue.use(Vuex)

function createWrapper(options = {}) {
  return shallowMount(Stock, {
    localVue,
    store: new Vuex.Store({
      state    : options.state     || {},
      getters  : options.getters   || {},
      mutations: options.mutations || {},
      actions  : options.actions   || {}
    }),
    ...options
  })
}

describe('given stock data containing name and price.', () => {
  const stockData = {
    name: 'JWX',
    price: 15
  }

  it('should display them on the top when passing as prop', () => {
    const wrapper = createWrapper({ propsData: stockData })
    const top = wrapper.find('.card-header')

    expect(top.html()).toMatchSnapshot()
  })
})

describe('Buy Stock', () => {
  function targetWrapper(wrapper) {
    return {
      numberInput: wrapper.find('input[type="number"]'),
      buyButton: wrapper.find('button')
    }
  }

  describe('purchase successful', () => {
    const funds = 1000
    const stockData = { name: 'BMX', price: 50 }
    const orderQuantity = 10

    let wrapper, addUserStock

    beforeEach(() => {
      addUserStock = jest.fn(() => Promise.resolve())
      wrapper = createWrapper({
        data: () => ({ quantity: orderQuantity }),
        propsData: stockData,
        state: { funds },
        actions: { 'add-user-stock': addUserStock }
      })
    })

    it('buy button should be clickable', () => {
      const { buyButton } = targetWrapper(wrapper)
      expect(buyButton.element.disabled).toBeFalsy()
    })

    it('quantity field should not warn', () => {
      const { numberInput } = targetWrapper(wrapper)
      expect(numberInput.classes()).not.toContain('is-invalid')
    })

    it('should dispatch add-user-stock with order payload', () => {
      const order = { ...stockData, quantity: orderQuantity }
      const { buyButton } = targetWrapper(wrapper)

      buyButton.trigger('click')
      expect(addUserStock.mock.calls[0]).toContainEqual(order)
    })

    it('should reset quantity field after completed', async () => {
      const { numberInput, buyButton } = targetWrapper(wrapper)

      buyButton.trigger('click')
      await wrapper.vm.$forceUpdate()

      expect(numberInput.element.value).toBeFalsy()
    })
  })

  describe('buy button disabled', () => {
    it('given quantity field is blank', () => {
      const wrapper = createWrapper()
      const { numberInput, buyButton } = targetWrapper(wrapper)

      numberInput.element.value = null
      numberInput.trigger('input')

      expect(buyButton.element.disabled).toBeTruthy()
    })

    it('given quantity is less than 1', () => {
      const wrapper = createWrapper()
      const { numberInput, buyButton } = targetWrapper(wrapper)

      numberInput.element.value = 0
      numberInput.trigger('input')
      expect(buyButton.element.disabled).toBeTruthy()

      numberInput.element.value = -1
      numberInput.trigger('input')
      expect(buyButton.element.disabled).toBeTruthy()
    })

    it('given not enough funds', () => {
      const funds = 10
      const stockData = { name: 'HAE', price: 999 }
      const quantity = 1

      const wrapper = createWrapper({
        state: { funds },
        propsData: stockData,
        data: () => ({ quantity })
      })

      const { buyButton } = targetWrapper(wrapper)
      expect(buyButton.element.disabled).toBeTruthy()
    })
  })

  describe('quantity field warning', () => {
    it('should not warn if blank', () => {
      const wrapper = createWrapper()
      const { numberInput } = targetWrapper(wrapper)

      numberInput.element.value = null
      numberInput.trigger('input')

      expect(numberInput.classes()).not.toContain('is-invalid')
    })

    it('should warn if less than 1', () => {
      const wrapper = createWrapper()
      const { numberInput } = targetWrapper(wrapper)

      numberInput.element.value = 0
      numberInput.trigger('input')
      expect(numberInput.classes()).toContain('is-invalid')

      numberInput.element.value = -1
      numberInput.trigger('input')
      expect(numberInput.classes()).toContain('is-invalid')
    })

    it('should warn if not enough funds', () => {
      const funds = 10
      const stockData = { name: 'HAE', price: 999 }
      const quantity = 1

      const wrapper = createWrapper({
        state: { funds },
        propsData: stockData,
        data: () => ({ quantity })
      })

      const { numberInput } = targetWrapper(wrapper)
      expect(numberInput.classes()).toContain('is-invalid')
    })
  })
})
