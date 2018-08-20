import { shallowMount, RouterLinkStub, Wrapper } from '@vue/test-utils'
// @ts-ignore
import App from '@/App'

describe('Nav links state', () => {
  /**
   * @param {Wrapper} wrapper
   * @return {Array<*>}
   */
  function findAllLinksProps(wrapper) {
    return wrapper.findAll(RouterLinkStub).wrappers.map(w => w.props())
  }

  /** @type {Wrapper} */
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(App, {
      stubs: {
        'router-link': RouterLinkStub,
        'router-view': true
      },
      methods: { _created() {} },
      mocks: {
        $store: {
          getters: {
            isAuthenticated: null
          }
        }
      }
    })
  })

  it('show sign-up, sign-in button when not logged in', () => {
    wrapper.vm.$store.getters.isAuthenticated = false
    wrapper.vm.$forceUpdate()

    expect(findAllLinksProps(wrapper).map(w => w.to).sort())
      .toMatchObject(['/signup', '/signin'].sort())
  })

  it('show dashboard, logout button when logged in', () => {
    wrapper.vm.$store.getters.isAuthenticated = true
    wrapper.vm.$forceUpdate()

    expect(wrapper.find({ name: 'Navigation' }).html()).toMatchSnapshot()
  })
})
