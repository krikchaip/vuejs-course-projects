import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Navigation from '@/components/Navigation'

/**
* These tests should better be done integrated (w/ App) instead.
*/

function createWrapper(options) {
  return shallowMount(Navigation, {
    stubs: { RouterLink: RouterLinkStub },
    mocks: { $store: { getters: {} } },
    ...options
  })
}

describe('has a link', () => {
  const links = createWrapper()
    .findAll(RouterLinkStub).wrappers
    .map(w => w.props())

  it('to root', () => {
    expect(links).toContainEqual(
      expect.objectContaining({ to: '/' })
    )
  })

  it('to /portfolio', () => {
    expect(links).toContainEqual(
      expect.objectContaining({ to: '/portfolio' })
    )
  })

  it('to /stocks', () => {
    expect(links).toContainEqual(
      expect.objectContaining({ to: '/stocks' })
    )
  })
})

describe('funds getter is set', () => {
  const $store = {
    getters: { funds: '100,000' }
  }

  it('should display correct funds', () => {
    const wrapper = createWrapper({ mocks: { $store } })
    const fundsTexts = wrapper.find('strong')

    expect(fundsTexts.html()).toMatchSnapshot()

    wrapper.vm.$store.getters.funds = '9,000'
    expect(fundsTexts.html()).toMatchSnapshot()
  })
})

describe('passing slot', () => {
  const TestSlotComponent = {
    name: 'TestSlotComponent',
    template: `<div>test-slot</div>`
  }

  it('should render default slot at the right place', () => {
    const wrapper = createWrapper({ slots: { default: TestSlotComponent } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
