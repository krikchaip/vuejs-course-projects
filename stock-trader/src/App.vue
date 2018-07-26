<template>
  <div class="container mt-4">
    <TheHeader class="mb-3"/>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader'

  export default {
    components: {
      TheHeader
    }
  }
</script>

<style>
  * {
    user-select: none;
  }
</style>
