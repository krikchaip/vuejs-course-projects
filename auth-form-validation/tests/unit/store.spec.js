import store, { initialState } from '@/store'
import router from '@/router'
import firebase from 'lib/firebase'

jest.mock('lib/firebase')

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
      store.replaceState({
        ...initialState(),
        idToken: 'ID_TOKEN',
        refreshToken: 'REFRESH_ID_TOKEN',
        expiresIn: 3600,
        logoutTimer: 11
      })

      localStorage.setItem('idToken', 'ID_TOKEN')
      localStorage.setItem('expiresIn', '3600')
      localStorage.setItem('uid', 'NOTHING')

      router.push('/dashboard')

      jest.spyOn(window, 'clearTimeout')
        .mockImplementation(() => true)

      await store.dispatch('logout-user')
    })

    afterEach(() => {
      localStorage.clear()
    })

    it('should clear logout timer', () => {
      expect(clearTimeout).toBeCalledWith(11)
    })

    it('should clear user credentials', () => {
      expect(localStorage.getItem('idToken')).toBe(null)
      expect(localStorage.getItem('expiresIn')).toBe(null)
      expect(localStorage.getItem('uid')).toBe(null)
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
        ...initialState(),
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
      })

      it('should set timeout to remaining times', () => {
        store.dispatch('auto-logout-user')
        expect(setTimeout).toBeCalledWith(expect.any(Function), 9000)
      })

      it('should save timeout number to state', () => {
        // @ts-ignore
        setTimeout.mockImplementation(() => 10)
        store.dispatch('auto-logout-user')

        expect(store.state.logoutTimer).toBe(10)
      })

      describe('as time passed', () => {
        beforeEach(() => {
          store.dispatch('auto-logout-user')
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

describe('save-user-session', () => {
  describe('given session', () => {
    beforeEach(() => {
      store.replaceState({
        ...initialState(),
        data: { uid: 'USER_UID_1234' },
        idToken: 'SOME_TOKEN',
        expiresIn: 100000
      })
    })

    afterEach(() => {
      localStorage.clear()
    })

    it('idToken should exist in localStorage', async () => {
      await store.dispatch('save-user-session')
      expect(localStorage.getItem('idToken')).toBe('SOME_TOKEN')
    })

    it('expiresIn should exist in localStorage', async () => {
      await store.dispatch('save-user-session')
      expect(localStorage.getItem('expiresIn')).toBe('100000')
    })

    it('uid should exist in localStorage', async () => {
      await store.dispatch('save-user-session')
      expect(localStorage.getItem('uid')).toBe('USER_UID_1234')
    })
  })
})

describe('load-user-credentials', () => {
  beforeEach(() => {
    router.replace('/')
  })

  it('resolve false when no user credentials exist', async () => {
    localStorage.clear()
    await expect(store.dispatch('load-user-credentials')).resolves.toBe(false)
  })

  describe('user credentials exist in local storage', () => {
    beforeEach(() => {
      localStorage.setItem('idToken', 'USER_ID_TOKEN')
      localStorage.setItem('expiresIn', '50000')
      localStorage.setItem('uid', 'USER_UID')
    })

    afterEach(() => {
      localStorage.clear()
    })

    it('load credentials to vuex store', async () => {
      await store.dispatch('load-user-credentials')

      expect(store.state.idToken).toBe('USER_ID_TOKEN')
      expect(store.state.expiresIn).toBe(50000)
      expect(store.state.data.uid).toBe('USER_UID')
    })

    describe('token status', () => {
      describe('expired', () => {
        beforeEach(() => {
          jest.spyOn(Date, 'now').mockImplementation(() => 100000)
        })

        it('resolve false', async () => {
          await expect(store.dispatch('load-user-credentials')).resolves.toBe(false)
        })
      })

      describe('still active', () => {
        beforeEach(() => {
          jest.spyOn(Date, 'now').mockImplementation(() => 1000)
        })

        it('resolve true', async () => {
          await expect(store.dispatch('load-user-credentials')).resolves.toBe(true)
        })
      })
    })
  })
})
