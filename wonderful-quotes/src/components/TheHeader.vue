<template>
  <div>
    <h3>Quotes Added</h3>
    <div class="progress">
      <div
        aria-valuemax="100"
        aria-valuemin="0"
        class="progress-bar"
        role="progressbar"
        :style="{ width: `${current / max * 100}%` }">
        {{ current }} / {{ max }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['current', 'max']
  }
</script>
