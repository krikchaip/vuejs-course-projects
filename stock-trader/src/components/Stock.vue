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
      />
      <button
        class="btn btn-outline-success"
        :disabled="onConditions"
        @click="buyStock({ name, price, quantity })">
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
      haveEnoughFunds() {
        return this.quantity * this.price <= this.funds
      },
      legitQuantity() {
        return this.quantity > 0
      },
      onConditions() {
        if(this.quantity) {
          return !this.legitQuantity
            ? true
            : !this.haveEnoughFunds
        }
        return true
      },
      isInvalid() {
        if(typeof this.quantity === 'number') {
          return !this.legitQuantity
            ? true
            : !this.haveEnoughFunds
        }
        return false
      }
    },
    methods: {
      buyStock(stockData = { name, price, quantity }) {
        this.quantity = null
        this.$store.commit('WITHDRAW_FUNDS', stockData.price * stockData.quantity)
        this.$store.commit('ADD_STOCK', stockData)
      }
    }
  }
</script>
