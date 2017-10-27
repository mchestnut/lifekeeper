<template>
  <svg class="c-card-button-poison" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 51">
    <defs>
      <linearGradient v-bind:id="gradientId">
        <stop offset="0%" v-bind:stop-color="stop1"/>
        <stop offset="100%" v-bind:stop-color="stop2"/>
      </linearGradient>
    </defs>
    <path class="c-card-button-poison__stroke" v-bind:style="stroke" transform="translate(1 1)" d="M106.06,27l-7.6,17.23a7,7,0,0,1-6.38,4.16H14.57a7,7,0,0,1-6.38-4.16L.59,27a7,7,0,0,1,0-5.62L8.19,4.16A7,7,0,0,1,14.57,0H92.08a7,7,0,0,1,6.38,4.16l7.6,17.21A7,7,0,0,1,106.06,27Z"/>
    <path class="c-card-button-poison__background" v-bind:style="background" transform="translate(1 1)" d="M92.08,44.4H14.57a3,3,0,0,1-2.72-1.77L4.25,25.4a3,3,0,0,1,0-2.4l7.6-17.23A3,3,0,0,1,14.57,4H92.08A3,3,0,0,1,94.8,5.77L102.4,23a3,3,0,0,1,0,2.4L94.8,42.62A3,3,0,0,1,92.08,44.4Z"/>
    <g transform="translate(0 1)">
      <polygon points="27.6 11.54 27.6 39.77 30.95 36.92 30.95 8.63 27.6 11.54"/>
      <path d="M29.28,15.11c-5.89,0-10.65,4.08-10.65,9.08s4.76,9.07,10.65,9.07,10.66-4.07,10.66-9.08S35.17,15.11,29.28,15.11Zm0,14.2c-3.31,0-6-2.25-6-5s2.69-5,6-5,6,2.25,6,5-2.65,5-6,5Z"/>
    </g>
    <text class="c-card-button-poison__value" x="80" y="36"><slot></slot></text>
  </svg>
</template>

<script>
export default {
  name: 'cardButtonPoison',
  props: [
    'player'
  ],
  computed: {
    background: function () {
      return {fill: this.player.colors.medium}
    },
    gradientId: function () {
      return 'gradient' + this.player.id
    },
    stop1: function () {
      if (Array.isArray(this.player.colors.stroke)) {
        return this.player.colors.stroke[0]
      }

      return ''
    },
    stop2: function () {
      if (Array.isArray(this.player.colors.stroke)) {
        return this.player.colors.stroke[1]
      }

      return ''
    },
    stroke: function () {
      if (typeof this.player.colors.stroke === 'string') {
        return {fill: this.player.colors.stroke}
      } else {
        return {fill: 'url(#' + this.gradientId + ')'}
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-card-button-poison {
    width: 6rem;
  }

  .c-card-button-poison__stroke {
    stroke: black;
    stroke-width: 2px;
  }

  .c-card-button-poison__value {
    font-family: $sans-serif;
    font-size: 30px; /* Use px to scale in SVG */
    font-weight: bold;
    text-anchor: end;
  }
</style>
