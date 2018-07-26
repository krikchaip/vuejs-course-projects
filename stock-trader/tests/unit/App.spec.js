import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App'
import Router from '@/router'

const localVue = createLocalVue()
const router = Router

localVue.use(VueRouter)

/*
  Seems like you're testing App and Router (heavily on router)
  Which is unnecessary. App component should be stub out
  and test for only router instead.
*/

it('renders "Home" component on "/" path', () => {
  const wrapper = mount(App, {
    localVue,
    router,
    stubs: ['TheHeader']
  })

  wrapper.vm.$router.push('/')
  expect(wrapper.contains({ name: 'Home' })).toBeTruthy()
})

it('renders "Portfolio" component on "/portfolio" path', () => {
  const wrapper = mount(App, {
    localVue,
    router,
    stubs: ['TheHeader']
  })

  wrapper.vm.$router.push('/portfolio')
  expect(wrapper.contains({ name: 'Portfolio' })).toBeTruthy()
})

it('renders "Stocks" component on "/stocks" path', () => {
  const wrapper = mount(App, {
    localVue,
    router,
    stubs: ['TheHeader']
  })

  wrapper.vm.$router.push('/stocks')
  expect(wrapper.contains({ name: 'Stocks' })).toBeTruthy()
})
