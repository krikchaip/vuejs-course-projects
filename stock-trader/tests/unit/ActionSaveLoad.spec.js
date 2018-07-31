import { shallowMount } from '@vue/test-utils'
import ActionSaveLoad from '@/components/ActionSaveLoad'

describe('Bootstrap4 specific', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ActionSaveLoad)
  })

  it('should be a dropdown', () => {
    const toggler = wrapper.find('.dropdown-toggle')
    const menu = wrapper.find('.dropdown-menu')

    expect(wrapper.classes()).toContain('dropdown')
    expect(toggler.exists()).toBeTruthy()
    expect(menu.exists()).toBeTruthy()
  })

  it('toggles visibility using "show" class when clicked', () => {
    const menu = wrapper.find('.dropdown-menu')

    wrapper.trigger('click')
    expect(menu.classes()).toContain('show')

    wrapper.trigger('click')
    expect(menu.classes()).not.toContain('show')
  })
})