<template>
  <div class="c-menu-container">
    <slot></slot>
    <div class="c-menu-container__border-outer"></div>
    <div class="c-menu-container__texture"></div>
    <div class="c-menu-container__background"></div>
    <div class="c-menu-container__border-inner"></div>
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
    position: relative;
    z-index: 1;
  }

  .c-menu-container__background,
  .c-menu-container__border-inner,
  .c-menu-container__border-outer,
  .c-menu-container__texture {
    position: absolute;
    z-index: -1;
  }

  .c-menu-container__background,
  .c-menu-container__border-inner,
  .c-menu-container__texture {
    border: $unitStroke solid transparent;
    border-radius: $unitStroke * 1.5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-menu-container__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-menu-container__background {
    background-color: $grayMedium;
    opacity: 0.9;
  }

  .c-menu-container__border-inner {
    border-color: black;
  }

  .c-menu-container__border-outer {
    background-color: $grayStroke;
    border-radius: $unitStroke * 3;
    top: $unitStroke * -2;
    right: $unitStroke * -2;
    bottom: $unitStroke * -2;
    left: $unitStroke * -2;
  }
</style>
