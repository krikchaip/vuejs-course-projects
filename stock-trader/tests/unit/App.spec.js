import { shallowMount } from '@vue/test-utils'
import App from '@/App'

describe('User Interface', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App, {
      stubs: ['RouterView']
    })
  })

  it('consists of RouterView', () => {
    const RouterView = wrapper.find({ name: 'RouterView' })
    expect(RouterView.exists()).toBeTruthy()
  })

  it('consists of Navigation header', () => {
    const Navigation = wrapper.find({ name: 'Navigation' })
    expect(Navigation.exists()).toBeTruthy()
  })
})

describe('Actions', () => {
  const wrapper = shallowMount(App, { stubs: ['RouterView'] })
  const Navigation = wrapper.find({ name: 'Navigation' })

  describe('End Day', () => {
    it('passes to Navigation as a slot', () => {
      const ActionEndDay = Navigation.find({ name: 'ActionEndDay' })
      expect(ActionEndDay.exists()).toBeTruthy()
    })
  })

  describe('Save & Load', () => {
    it('passes to Navigation as a slot', () => {
      const ActionSaveLoad = Navigation.find({ name: 'ActionSaveLoad' })
      expect(ActionSaveLoad.exists()).toBeTruthy()
    })
  })
})
