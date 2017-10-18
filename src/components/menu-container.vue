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
    border: 2px solid;
    border-radius: 3px;
    box-shadow: 0 0 0 4px $grayStroke,
                0 0 20px 4px rgba(0, 0, 0, 0.7);

    &::after {
      background-color: $grayMedium;
      opacity: 0.95;
    }
  }
</style>
