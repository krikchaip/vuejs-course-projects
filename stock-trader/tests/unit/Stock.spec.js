import { shallowMount } from '@vue/test-utils'
import Stock from '@/components/Stock'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Stock)
})

it('has a "price" property', () => {
  expect(wrapper.vm.$options.props.price).toBeDefined()
})

it('renders price within "price" section', () => {
  const section = wrapper.find('[data-v-section="price"]')

  wrapper.setProps({ price: 50 })
  expect(section.text()).toMatch('50')

  wrapper.setProps({ price: 100 })
  expect(section.text()).toMatch('100')
})

it('recieves additional custom css classes for header', () => {
  const header = wrapper.find('header')
  const headerClass = ['test-class1', 'test-class2']

  expect(wrapper.props()).toHaveProperty('headerClass')

  wrapper.setProps({ headerClass })
  expect(header.classes()).toEqual(expect.arrayContaining(headerClass))
})

describe('action button', () => {
  it('has "btn btn-sm" as base classes', () => {
    const baseClasses = ['btn', 'btn-sm'].map(cls => '.' + cls)
    const actionButton = wrapper.find('button' + baseClasses.join())

    expect(actionButton.exists()).toBeTruthy()
  })

  it('recieves additional custom css classes via actionClass prop', () => {
    const actionButton = wrapper.find('button')
    const actionClass = 'btn-success'

    expect(wrapper.props()).toHaveProperty('actionClass')

    wrapper.setProps({ actionClass })
    expect(actionButton.classes()).toContain('btn-success')
  })

  it('behaves what "action" prop does when clicked', () => {
    wrapper = shallowMount(Stock, {
      propsData: { action: jest.fn() }
    })

    expect(wrapper.props()).toHaveProperty('action')

    const actionButton = wrapper.find('button')
    actionButton.trigger('click')
    expect(wrapper.vm.action).toBeCalled()
  })
})
