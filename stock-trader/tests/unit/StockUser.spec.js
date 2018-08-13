import { shallowMount } from '@vue/test-utils'
import StockUser from '@/components/StockUser'

describe('User Interface', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(StockUser)
  })

  it('should have quantity input', () => {
    expect(wrapper.find('input[type="number"]').exists()).toBeTruthy()
  })

  it('should have sell button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  describe('given data containing name, price and quantity', () => {
    const data = {
      name: 'BMD',
      price: 50,
      quantity: 10
    }

    it('should display on top when passing as prop', () => {
      wrapper.setProps(data)

      const top = wrapper.find('.card-header')
      expect(top.html()).toMatchSnapshot()
    })
  })
})

describe('Sell Stock', () => {
  describe('quantity field value', () => {
    let wrapper, quantityField

    beforeEach(() => {
      wrapper = shallowMount(StockUser)
      quantityField = wrapper.find('input[type="number"]')

      wrapper.setProps({ name: 'TEST', price: 50, quantity: 10 })
    })

    describe('empty', () => {
      beforeEach(() => {
        quantityField.setValue(null)
      })

      it('sell button should be disabled', () => {
        const sellButton = wrapper.find('button')
        expect(sellButton.element.disabled).toBeTruthy()
      })

      it('quantity input box should not warn', () => {
        expect(quantityField.classes()).not.toContain('is-invalid')
      })
    })

    describe('zero', () => {
      beforeEach(() => {
        quantityField.setValue(0)
      })

      it('sell button should be disabled', () => {
        const sellButton = wrapper.find('button')
        expect(sellButton.element.disabled).toBeTruthy()
      })

      it('quantity input box should warn', () => {
        expect(quantityField.classes()).toContain('is-invalid')
      })
    })

    describe('negative', () => {
      beforeEach(() => {
        quantityField.setValue(-1)
      })

      it('sell button should be disabled', () => {
        const sellButton = wrapper.find('button')
        expect(sellButton.element.disabled).toBeTruthy()
      })

      it('quantity input box should warn', () => {
        expect(quantityField.classes()).toContain('is-invalid')
      })
    })

    describe('within the amount', () => {
      beforeEach(() => {
        quantityField.setValue(10)
      })

      it('sell button should be clickable', () => {
        const sellButton = wrapper.find('button')
        expect(sellButton.element.disabled).toBeFalsy()
      })

      it('quantity input box should not warn', () => {
        expect(quantityField.classes()).not.toContain('is-invalid')
      })
    })

    describe('more than the amount', () => {
      beforeEach(() => {
        quantityField.setValue(99)
      })

      it('sell button should be disable', () => {
        const sellButton = wrapper.find('button')
        expect(sellButton.element.disabled).toBeTruthy()
      })

      it('quantity input box should warn', () => {
        expect(quantityField.classes()).toContain('is-invalid')
      })
    })
  })
})
