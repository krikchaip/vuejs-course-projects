import { shallowMount } from '@vue/test-utils'
import SignUp from '@/views/SignUp'

describe('userData', () => {
  describe('form has been filled up', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(SignUp, {
        data: () => ({
          email: 'test@test.com',
          age: 10,
          password: '1234',
          cpassword: '1234',
          country: 'USA',
          accept: true
        })
      })
    })

    it('should return an object', () => {
      expect(wrapper.vm.userData).toEqual(expect.any(Object))
      expect(wrapper.vm.userData).not.toBe(null)
    })

    it('should not contain cpassword key', () => {
      expect(wrapper.vm.userData).toEqual(expect.not.objectContaining({
        cpassword: expect.anything()
      }))
    })

    it('should not contain accept key', () => {
      expect(wrapper.vm.userData).toEqual(expect.not.objectContaining({
        accept: expect.anything()
      }))
    })
  })
})
