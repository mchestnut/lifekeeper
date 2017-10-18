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
    height: auto;
    margin: 0 auto;
    padding: 1rem;
    box-shadow: 0 0 0 2px black,
                0 0 0 6px $grayStroke;

    &,
    &::after,
    &::before {
      border-top-right-radius: 6px 50%;
      border-bottom-right-radius: 6px 50%;
      border-bottom-left-radius: 6px 50%;
      border-top-left-radius: 6px 50%;
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

  .c-clock__label {
    font-size: 1rem;
  }

  .c-clock__time {
    font-size: 3.5rem;
  }
</style>