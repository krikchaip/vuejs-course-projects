import store, { initialState } from '@/store'

afterEach(() => {
  store.replaceState(initialState())
})

describe('save-user-data', () => {
  const payload = {
    email: 'test@test.com',
    age: 12
  }

  it('should set data with payload', () => {
    store.dispatch('save-user-data', payload)
    expect(store.state.data).toEqual(payload)
  })
})

describe('save-token-data', () => {
  const payload = {
    idToken: 'ID_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
    expiresIn: '3600'
  }

  beforeEach(() => {
    store.dispatch('save-token-data', payload)
  })

  it('should set idToken with payload\'s', () => {
    expect(store.state.idToken).toBe(payload.idToken)
  })

  it('should set refreshToken with payload\'s', () => {
    expect(store.state.refreshToken).toBe(payload.refreshToken)
  })

  describe('expiresIn', () => {
    beforeEach(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1000)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should set it as a Number', () => {
      expect(typeof store.state.expiresIn).toBe('number')
    })

    it('should set it as real date time', () => {
      expect(store.state.expiresIn).toBe(4600)
    })
  })
})
