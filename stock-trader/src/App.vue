<template>
  <div class="container">
    <Navigation class="my-3">
    </Navigation>
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
