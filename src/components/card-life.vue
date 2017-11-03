<template>
  <div class="c-card-life">
    <div class="c-card-life__border-outer" :style="border"></div>
    <div class="c-card-life__texture"></div>
    <div class="c-card-life__background" :style="background"></div>
    <div class="c-card-life__border-inner"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'cardLife',
    props: [
      'colors'
    ],
    computed: {
      background: function () {
        return {backgroundColor: this.colors.light}
      },
      border: function () {
        if (typeof this.colors.stroke === 'string') {
          return {backgroundColor: this.colors.stroke}
        } else {
          const direction = 'to right, '
          const values = this.colors.stroke[0] + ', ' + this.colors.stroke[1]
          const gradient = 'linear-gradient(' + direction + values + ')'

          return {backgroundImage: gradient}
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  

  .c-card-life {
    position: relative;
  }

  .c-card-life__background,
  .c-card-life__border-inner,
  .c-card-life__border-outer,
  .c-card-life__texture {
    position: absolute;
    z-index: -1;
  }

  .c-card-life__background,
  .c-card-life__border-inner,
  .c-card-life__texture {
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

  .c-card-life__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-card-life__background {
    opacity: 0.9;
  }

  .c-card-life__border-inner {
    border-color: black;
  }

  .c-card-life__border-outer {
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
