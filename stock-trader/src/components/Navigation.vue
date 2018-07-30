<template>
  <nav class="navbar navbar-expand navbar-light bg-light shadow-sm">
    <router-link
      class="navbar-brand"
      to="/">
      Stock Trader
    </router-link>
    <div class="navbar-nav mr-auto">
      <router-link
        active-class="active"
        class="nav-item nav-link"
        to="/portfolio">
        Portfolio
      </router-link>
      <router-link
        active-class="active"
        class="nav-item nav-link"
        to="/stocks">
        Stocks
      </router-link>
    </div>
    <div class="navbar-nav">
      <strong class="nav-item navbar-text">
        Funds: ${{ funds.toLocaleString() }}
      </strong>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      funds: { type: Number, default: 0 }
    }
  }
</script>

<style scoped>
  .nav-item {
    font-size: 0.95rem;
  }
</style>
