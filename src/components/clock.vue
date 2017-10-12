<template>
  <div>
    <p>Clock</p>
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

<style scoped>
</style>
