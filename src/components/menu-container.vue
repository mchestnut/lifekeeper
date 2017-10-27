<template>
  <div class="c-menu-container u-background-texture">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'menuContainer'
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-menu-container {
    padding: 1rem;
    border: $unitStroke solid;
    border-radius: $unitStroke * 1.5;
    box-shadow: 0 0 0 ($unitStroke * 2) $grayStroke,
                0 0 ($unitStroke * 10) ($unitStroke * 2) rgba(0, 0, 0, 0.7);

    &::after {
      background-color: $grayMedium;
      opacity: 0.95;
    }
  }
</style>
