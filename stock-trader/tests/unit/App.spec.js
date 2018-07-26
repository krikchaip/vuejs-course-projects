import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App'
import Router from '@/router'

const localVue = createLocalVue()
const router = Router

localVue.use(VueRouter)

it('renders "Home" component on "/" path', () => {
  const wrapper = mount(App, {
    localVue,
    router,
    stubs: ['TheHeader']
  })

  wrapper.vm.$router.push('/')
  expect(wrapper.contains({ name: 'Home' })).toBeTruthy()
})
