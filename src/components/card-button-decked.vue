<template>
  <svg class="c-card-button-decked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 51">
    <defs>
      <linearGradient v-bind:id="gradientId">
        <stop offset="0%" v-bind:stop-color="stop1"/>
        <stop offset="100%" v-bind:stop-color="stop2"/>
      </linearGradient>
    </defs>
    <path class="c-card-button-decked__stroke" v-bind:style="stroke" transform="translate(1 1)" d="M106.06,27l-7.6,17.23a7,7,0,0,1-6.38,4.16H14.57a7,7,0,0,1-6.38-4.16L.59,27a7,7,0,0,1,0-5.62L8.19,4.16A7,7,0,0,1,14.57,0H92.08a7,7,0,0,1,6.38,4.16l7.6,17.21A7,7,0,0,1,106.06,27Z"/>
    <path class="c-card-button-decked__background" v-bind:style="background" transform="translate(1 1)" d="M92.08,44.4H14.57a3,3,0,0,1-2.72-1.77L4.25,25.4a3,3,0,0,1,0-2.4l7.6-17.23A3,3,0,0,1,14.57,4H92.08A3,3,0,0,1,94.8,5.77L102.4,23a3,3,0,0,1,0,2.4L94.8,42.62A3,3,0,0,1,92.08,44.4Z"/>
    <g v-show="player.decked">
      <path d="M49.62,25.37l3.65,1.78H32.78a.89.89,0,1,1,0-1.78H49.62Z"/>
      <path d="M74.42,19.17l-7.84,7.72a.9.9,0,0,1-.62.26h-.54l-3.65-1.78h3.76l7.59-7.47a.91.91,0,1,1,1.3,1.27Z"/>
      <path d="M34.84,18.14l8.58,4.18H32.78a1,1,0,0,1-.6-.23.88.88,0,0,1-.29-.66.91.91,0,0,1,.27-.64Z"/>
      <path d="M74.66,13.71a.83.83,0,0,1-.27.64l-7.84,7.72a.9.9,0,0,1-.62.26H55.56L38.88,14.17,40,13.07a.91.91,0,0,1,.62-.26H73.76a1,1,0,0,1,.66.27A.87.87,0,0,1,74.66,13.71Z"/>
      <path d="M66.81,33.77l1.7.83-2,1.94a.9.9,0,0,1-.62.26H32.78a.89.89,0,0,1,0-1.78H65.56Z"/>
      <path d="M74.42,28.82l-1.87,1.76-1.69-.83,2.28-2.17a.9.9,0,0,1,1.26,0A.89.89,0,0,1,74.42,28.82Z"/>
      <path d="M59.48,30.19,63.13,32H32.78a.89.89,0,0,1,0-1.78Z"/>
      <path d="M74.42,24l-5.11,5-1.7-.83,5.56-5.47A.9.9,0,1,1,74.42,24Z"/>
      <path d="M78.13,36.33a.87.87,0,0,1-1.19.4l-7.08-3.46-1.69-.83h0l-1.57-.77-3-1.49-6.23-3L53.72,25.4l-6.23-3-11.3-5.58-7.27-3.55a.9.9,0,0,1-.41-1.19h0a.77.77,0,0,1,.14-.21l.09-.09.1-.07a.76.76,0,0,1,.23-.13h.24a.86.86,0,0,1,.39.09l7.83,3.82,14,6.83,6.24,3,3.65,1.83,4.85,2.37,1.7.83,1.57.77,1.7.83,6.51,3.18A.9.9,0,0,1,78.13,36.33Z"/>
    </g>
    <g v-show="!player.decked">
      <path d="M74.45,17.9a.9.9,0,0,1,0,1.26h0l-7.84,7.72a.88.88,0,0,1-.62.26H32.82a.89.89,0,0,1,0-1.78H65.6l7.59-7.47a.89.89,0,0,1,1.26,0Z"/>
      <path d="M32.22,22.08a.92.92,0,0,1-.29-.66.93.93,0,0,1,.27-.61c1.95-2,7.84-7.74,7.84-7.74a.91.91,0,0,1,.62-.26H73.81a1,1,0,0,1,.64.27.87.87,0,0,1,.26.62.83.83,0,0,1-.27.64l-7.85,7.72a.88.88,0,0,1-.66.25H32.82A1,1,0,0,1,32.22,22.08Z"/>
      <path d="M74.45,27.55a.9.9,0,0,1,0,1.26h0l-7.84,7.72a.86.86,0,0,1-.68.28H32.82a.89.89,0,0,1,0-1.78H65.6l7.59-7.46a.9.9,0,0,1,1.26,0Z"/>
      <path d="M74.45,22.73a.9.9,0,0,1,0,1.26h0l-7.86,7.72A.88.88,0,0,1,66,32H32.82a.89.89,0,0,1,0-1.78H65.6l7.59-7.47a.89.89,0,0,1,1.26,0Z"/>
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'cardButtonStatus',
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

  .c-card-button-decked__stroke {
    stroke: black;
    stroke-width: $unitStroke;
  }
</style>
