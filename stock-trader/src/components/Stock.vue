<template>
  <div class="card">
    <div class="card-header py-2 text-white bg-success">
      <strong>{{ name }}</strong>
      <small> [ Price: {{ price }} ]</small>
    </div>
    <div class="card-body form-row">
      <input
        v-model.number="quantity"
        class="form-control form-control-sm col-5 mr-auto"
        :class="{ 'is-invalid': isInvalid }"
        placeholder="Quantity"
        type="number"
        min="1"
        :max="Math.floor(funds / price)"
      />
      <button
        class="btn btn-outline-success"
        :disabled="disableConditions"
        @click="buyStock">
        Buy
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      name: String,
      price: Number
    },
    data: () => ({
      quantity: null
    }),
    computed: {
      ...mapState(['funds']),

      payAmount() { return this.quantity * this.price },
      quantityIsBlank() { return typeof this.quantity !== 'number' && !this.quantity },
      quantityIsLessThanOne() { return this.quantity < 1 },
      notEnoughFunds() { return this.funds < this.payAmount },

      disableConditions() {
        return this.quantityIsBlank
          || this.quantityIsLessThanOne
          || this.notEnoughFunds
      },

      isInvalid() {
        return !this.quantityIsBlank
          && this.quantityIsLessThanOne
          || this.notEnoughFunds
      }
    },
    methods: {
      async buyStock() {
        await this.$store.dispatch('make-payment', this.payAmount)
        await this.$store.dispatch('add-user-stock', {
          name: this.name,
          price: this.price,
          quantity: this.quantity
        })
        this.quantity = null
      }
    }
  }
</script>
