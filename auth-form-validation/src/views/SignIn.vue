<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__group">
      <label for="email">Mail</label>
      <input class="form__input" type="email" id="email"/>
    </div>
    <div class="form__group">
      <label for="password">Password</label>
      <input class="form__input" type="password" id="password"/>
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

