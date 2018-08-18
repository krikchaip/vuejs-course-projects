import _ from 'ramda'
import axios, { AxiosResponse } from 'axios'
import { APIKeyError, TargetDBError } from 'lib/errors'

axios.interceptors.response.use(
  value => value.data,
  error => error.response.data
)

const BASE_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'

/**
 * @param {String} type Endpoint type
 * @param {String} API_KEY Firebase Web API Key
 */
function toEndpoint(type, API_KEY) {
  return BASE_ENDPOINT + type + '?key=' + API_KEY
}

/**
 * @param {String} uid Firebase user UID
 * @param {String} ID_TOKEN Authenticate request token
 */
function toRecordURL(uid, ID_TOKEN) {
  return getFirebaseDBUrl() + '/users/' + uid + '.json' + '?auth=' + ID_TOKEN
}

/**
 * @param {String} key to look up in process.env
 */
function IOgetEnv(key) {
  /** @type {String | undefined} */
  const value = _.prop(key, process.env)

  if(value) { return value }
  else { throw new ReferenceError(`process.env.${key} not found`) }
}

/**
 * @returns {String} FIREBASE_API_KEY
 */
function getFirebaseAPIKey() {
  try { return IOgetEnv('VUE_APP_FIREBASE_API_KEY') }
  catch(_) { throw new APIKeyError('FIREBASE_API_KEY not found') }
}

/**
* @returns {String} FIREBASE_DB_URL
*/
function getFirebaseDBUrl() {
  try { return IOgetEnv('VUE_APP_FIREBASE_DB_URL') }
  catch(_) { throw new TargetDBError('FIREBASE_DB_URL not found') }
}

/**
 * see firebase [documentation](https://goo.gl/fszB6r) for return value
 * @param {String} email
 * @param {String} password
 */
export async function emailPasswordSignUp(email, password) {
  return axios.post(
    toEndpoint('signupNewUser', getFirebaseAPIKey()),
    { email, password, returnSecureToken: true }
  )
}

/**
* see firebase [documentation](https://goo.gl/DHfXKw) for return value
* @param {String} email
* @param {String} password
*/
export async function emailPasswordSignIn(email, password) {
  return axios.post(
    toEndpoint('verifyPassword', getFirebaseAPIKey()),
    { email, password, returnSecureToken: true }
  )
}

/**
 * @typedef UserData
 * @type {{ [a: string]: any, UID: String, email: String }}
 */

/**
 * @param {UserData} userData
 * @param {String} ID_TOKEN Authenticate request token
 * @return {Promise<AxiosResponse<UserData>>} the data we wrote to the database
 */
export async function addUserRecord(userData, ID_TOKEN) {
  return axios.put(
    toRecordURL(userData.UID, ID_TOKEN),
    { ..._.omit(['UID'], userData) }
  )
}

export default {
  emailPasswordSignUp,
  emailPasswordSignIn,
  addUserRecord
}
