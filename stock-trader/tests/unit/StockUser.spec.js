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
  let wrapper,
      dispatch,
      quantityField,
      sellButton

  beforeEach(() => {
    dispatch = jest.fn(() => Promise.resolve())
    wrapper = shallowMount(StockUser, {
      mocks: { $store: { dispatch } }
    })

    quantityField = wrapper.find('input[type="number"]')
    sellButton = wrapper.find('button')

    wrapper.setProps({ name: 'TEST', price: 50, quantity: 10 })
  })

  describe('quantity field value', () => {
    describe('empty', () => {
      beforeEach(() => {
        quantityField.setValue(null)
      })

      it('sell button should be disabled', () => {
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
        expect(sellButton.element.disabled).toBeTruthy()
      })

      it('quantity input box should warn', () => {
        expect(quantityField.classes()).toContain('is-invalid')
      })
    })
  })

  describe('when sell button clicked', () => {
    beforeEach(async () => {
      quantityField.setValue(1)
      sellButton.trigger('click')

      await wrapper.vm.$forceUpdate()
    })

    it('should dispatch sell-stock with name and quantity', () => {
      expect(dispatch).toBeCalledWith(
        'sell-stock',
        { name: 'TEST', quantity: 1 }
      )
    })

    it('quantity field should reset', () => {
      expect(quantityField.element.value).toBeFalsy()
    })
  })
})
