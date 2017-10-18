<template>
  <div>
    <p>Log</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'log',
  computed: {
    ...mapState('log', [
      'currentTurn',
      'turns'
    ])
  },
  methods: {
    ...mapMutations('log', [
      'setTurn'
    ]),
    /*
    * On previous turn tap, decrement turn
    */
    onTurnPreviousTap: function (e) {
      this.setTurn()
    },

    /*
    * On next turn tap, increment turn
    */
    onTurnNextTap: function (e) {
      this.setTurn()
    }
  }
}
</script>

<style lang="scss">
</style>
