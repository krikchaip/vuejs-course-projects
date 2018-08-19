export const emailPasswordSignUp = jest.fn().mockResolvedValue({
  kind: 'identitytoolkit#SignupNewUserResponse',
  idToken: 'SECRET_ID_TOKEN',
  email: 'test@test.com',
  refreshToken: 'SECRET_REFRESH_ID_TOKEN',
  expiresIn: '3600',
  localId: 'p0nYsW@gG3R'
})

export const emailPasswordSignIn = jest.fn().mockResolvedValue({
  kind: 'identitytoolkit#SignupNewUserResponse',
  idToken: 'SECRET_ID_TOKEN',
  email: 'test@test.com',
  refreshToken: 'SECRET_REFRESH_ID_TOKEN',
  expiresIn: '3600',
  localId: 'p0nYsW@gG3R',
  registered: true
})

export const addUserRecord = jest.fn((data, _) => {
  delete data.UID
  return Promise.resolve(data)
})

export const getUserRecord = jest.fn().mockResolvedValue({
  email: 'test@test.com',
  age: '23',
  country: 'USA'
})

export default {
  emailPasswordSignUp,
  emailPasswordSignIn,
  addUserRecord,
  getUserRecord
}
