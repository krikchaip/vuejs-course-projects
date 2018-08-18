import { shallowMount } from '@vue/test-utils'
// @ts-ignore
import SignUp from '@/views/SignUp'

describe('form has been filled up', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SignUp, {
      data: () => ({
        email: 'test@test.com',
        age: 10,
        password: '123456',
        cpassword: '123456',
        country: 'USA',
        accept: true
      })
    })
  })

  describe('userData', () => {
    it('should return an object', () => {
      expect(wrapper.vm.userData).toEqual(expect.any(Object))
      expect(wrapper.vm.userData).not.toBe(null)
    })

    it('should not contain password, cpassword and accept key', () => {
      // @ts-ignore
      expect(wrapper.vm.userData).toEqual(expect.not.objectContaining({
        password: expect.anything(),
        cpassword: expect.anything(),
        accept: expect.anything()
      }))
    })
  })
})
