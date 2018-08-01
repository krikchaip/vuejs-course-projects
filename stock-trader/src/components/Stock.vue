<template>
  <div class="card">
    <div class="card-header py-2 text-white bg-success">
      <strong>{{ name }}</strong>
      <small> [ Price: {{ price }} ]</small>
    </div>
    <div class="card-body form-row">
      <input
        class="form-control form-control-sm col-5 mr-auto"
        placeholder="Quantity"
        type="number"
        min="1"
      />
      <button class="btn btn-outline-success">Buy</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      price: Number
    }
  }
</script>
