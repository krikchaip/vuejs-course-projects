<template>
  <div>
    <Navigation>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </Navigation>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'

  export default {
    components: { Navigation }
  }
</script>


<style>
  @import '~@/assets/styles.css';
</style>
