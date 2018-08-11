import { shallowMount } from '@vue/test-utils'
import ActionSaveLoad from '@/components/ActionSaveLoad'

describe('menu is initially hidden', () => {
  const data = () => ({ menuShow: false })

  it('should toggle menu visibility when clicked', () => {
    const wrapper = shallowMount(ActionSaveLoad, { data })

    wrapper.trigger('click')
    expect(wrapper.vm.menuShow).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.trigger('click')
    expect(wrapper.vm.menuShow).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
