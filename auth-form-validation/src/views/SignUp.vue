<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__group">
      <label for="email">Mail</label>
      <input v-model="email" class="form__input" type="email" id="email"/>
    </div>
    <div class="form__group">
      <label for="age">Your Age</label>
      <input v-model="age" class="form__input" type="number" id="age"/>
    </div>
    <div class="form__group">
      <label for="password">Password</label>
      <input v-model="password" class="form__input" type="password" id="password"/>
    </div>
    <div class="form__group">
      <label for="confirm-password">Confirm Password</label>
      <input v-model="cpassword" class="form__input" type="password" id="confirm-password"/>
    </div>
    <div class="form__group">
      <label for="country">Country</label>
      <select v-model="country" class="form__input" id="country">
        <option>USA</option>
        <option>India</option>
        <option>UK</option>
        <option>Germany</option>
      </select>
    </div>
    <div class="form__group">
      <input v-model="accept" class="form__input" type="checkbox" id="accept"/>
      <label for="accept">Accept Terms of Use</label>
    </div>
    <button class="btn">Submit</button>
  </form>
</template>

<script>
  import { omit } from 'ramda'

  export default {
    data: () => ({
      email: null,
      age: null,
      password: null,
      cpassword: null,
      country: 'USA',
      accept: false
    }),
    computed: {
      userData() { return omit(['cpassword', 'accept'], this.$data) }
    },
    methods: {
      onSubmit() {
        // call firebase.emailPasswordSignUp with userData
        // resolve idToken, refreshToken, expiresIn, localId
        // save userData to db immediately without a password
      }
    }
  }
</script>
