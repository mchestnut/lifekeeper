<template>
  <div class="c-card-life">
    <div class="c-card-life__border-outer" v-bind:style="border"></div>
    <div class="c-card-life__texture"></div>
    <div class="c-card-life__background" v-bind:style="background"></div>
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
    border: 2px solid transparent;
    border-top-right-radius: 8px 50%;
    border-bottom-right-radius: 8px 50%;
    border-bottom-left-radius: 8px 50%;
    border-top-left-radius: 8px 50%;
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
    border-width: 4px;
    border-top-right-radius: 11px 50%;
    border-bottom-right-radius: 11px 50%;
    border-bottom-left-radius: 11px 50%;
    border-top-left-radius: 11px 50%;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  } 
</style>
