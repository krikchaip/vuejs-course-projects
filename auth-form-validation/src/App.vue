<template>
  <div>
    <Navigation>
      <template v-if="$store.getters.isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link>
        <button @click="$store.dispatch('logout-user')">Logout</button>
      </template>
      <template v-else>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/signin">Sign In</router-link>
      </template>
    </Navigation>
    <div class="view-container">
      <router-view/>
    </div>
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
