import router from '@/router'
import store, { initialState } from '@/store'

afterEach(() => {
  store.replaceState(initialState())
  router.replace('/')
})

describe('/dashboard', () => {
  describe('idToken store state', () => {
    describe('provided', () => {
      it('enter gracefully', () => {
        store.replaceState({ ...initialState(), idToken: 'W00T_SECRET' })
        router.push('/dashboard')

        expect(router.currentRoute.fullPath).toBe('/dashboard')
      })
    })

    describe('missing', () => {
      it('redirect to /signin', () => {
        store.replaceState({ ...initialState(), idToken: null })
        router.push('/dashboard')

        expect(router.currentRoute.fullPath).toBe('/signin')
      })
    })
  })
})
