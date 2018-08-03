import store from '@/store'

const stateSpec = {
  funds: 10000,
  port: []
}

afterEach(() => {
  store.replaceState(stateSpec)
})

describe('State', () => {
  // * GOOD - just remove existence checking
  it('contains "funds" with 10000 as default', () => {
    expect(store.state.funds).toBeDefined()
    expect(store.state.funds).toBe(stateSpec.funds)
  })

  it('should contain an empty port', () => {
    expect(store.state.port).toEqual([])
  })
})

describe('Getters', () => {
  describe('funds', () => {
    // * GOOD - but you don't have to retest the real expected result
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

    // * GOOD
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

describe('Mutations', () => {
  describe('WITHDRAW_FUNDS', () => {
    it('should subtract funds with an amount', () => {
      const funds = 1000
      const amount = 500

      store.replaceState({ funds })
      store.commit('WITHDRAW_FUNDS', amount)

      expect(store.state.funds).toBe(500)
    })
  })

  describe('ADD_STOCK', () => {
    it('should add stock to user port', () => {
      const boughtStock = { name: 'BUE', price: 30, quantity: 3 }
      const currentPort = [
        { name: 'ZZB', price: 90, quantity: 1 }
      ]

      store.replaceState({ port: currentPort })
      store.commit('ADD_STOCK', boughtStock)

      expect(store.state.port).toContainEqual(boughtStock)
    })

    it('should increment quantity instead if stock already existed', () => {
      const currentPort = [
        { name: 'ZZB', price: 90, quantity: 1 }
      ]
      const boughtStock = currentPort[0]

      store.replaceState({ port: currentPort })
      store.commit('ADD_STOCK', boughtStock)

      expect(store.state.port).toContainEqual({
        ...boughtStock,
        quantity: 2
      })
    })
  })
})
