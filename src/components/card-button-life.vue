<template>
  <svg class="c-card-button-life" viewBox="0 0 56 51">
    <defs>
      <linearGradient :id="gradientId">
        <stop offset="0%" :stop-color="stop1"/>
        <stop offset="100%" :stop-color="stop2"/>
      </linearGradient>
    </defs>
    <path class="c-card-button-life__stroke" :style="stroke" transform="translate(1 1)" d="M52.59,27,45,44.24a7,7,0,0,1-6.43,4.15h-24a7,7,0,0,1-6.38-4.16L.59,27a7,7,0,0,1,0-5.62L8.19,4.16A7,7,0,0,1,14.57,0h24A7,7,0,0,1,45,4.16l7.59,17.21A7,7,0,0,1,52.59,27Z"/>
    <path class="c-card-button-life__background" :style="background" transform="translate(1 1)" d="M38.62,44.4h-24a3,3,0,0,1-2.72-1.77L4.25,25.4a3,3,0,0,1,0-2.4l7.6-17.23A3,3,0,0,1,14.57,4h24a3,3,0,0,1,2.72,1.77L48.93,23a3,3,0,0,1,0,2.4l-7.6,17.23A3,3,0,0,1,38.62,44.4Z"/>
    <g transform="translate(15 12.5)"><slot></slot></g>
  </svg>
</template>

<script>
  export default {
    name: 'cardButtonLife',
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

  .c-card-button-life__stroke {
    stroke: black;
    stroke-width: $unitStroke * 1.5;
  }
</style>
