import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Navigation from '@/components/Navigation'

describe('RouterLink', () => {
  const wrapper = shallowMount(Navigation, {
    stubs: { RouterLink: RouterLinkStub }
  })
  const links = wrapper.findAll(RouterLinkStub)

  it('has only one link to "/"', () => {
    const toRoot = links.filter(w => w.props().to === '/')
    expect(toRoot.length).toBe(1)
  })

  it('has only one link to "/portfolio with custom active class"', () => {
    const toPortfolio = links.filter(w => w.props().to === '/portfolio')
    expect(toPortfolio.length).toBe(1)
    expect(toPortfolio.at(0).props().activeClass).toBeTruthy()
  })

  it('has only one link to "/stocks with custom active class"', () => {
    const toStocks = links.filter(w => w.props().to === '/stocks')
    expect(toStocks.length).toBe(1)
    expect(toStocks.at(0).props().activeClass).toBeTruthy()
  })
})

describe('Funds', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Navigation, {
      stubs: ['router-link']
    })
  })

  it('recieves via "funds" prop', () => {
    wrapper.setProps({ funds: 100 })
    expect(wrapper.props().funds).toBe(100)
  })

  it('should be a number, default is 0', () => {
    const spec = { type: Number, default: 0 }
    expect(wrapper.vm.$options.props.funds).toEqual(spec)
  })

  it('displays correctly', () => {
    wrapper.setProps({ funds: 10000 })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Actions', () => {
  it('uses default slot', () => {
    const Action = { name: 'Action', template: `<div/>` }
    const wrapper = shallowMount(Navigation, {
      stubs: ['router-link'],
      slots: { default: Action }
    })

    expect(wrapper.find(Action).exists()).toBeTruthy()
  })
})
