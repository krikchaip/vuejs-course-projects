import store from '@/store'

function initialState() {
  return {
    funds: 0,
    stocks: [],
    stocksData: [
      { name: 'BMW', price: 100 },
      { name: 'Google', price: 200 }
    ]
  }
}

afterEach(() => {
  store.replaceState(initialState())
})

describe('funds getter', () => {
  describe('given state.funds is a number', () => {
    it('should return 3-digit thousands separated string', () => {
      store.replaceState({ funds: 1000 })
      expect(store.getters.funds).toBe('1,000')

      store.replaceState({ funds: 10000 })
      expect(store.getters.funds).toBe('10,000')

      store.replaceState({ funds: 999999 })
      expect(store.getters.funds).toBe('999,999')
    })
  })
})

describe('make-payment action', () => {
  it('should throw when passing negative amount', async () => {
    await expect(store.dispatch('make-payment', -1))
      .rejects.toBeDefined()
  })

  it('should withdraw funds by some amount', async () => {
    store.replaceState({ funds: 100 })
    await store.dispatch('make-payment', 100)

    expect(store.state.funds).toBe(0)
  })
})

describe('add-user-stock action', () => {
  describe('payload validation', () => {
    it('should reject when quantity < 1', async () => {
      expect.assertions(2)
      await expect(store.dispatch('add-user-stock', { quantity: 0 }))
        .rejects.toBeDefined()
      await expect(store.dispatch('add-user-stock', { quantity: -1 }))
        .rejects.toBeDefined()
    })
  })

  describe('adding new stock', () => {
    const orderPayload = {
      name: 'MBD',
      price: 30,
      quantity: 5
    }

    it('should exist in user portfolio', async () => {
      expect.assertions(1)

      await store.dispatch('add-user-stock', orderPayload)
      expect(store.state.stocks).toContainEqual(orderPayload)
    })
  })

  describe('buy more existing stock', () => {
    describe('given stock already exists in user portfolio', () => {
      const stock = {
        name: 'MBD',
        price: 30,
        quantity: 5
      }

      beforeEach(() => {
        store.replaceState({ stocks: [stock] })
      })

      it('should increment quantity instead of creating new one', () => {
        store.dispatch('add-user-stock', stock)
        expect(store.state.stocks[0]).toHaveProperty('quantity', 10)
      })
    })
  })
})

describe('sell-stock action', () => {
  beforeEach(() => {
    store.replaceState({
      funds: 0,
      stocks: [{ name: 'TEST', price: 50, quantity: 10 }]
    })
  })

  describe('sell all', () => {
    beforeEach(async () => {
      const sellAllPayload = { name: 'TEST', quantity: 10 }
      await store.dispatch('sell-stock', sellAllPayload)
    })

    it('should remove sold one from user portfolio', () => {
      expect(store.state.stocks).toHaveLength(0)
    })

    it('should add funds by sold amounts * price', () => {
      expect(store.state.funds).toBe(500)
    })
  })

  describe('sell some', () => {
    beforeEach(async () => {
      const sellSomePayload = { name: 'TEST', quantity: 1 }
      await store.dispatch('sell-stock', sellSomePayload)
    })

    it('quantity should decrease', () => {
      expect(store.state.stocks[0].quantity).toBe(9)
    })

    it('should add funds by sold amounts * price', () => {
      expect(store.state.funds).toBe(50)
    })
  })
})

describe('end-day action', () => {
  it('should change each stock data price', async () => {
    const oldPrices = store.state.stocksData.map(s => s.price)

    await store.dispatch('end-day')

    const newPrices = store.state.stocksData.map(s => s.price)
    expect(newPrices).toEqual(expect.not.arrayContaining(oldPrices))
  })

  describe('given user has bought a stock', () => {
    beforeEach(() => {
      store.replaceState({
        stocks: [{ name: 'BMW', price: 100, quantity: 1 }],
        stocksData: [{ name: 'BMW', price: 100 }]
      })

      jest.spyOn(Math, 'random')
      Math.random.mockReturnValue(1)
    })

    afterEach(() => {
      Math.random.mockRestore()
    })

    it('should also update user\'s stocks prices', async () => {
      // price should change to specific value everytime
      await store.dispatch('end-day')

      const { price } = store.state.stocks[0]
      const { price: newPrice } = store.state.stocksData[0]

      expect(price).toBe(newPrice)
    })
  })
})
