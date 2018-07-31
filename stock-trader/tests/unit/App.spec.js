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

describe('slots -> Navigation', () => {
  const wrapper = shallowMount(App, { stubs: ['RouterView'] })
  const Navigation = wrapper.find({ name: 'Navigation' })

  it('(default) End Day', () => {
    const ActionEndDay = Navigation.find({ name: 'ActionEndDay' })
    expect(ActionEndDay.exists()).toBeTruthy()
  })

  it('(default) Save & Load', () => {
    const ActionSaveLoad = Navigation.find({ name: 'ActionSaveLoad' })
    expect(ActionSaveLoad.exists()).toBeTruthy()
  })
})
