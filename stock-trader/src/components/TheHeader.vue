<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" draggable="false" href="#">Stock Trader</a>
    <button class="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse show">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" draggable="false" href="#">Portfolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" draggable="false" href="#">Stocks</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" draggable="false" href="#">End Day</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            draggable="false"
            href="#">
            Save & Load
          </a>
          <div class="dropdown-menu show">
            <a class="dropdown-item" draggable="false" href="#">Save Data</a>
            <a class="dropdown-item" draggable="false" href="#">Load Data</a>
          </div>
        </li>
        <li class="nav-item navbar-text">
          <strong>Funds: ${{ (10000).toLocaleString() }}</strong>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  .nav-item, .dropdown-item {
    font-size: 0.9rem;
  }
</style>
