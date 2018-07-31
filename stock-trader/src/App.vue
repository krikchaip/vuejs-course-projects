<template>
  <div class="container">
    <Navigation class="my-3">
      <div class="d-flex mr-3">
        <ActionEndDay/>
        <ActionSaveLoad/>
      </div>
    </Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import ActionEndDay from '@/components/ActionEndDay'
  import ActionSaveLoad from '@/components/ActionSaveLoad'

  export default {
    components: { Navigation, ActionEndDay, ActionSaveLoad }
  }
</script>

<style>
  @import '~@/assets/bootstrap.min.css';
</style>

<style scoped>
  .nav-item {
    cursor: pointer;
    user-select: none;
  }
</style>
