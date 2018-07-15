<template>
  <div class="row no-gutters justify-content-center">
    <form class="col-6">
      <div class="form-group">
        <label class="font-weight-bold">Quote</label>
        <textarea
          class="form-control mb-2"
          rows="3"
          style="resize: none">
        </textarea>
        <div class="form-row justify-content-center">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click.prevent="() => {}">
            Add Quote
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
