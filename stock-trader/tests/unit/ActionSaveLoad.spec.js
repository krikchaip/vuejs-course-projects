import { shallowMount } from '@vue/test-utils'
import axios from 'axios'

import ActionSaveLoad from '@/components/ActionSaveLoad'

jest.mock('axios')

describe('menu is initially hidden', () => {
  const data = () => ({ menuShow: false })

  it('should toggle menu visibility when clicked', () => {
    const wrapper = shallowMount(ActionSaveLoad, { data })

    wrapper.trigger('click')
    expect(wrapper.vm.menuShow).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.trigger('click')
    expect(wrapper.vm.menuShow).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Save', () => {
  describe('given current app state', () => {
    const state = {
      funds: 1000,
      stocks: [{ name: 'BMW', price: 100, quantity: 3 }],
      stocksData: [
        { name: 'BMW', price: 100 },
        { name: 'Google', price: 200 }
      ]
    }

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(ActionSaveLoad, {
        mocks: { $store: { state } }
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('make put request to data.json with current state', async () => {
      await wrapper.vm.save()
      expect(axios.put).toBeCalledWith('data.json', state)
    })
  })
})

describe('Load', () => {
  describe('given data on the server', () => {
    const data = {
      funds: 1000,
      stocks: [{ name: 'BMW', price: 100, quantity: 3 }],
      stocksData: [
        { name: 'BMW', price: 100 },
        { name: 'Google', price: 200 }
      ]
    }

    let wrapper, dispatch

    beforeEach(() => {
      dispatch = jest.fn()
      wrapper = shallowMount(ActionSaveLoad, {
        mocks: { $store: { dispatch } }
      })

      axios.get.mockImplementation(() => Promise.resolve({ data }))
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('make get request to data.json', async () => {
      await wrapper.vm.load()
      expect(axios.get).toBeCalledWith('data.json')
    })

    it('should dispatch restore-data with the data', async () => {
      await wrapper.vm.load()
      expect(dispatch).toBeCalledWith('restore-data', data)
    })
  })
})
