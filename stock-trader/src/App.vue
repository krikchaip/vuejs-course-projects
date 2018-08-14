<template>
  <div class="container">
    <Navigation class="my-3">
      <div class="d-flex mr-3">
        <ActionEndDay/>
        <ActionSaveLoad/>
      </div>
    </Navigation>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
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

  * {
    user-select: none;
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
