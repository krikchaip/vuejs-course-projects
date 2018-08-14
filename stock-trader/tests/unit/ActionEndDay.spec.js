import { shallowMount } from '@vue/test-utils'
import ActionEndDay from '@/components/ActionEndDay'

it('should dispatch end-day when clicked', () => {
  const dispatch = jest.fn()
  const wrapper = shallowMount(ActionEndDay, {
    mocks: { $store: { dispatch } }
  })

  wrapper.trigger('click')

  expect(dispatch).toBeCalledWith('end-day')
})
