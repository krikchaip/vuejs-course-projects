<template>
  <div class="container">
    <the-header class="mt-5 mb-3"/>
    <quote-add/>
    <div class="row no-gutters">
      <quote>Test</quote>
    </div>
    <div class="alert alert-info text-center">
      <small>Info: Click on a Quote to delete it.</small>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TheHeader: require('@/components/TheHeader').default,
      Quote: require('@/components/Quote').default,
      QuoteAdd: require('@/components/QuoteAdd').default
    }
  }
</script>
