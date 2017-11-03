<template>
  <div class="c-clock">
    <clock-container>
      <p class="c-clock__label">Game Clock</p>
      <p class="c-clock__time">5:00:00</p>
    </clock-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import clockContainer from '@/components/clock-container'

  export default {
    name: 'clock',
    components: {
      clockContainer
    },
    computed: {
      ...mapState('clock', [
        'totalTime'
      ])
    }
  }
</script>

<style>
  .c-clock {
    width: 14rem;
    margin: 0 auto;
    position: relative;
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