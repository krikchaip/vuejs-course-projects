<template>
  <div class="col-12 col-md-6 col-lg-4 px-2 pb-3">
    <div class="card">
      <header
        class="card-header bg-success text-white"
        :class="headerClass">
        BMW
        <small data-v-section="price">[ Price: {{ price }} ]</small>
      </header>
      <div class="card-body">
        <div class="form-row">
          <input
            class="form-control form-control-sm col-6 mr-auto"
            type="number"
            placeholder="Quantity"
          />
          <button
            class="btn btn-sm"
            :class="actionClass"
            @click="action($event)">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stock',
    props: ['price', 'headerClass', 'actionClass', 'action']
  }
</script>
