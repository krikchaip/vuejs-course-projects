<template>
  <div class="container mt-4">
    <TheHeader class="mb-3"/>
  </div>
</template>

<script>
  export default {
    components: {
      TheHeader: require('@/components/TheHeader').default
    }
  }
</script>

<style>
  * {
    user-select: none;
  }
</style>
