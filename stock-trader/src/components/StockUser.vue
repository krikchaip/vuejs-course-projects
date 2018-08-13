<template>
  <div class="card">
    <div class="card-header py-2 text-white bg-info">
      <strong>{{ name }}</strong>
      <small> [ Price: {{ price }}, Quantity: {{ quantity }} ]</small>
    </div>
    <div class="card-body form-row">
      <input
        v-model="sellQuantity"
        class="form-control form-control-sm col-5 mr-auto"
        :class="{ 'is-invalid': shouldWarn }"
        placeholder="Quantity"
        type="number"
        min="1"
      />
      <button
        class="btn btn-outline-success"
        :disabled="shouldDisable">
        Sell
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      price: Number,
      quantity: Number
    },
    data: () => ({
      sellQuantity: null
    }),
    computed: {
      sellQuantityNotBlank() { return !!this.sellQuantity },
      sellQuantityZeroOrNegative() { return Number(this.sellQuantity) < 1 },
      withinOwnedAmount() { return Number(this.sellQuantity) <= this.quantity },

      shouldWarn() {
        return this.sellQuantityNotBlank
          && this.sellQuantityZeroOrNegative
          || !this.withinOwnedAmount
      },

      shouldDisable() {
        return !this.sellQuantityNotBlank
          || this.sellQuantityZeroOrNegative
          || !this.withinOwnedAmount
      }
    }
  }
</script>
