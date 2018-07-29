<template>
  <div class="container">
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'

  export default {
    components: { Navigation }
  }
</script>

<style>
  @import '~@/assets/bootstrap.min.css';
</style>
