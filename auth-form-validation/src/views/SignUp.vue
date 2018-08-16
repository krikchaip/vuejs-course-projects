<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__group">
      <label for="email">Mail</label>
      <input class="form__input" type="email" id="email"/>
    </div>
    <div class="form__group">
      <label for="age">Your Age</label>
      <input class="form__input" type="number" id="age"/>
    </div>
    <div class="form__group">
      <label for="password">Password</label>
      <input class="form__input" type="password" id="password"/>
    </div>
    <div class="form__group">
      <label for="confirm-password">Confirm Password</label>
      <input class="form__input" type="password" id="confirm-password"/>
    </div>
    <div class="form__group">
      <label for="country">Country</label>
      <select class="form__input" id="country">
        <option>USA</option>
        <option>India</option>
        <option>UK</option>
        <option>Germany</option>
      </select>
    </div>
    <div class="form__group">
      <input class="form__input" type="checkbox" id="accept"/>
      <label for="accept">Accept Terms of Use</label>
    </div>
    <button class="btn">Submit</button>
  </form>
</template>

<script>
  export default {
    methods: {
      onSubmit() {
      }
    }
  }
</script>
