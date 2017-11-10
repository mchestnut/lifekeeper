<template>
  <div class="c-clock">
    <clock-container>
      <p class="c-clock__label">Game Clock</p>
      <p class="c-clock__time">{{totalTime}}</p>
    </clock-container>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import clockContainer from '@/components/clock-container'

  export default {
    name: 'clock',
    components: {
      clockContainer
    },
    created: function () {
      this.resetClock()
    },
    computed: {
      ...mapState('clock', [
        'totalTime'
      ])
    },
    methods: {
      ...mapMutations('clock', [
        'resetClock'
      ])
    }
  }
</script>

<style>
  .c-clock__label,
  .c-clock__time {
    text-align: center;
    margin: 0;
  }

  .c-clock__time {
    font-size: 3rem;
  }
</style>