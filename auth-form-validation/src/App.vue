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
  import firebase from 'lib/firebase'

  export default {
    components: { Navigation },
    created() {
      this._created()
    },
    methods: {
      async _created() {
        if(await this.$store.dispatch('load-user-credentials')) {
          // fetch user data from db with idToken
          // user data also contain uid(localId)
          const { data: { uid: localId }, idToken } = this.$store.state
          const data = await firebase.getUserRecord(localId, idToken)
          data.uid = localId

          // save user data to vuex store
          await this.$store.dispatch('save-user-data', data)

          // set logout watcher when user idToken expires
          this.$store.dispatch('auto-logout-user')

          // redirect to /dashboard after login completed
          this.$router.push('/dashboard')
        }
      }
    }
  }
</script>

<style>
  @import '~@/assets/styles.css';
</style>
