<template>
  <div class="row">
    <div
      v-for="(data, idx) of stocksData"
      :key="idx"
      class="col-12 col-md-6 mb-3">
      <Stock v-bind="data"/>
    </div>
  </div>
</template>

<script>
  import Stock from '@/components/Stock'

  export default {
    name: 'Stocks',
    components: { Stock },
    data: () => ({
      stocksData: null
    }),
    async created() {
      this.stocksData = await this.fetchStocksData()
    },
    methods: {
      async fetchStocksData() {
        return [
          { name: 'BMW', price: 100 },
          { name: 'Google', price: 200 },
          { name: 'Apple', price: 250 },
          { name: 'Twitter', price: 50 }
        ]
      }
    }
  }
</script>
