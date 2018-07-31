import store from '@/store'

const stateSpec = {
  funds: 10000
}

afterEach(() => {
  store.replaceState(stateSpec)
})

describe('State', () => {
  it('contains "funds" with 10000 as default', () => {
    expect(store.state.funds).toBeDefined()
    expect(store.state.funds).toBe(stateSpec.funds)
  })
})

describe('Getters', () => {
  describe('funds', () => {
    it('should throw an error when state.funds is not a Number', () => {
      expect(() => {
        store.replaceState({ funds: '13esa' })
        store.getters.funds
      }).toThrow()
      expect(() => {
        store.replaceState({ funds: 1000 })
        store.getters.funds
      }).not.toThrow()
    })

    it('should return 3 digits thousands separator string', () => {
      store.replaceState({ funds: 1000 })
      expect(store.getters.funds).toBe('1,000')

      store.replaceState({ funds: 10000 })
      expect(store.getters.funds).toBe('10,000')

      store.replaceState({ funds: 999999 })
      expect(store.getters.funds).toBe('999,999')
    })
  })
})
