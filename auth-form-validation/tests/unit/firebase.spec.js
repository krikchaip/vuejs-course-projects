import axios from 'axios'
import { APIKeyError, TargetDBError } from 'lib/errors'
import firebase from 'lib/firebase'

jest.mock('axios')

const API_KEY = process.env.VUE_APP_FIREBASE_API_KEY
const DB_URL = process.env.VUE_APP_FIREBASE_DB_URL

afterEach(() => {
  jest.resetAllMocks()
  process.env.VUE_APP_FIREBASE_API_KEY = API_KEY
  process.env.VUE_APP_FIREBASE_DB_URL = DB_URL
})

describe('emailPasswordSignUp', () => {
  it('reject APIKeyError when no API_KEY provided', async () => {
    delete process.env.VUE_APP_FIREBASE_API_KEY
    await expect(firebase.emailPasswordSignUp('winner', '123456'))
      .rejects.toBeInstanceOf(APIKeyError)
  })

  describe('with API_KEY', () => {
    beforeEach(async () => {
      process.env.VUE_APP_FIREBASE_API_KEY = 'something_secret'
      await firebase.emailPasswordSignUp('winner', '123456')
    })

    it('make post request to the API endpoint', () => {
      // @ts-ignore
      expect(axios.post.mock.calls[0][0]).toMatchSnapshot()
    })

    it('payload data contain email, password and returnSecureToken', () => {
      // @ts-ignore
      expect(axios.post.mock.calls[0][1]).toMatchObject({
        email: 'winner',
        password: '123456',
        returnSecureToken: true
      })
    })
  })
})

describe('emailPasswordSignIn', () => {
  it('reject APIKeyError when no API_KEY provided', async () => {
    delete process.env.VUE_APP_FIREBASE_API_KEY
    await expect(firebase.emailPasswordSignIn('winner', '123456'))
      .rejects.toBeInstanceOf(APIKeyError)
  })

  describe('with API_KEY', () => {
    beforeEach(async () => {
      process.env.VUE_APP_FIREBASE_API_KEY = 'something_secret'
      await firebase.emailPasswordSignIn('winner', '123456')
    })

    it('make post request to the API endpoint', () => {
      // @ts-ignore
      expect(axios.post.mock.calls[0][0]).toMatchSnapshot()
    })

    it('payload data contain email, password and returnSecureToken', () => {
      // @ts-ignore
      expect(axios.post.mock.calls[0][1]).toMatchObject({
        email: 'winner',
        password: '123456',
        returnSecureToken: true
      })
    })
  })
})

describe('addUserRecord', () => {
  const userData = {
    UID: 'SeCrEt1234',
    email: 'test@test.com',
  }
  const ID_TOKEN = 'auth_token_for_realtime_db'

  it('reject TargetDBError when no DB_URL provided', async () => {
    delete process.env.VUE_APP_FIREBASE_DB_URL
    await expect(firebase.addUserRecord(userData, ID_TOKEN))
      .rejects.toBeInstanceOf(TargetDBError)
  })

  describe('with DB_URL', () => {
    beforeEach(async () => {
      process.env.VUE_APP_FIREBASE_DB_URL = '[URL_TO_FIREBASE_REALTIME_DB]'
      await firebase.addUserRecord(userData, ID_TOKEN)
    })

    it('make put request to /users/[UID].json?auth=[ID_TOKEN]', () => {
      // @ts-ignore
      expect(axios.put.mock.calls[0][0]).toMatchSnapshot()
    })

    it('no UID field present in payload data', () => {
      // @ts-ignore
      expect(axios.put.mock.calls[0][1]).toEqual({ email: 'test@test.com' })
    })
  })
})
