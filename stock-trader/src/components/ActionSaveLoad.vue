<template>
  <div
    class="nav-item dropdown"
    style="cursor: pointer"
    @click="menuShow = !menuShow">
    <span class="nav-link dropdown-toggle">Save & Load</span>
    <div :class="['dropdown-menu', { show: menuShow }]">
      <div class="dropdown-item" @click="save">Save Data</div>
      <div class="dropdown-item" @click="load">Load Data</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      menuShow: false
    }),
    methods: {
      async save() {
        await axios.put('data.json', this.$store.state)
      },
      async load() {
        const { data } = await axios.get('data.json')
        await this.$store.dispatch('restore-data', data)
      }
    }
  }
</script>
