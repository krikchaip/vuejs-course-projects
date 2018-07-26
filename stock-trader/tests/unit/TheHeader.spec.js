import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TheHeader from '@/components/TheHeader'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(VueRouter)

describe('Brand button', () => {
  let wrapper, brandButton

  beforeEach(() => {
    wrapper = mount(TheHeader, { localVue, router })
    brandButton = wrapper.find('a.brand-button')
  })

  it('exists', () => {
    expect(brandButton.exists()).toBeTruthy()
  })

  it('navigates $routes to "/" when clicked', () => {
    brandButton.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/')
  })
})

describe('Portfolio button', () => {
  let wrapper, brandButton

  beforeEach(() => {
    wrapper = mount(TheHeader, { localVue, router })
    brandButton = wrapper.find('a.portfolio-button')
  })

  it('exists', () => {
    expect(brandButton.exists()).toBeTruthy()
  })

  it('navigates $routes to "/portfolio" when clicked', () => {
    brandButton.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/portfolio')
  })

  it('uses "active" css class when active', () => {
    wrapper.vm.$router.push('/portfolio');
    expect(brandButton.props().activeClass).toBe('active')
  })
})

describe('Stocks button', () => {
  let wrapper, brandButton

  beforeEach(() => {
    wrapper = mount(TheHeader, { localVue, router })
    brandButton = wrapper.find('a.stocks-button')
  })

  it('exists', () => {
    expect(brandButton.exists()).toBeTruthy()
  })

  it('navigates $routes to "/stocks" when clicked', () => {
    brandButton.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/stocks')
  })

  it('uses "active" css class when active', () => {
    wrapper.vm.$router.push('/stocks');
    expect(brandButton.props().activeClass).toBe('active')
  })
})

describe('Save & Load button', () => {
  it('toggles dropdown menu when clicked', () => {
    const wrapper = shallowMount(TheHeader, {
      stubs: ['router-link']
    })
    const saveLoad = wrapper.find('.dropdown')
    const dropdownMenu = saveLoad.find('.dropdown-menu')

    saveLoad.trigger('click')
    expect(dropdownMenu.classes()).toContain('show')

    saveLoad.trigger('click')
    expect(dropdownMenu.classes()).not.toContain('show')
  })
})
