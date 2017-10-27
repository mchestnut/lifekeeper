<template>
  <div class="c-clock">
    <div class="c-clock__container u-background-texture">
      <p class="c-clock__label">Game Clock</p>
      <p class="c-clock__time">5:00:00</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'clock',
    computed: {
      ...mapState('clock', [
        'totalTime'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-clock__container {
    width: 14rem;
    margin: 0 auto;
    padding: 0.5rem;
    box-shadow: 0 0 0 $unitStroke black,
                0 0 0 ($unitStroke * 3) $grayStroke;

    &,
    &::after,
    &::before {
      border-top-right-radius: ($unitStroke * 3) 50%;
      border-bottom-right-radius: ($unitStroke * 3) 50%;
      border-bottom-left-radius: ($unitStroke * 3) 50%;
      border-top-left-radius: ($unitStroke * 3) 50%;
    }

    &::after {
      background-color: $grayStroke;
      opacity: 0.95;
    }
  }

  .c-clock__label,
  .c-clock__time {
    text-align: center;
    margin: 0;
  }

  .c-clock__time {
    font-size: 3rem;
  }
</style>