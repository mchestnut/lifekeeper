<template>
  <div class="c-clock-container">
    <div class="c-clock-container__border-outer"></div>
    <div class="c-clock-container__texture"></div>
    <div class="c-clock-container__background"></div>
    <div class="c-clock-container__border-inner"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'clockContainer'
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
  .c-clock-container {
    padding: 0.5rem;
    position: relative;
    z-index: 1;
  }

  .c-clock-container__background,
  .c-clock-container__border-inner,
  .c-clock-container__border-outer,
  .c-clock-container__texture {
    position: absolute;
    z-index: -1;
  }

  .c-clock-container__background,
  .c-clock-container__border-inner,
  .c-clock-container__texture {
    border: $unitStroke solid transparent;
    border-top-right-radius: ($unitStroke * 4) 50%;
    border-bottom-right-radius: ($unitStroke * 4) 50%;
    border-bottom-left-radius: ($unitStroke * 4) 50%;
    border-top-left-radius: ($unitStroke * 4) 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-clock-container__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-clock-container__background {
    background-color: $grayStroke;
    opacity: 0.9;
  }

  .c-clock-container__border-inner {
    border-color: black;
  }

  .c-clock-container__border-outer {
    background-color: $grayStroke;
    border-top-right-radius: ($unitStroke * 5.5) 50%;
    border-bottom-right-radius: ($unitStroke * 5.5) 50%;
    border-bottom-left-radius: ($unitStroke * 5.5) 50%;
    border-top-left-radius: ($unitStroke * 5.5) 50%;
    top: $unitStroke * -2;
    right: $unitStroke * -2;
    bottom: $unitStroke * -2;
    left: $unitStroke * -2;
  }  
</style>
