<template>
  <div class="navigation">
    <router-link class="navigation__brand" to="/">
      Vue - Complete Guide
    </router-link>
    <div class="navigation__group">
      <slot></slot>
    </div>
  </div>
</template>
