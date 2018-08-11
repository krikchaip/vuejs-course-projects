<template>
  <div
    class="nav-item dropdown"
    style="cursor: pointer"
    @click="menuShow = !menuShow">
    <span class="nav-link dropdown-toggle">Save & Load</span>
    <div :class="['dropdown-menu', { show: menuShow }]">
      <div class="dropdown-item">Save Data</div>
      <div class="dropdown-item">Load Data</div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menuShow: false
    })
  }
</script>
