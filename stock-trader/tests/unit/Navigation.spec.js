import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Navigation from '@/components/Navigation'

let wrapper

// ! you put everything in one place
beforeEach(() => {
  const Action = { name: 'Action', template: `<div/>` }
  const $store = { getters: { funds: '100,000' } }

  wrapper = shallowMount(Navigation, {
    stubs: { RouterLink: RouterLinkStub },
    slots: { default: Action },
    mocks: { $store }
  })
})

// TODO: cut the "has only" part and try incorperate with snapshot test?
describe('RouterLink', () => {
  let links

  beforeEach(() => {
    links = wrapper.findAll(RouterLinkStub)
  })

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

// * NOT BAD - what if I don't like <strong> tag?
describe('Funds', () => {
  it('display "funds" from vuex getter', () => {
    expect(wrapper.find('strong').text()).toBe('Funds: $100,000')

    wrapper.vm.$store.getters.funds = '99,999'
    expect(wrapper.find('strong').text()).toBe('Funds: $99,999')
  })
})

// * NOT BAD - maybe should try snapshot?
describe('Actions', () => {
  it('uses default slot to display', () => {
    expect(wrapper.find({ name: 'Action' }).exists()).toBeTruthy()
  })
})
