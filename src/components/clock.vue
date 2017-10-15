<template>
  <div class="c-clock">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.54 115.33">
      <defs>
        <pattern id="texture" patternUnits="userSpaceOnUse" width="273" height="273">
          <image xlink:href="../assets/img/texture.jpg" x="0" y="0" width="273" height="273"/>
        </pattern>
        <path id="clock-background" d="M254.67,111.33c18.5,0,18.5-107.33,0-107.33H17.87c-18.5,0-18.5,107.33,0,107.33Z"/>
      </defs>
      <use class="u-fill-texture" xlink:href="#clock-background"/>
      <use v-bind:class="background" class="u-opacity-95" xlink:href="#clock-background"/>
      <path d="M254.67,6c5.84,0,11.88,19.33,11.88,51.67s-6,51.67-11.87,51.67H17.87c-3.11,0-6.27-5.69-8.46-15.22S6,71.58,6,57.67C6,25.33,12,6,17.87,6H254.67m0-2H17.87c-18.5,0-18.5,107.33,0,107.33H254.67c18.5,0,18.5-107.33,0-107.33Z"/>
      <path v-bind:class="strokeOuter" d="M254.67,4c18.5,0,18.5,107.33,0,107.33H17.88C-.62,111.33-.62,4,17.88,4H254.67m0-4H17.88C1.29,0,0,44.14,0,57.67,0,72,1.27,85.44,3.57,95.46c3.07,13.37,7.75,19.87,14.3,19.87H254.67c16.59,0,17.88-44.14,17.88-57.67S271.25,0,254.67,0Z"/>
      <text class="c-clock__label" transform="translate(140 35)">Game Clock</text>
      <text class="c-clock__time" transform="translate(140 75)">5:00:00</text>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'clock',
  data () {
    return {
      background: 'u-fill-gray-stroke',
      strokeOuter: 'u-fill-gray-stroke'
    }
  },
  computed: {
    ...mapState('clock', [
      'totalTime'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .c-clock {
    width: 50%;
    margin: 0 auto;
  }

  .c-clock__label {
    font-size: 18px;
  }

  .c-clock__time {
    font-size: 60px;
  }
</style>