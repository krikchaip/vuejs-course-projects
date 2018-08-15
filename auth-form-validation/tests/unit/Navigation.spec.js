import { shallowMount } from '@vue/test-utils'
import Navigation from '@/components/Navigation'

describe('default slot', () => {
  describe('links', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(Navigation, {
        slots: {
          default: ['<link/>', '<link/>', '<link/>']
        }
      })
    })

    it('should render inside their group', () => {
      const group = wrapper.find('.navigation__group')
      expect(group.html()).toMatchSnapshot()
    })
  })
})
