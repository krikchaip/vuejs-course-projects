import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import router from '@/router'

const localVue = createLocalVue()
const RouterView = { template: `<router-view/>` }

localVue.use(VueRouter)

describe('RouterView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RouterView, { localVue, router })
  })

  it('renders Home component at "/"', () => {
    wrapper.vm.$router.push('/')
    expect(wrapper.find({ name: 'Home' }).exists()).toBeTruthy()
  })

  it('renders Portfolio component at "/portfolio"', () => {
    wrapper.vm.$router.push('/portfolio')
    expect(wrapper.find({ name: 'Portfolio' }).exists()).toBeTruthy()
  })

  it('renders Stocks component at "/stocks"', () => {
    wrapper.vm.$router.push('/stocks')
    expect(wrapper.find({ name: 'Stocks' }).exists()).toBeTruthy()
  })
})
