<template>
  <div class="c-card-shell">
    <div class="c-card-shell__texture"></div>
    <div class="c-card-shell__background" :style="background"></div>
    <div class="c-card-shell__border-inner"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'cardShell',
    props: [
      'colors'
    ],
    computed: {
      background: function () {
        return {backgroundColor: this.colors.dark}
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
  .c-card-shell {
    position: relative;
  }

  .c-card-shell__background,
  .c-card-shell__border-inner,
  .c-card-shell__texture {
    border: ($unitStroke * 4) solid transparent;
    border-radius: $unitStroke * 8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  .c-card-shell__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-card-shell__background {
    opacity: 0.65;
  }

  .c-card-shell__border-inner {
    border-color: black;
    box-shadow: 0 ($unitStroke / 1) ($unitStroke * 1.5) 0 rgba(0, 0, 0, 0.8);
  }
</style>
