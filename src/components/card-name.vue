<template>
  <div class="c-card-name">
    <div class="c-card-name__border-outer" v-bind:style="border"></div>
    <div class="c-card-name__texture"></div>
    <div class="c-card-name__background" v-bind:style="background"></div>
    <div class="c-card-name__border-inner"></div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'cardName',
  props: [
    'colors'
  ],
  computed: {
    background: function () {
      return {backgroundColor: this.colors.medium}
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
  .c-card-name {
    position: relative;
  }

  .c-card-name__background,
  .c-card-name__border-inner,
  .c-card-name__border-outer,
  .c-card-name__texture {
    position: absolute;
    z-index: -1;
  }

  .c-card-name__background,
  .c-card-name__border-inner,
  .c-card-name__texture {
    border: 2px solid transparent;
    border-radius: 6px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-card-name__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-card-name__background {
    opacity: 0.9;
  }

  .c-card-name__border-inner {
    border-color: black;
  }

  .c-card-name__border-outer {
    border-radius: 10px;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }  
</style>
