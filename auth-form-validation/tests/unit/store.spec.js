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
      expect(store.state.expiresIn).toBe(3600 * 1000 + 1000)
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

describe('auto-logout-user', () => {
  describe('given user logged in', () => {
    beforeEach(() => {
      store.replaceState({
        data: { email: 'test@test.com', age: 10 },
        idToken: 'ID_TOKEN',
        refreshToken: 'REFRESH_ID_TOKEN',
        expiresIn: 10000
      })

      jest.spyOn(Date, 'now')
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllTimers()
    })

    describe('token is active', () => {
      beforeEach(() => {
        // @ts-ignore
        Date.now.mockImplementation(() => 1000)
        store.dispatch('auto-logout-user')
      })

      it('should set timeout to remaining times', () => {
        expect(setTimeout).toBeCalledWith(expect.any(Function), 9000)
      })

      describe('as time passed', () => {
        beforeEach(() => {
          jest.advanceTimersByTime(9000)
        })

        it('user should logged out', () => {
          expect(store.state).toMatchObject(initialState())
        })
      })
    })

    describe('token expired', () => {
      beforeEach(() => {
        // @ts-ignore
        Date.now.mockImplementation(() => 20000)
        store.dispatch('auto-logout-user')
      })

      it('don\'t call timeout', () => {
        expect(setTimeout).not.toBeCalled()
      })

      it('log user out immediately', () => {
        expect(store.state).toMatchObject(initialState())
      })
    })
  })
})
