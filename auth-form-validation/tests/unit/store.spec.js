import store, { initialState } from '@/store'
import router from '@/router'

afterEach(() => {
  store.replaceState(initialState())
  router.replace('/')
})

describe('save-user-data', () => {
  const payload = {
    email: 'test@test.com',
    age: 12
  }

  it('should set data with payload', async () => {
    await store.dispatch('save-user-data', payload)
    expect(store.state.data).toEqual(payload)
  })
})

describe('save-token-data', () => {
  const payload = {
    idToken: 'ID_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
    expiresIn: '3600'
  }

  beforeEach(async () => {
    await store.dispatch('save-token-data', payload)
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

describe('logout-user', () => {
  describe('given user logged in', () => {
    beforeEach(async () => {
      const TIME_STAMP = 1000

      store.replaceState({
        data: { email: 'test@test.com', age: 10 },
        idToken: 'ID_TOKEN',
        refreshToken: 'REFRESH_ID_TOKEN',
        expiresIn: TIME_STAMP + 3600
      })
      router.push('/dashboard')

      await store.dispatch('logout-user')
    })

    it('should reset all state to its default', () => {
      expect(store.state).toMatchObject(initialState())
    })

    it('should redirect to /', () => {
      expect(router.currentRoute.fullPath).toBe('/')
    })
  })
})
