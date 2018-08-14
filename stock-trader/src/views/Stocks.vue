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
  import { mapState } from 'vuex'
  import Stock from '@/components/Stock'

  export default {
    name: 'Stocks',
    components: { Stock },
    computed: {
      ...mapState(['stocksData'])
    }
  }
</script>
