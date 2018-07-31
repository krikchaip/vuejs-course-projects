<template>
  <div class="card p-4">
    <h1 class="h2">Trade or View your Portfolio</h1>
    <small>You may Save & Load your Data</small>
    <small>Click on "End Day" to begin a new Day!</small>
    <hr/>
    <strong>Your Funds: ${{ $store.getters.funds }}</strong>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
