<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__group">
      <label for="email">Mail</label>
      <input v-model="email" class="form__input" type="email" id="email"/>
    </div>
    <div class="form__group">
      <label for="password">Password</label>
      <input v-model="password" class="form__input" type="password" id="password"/>
    </div>
    <button class="btn">Submit</button>
  </form>
</template>

<script>
  import firebase from 'lib/firebase'

  export default {
    data: () => ({
      email: null,
      password: null
    }),
    methods: {
      async onSubmit() {
        // sign-in to firebase to get some information
        const {
          idToken,
          refreshToken,
          expiresIn,
          localId
        } = await firebase.emailPasswordSignIn(
          this.email,
          this.password
        )

        // fetch user data from db with idToken
        // user data also contain uid(localId)
        const data = await firebase.getUserRecord(localId, idToken)
        data.uid = localId

        // save user data to vuex store alongside with token data
        // also save user session
        const tokenData = {
          idToken,
          refreshToken,
          expiresIn
        }

        await this.$store.dispatch('save-user-data', data)
        await this.$store.dispatch('save-token-data', tokenData)
        await this.$store.dispatch('save-user-session')

        // set logout watcher when user idToken expires
        this.$store.dispatch('auto-logout-user')

        // redirect to /dashboard after login completed
        this.$router.push('/dashboard')
      }
    }
  }
</script>

