<template>
  <div class="c-card-damage">
    <div class="c-card-damage__border-outer" v-bind:style="border"></div>
    <div class="c-card-damage__texture"></div>
    <div class="c-card-damage__background" v-bind:style="background"></div>
    <div class="c-card-damage__border-inner"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'cardDamage',
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
  
  .c-card-damage {
    position: relative;
  }

  .c-card-damage__background,
  .c-card-damage__border-inner,
  .c-card-damage__border-outer,
  .c-card-damage__texture {
    position: absolute;
    z-index: -1;
  }

  .c-card-damage__background,
  .c-card-damage__border-inner,
  .c-card-damage__texture {
    border: $unitStroke solid transparent;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-card-damage__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-card-damage__background {
    opacity: 0.9;
  }

  .c-card-damage__border-inner {
    border-color: black;
  }

  .c-card-damage__border-outer {
    top: $unitStroke * -2;
    right: $unitStroke * -2;
    bottom: $unitStroke * -2;
    left: $unitStroke * -2;
  }  
</style>
