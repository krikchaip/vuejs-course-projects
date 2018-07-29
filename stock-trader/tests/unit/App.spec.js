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
