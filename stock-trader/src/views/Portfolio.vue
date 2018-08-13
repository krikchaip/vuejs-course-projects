<template>
  <div class="row">
    <div
      v-for="(data, idx) of $store.state.stocks"
      :key="idx"
      class="col-12 col-md-6 mb-3">
      <StockUser v-bind="data"/>
    </div>
  </div>
</template>

<script>
  import StockUser from '@/components/StockUser'

  export default {
    name: 'Portfolio',
    components: { StockUser }
  }
</script>
