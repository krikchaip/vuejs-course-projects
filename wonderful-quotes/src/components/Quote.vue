<template>
  <div class="col-xs-6 col-md-4 col-lg-3">
    <div class="card mr-4 mb-3">
      <div class="card-body quote py-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .quote {
    font-family: 'Arizonia', cursive;
    font-size: 24px;
    color: #6e6e6e;
    cursor: pointer;
  }

  .quote:hover {
    background-color: #ffe2e2;
  }
</style>
