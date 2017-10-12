<template>
  <div>
    <p>Main Menu</p>
    <modal v-bind:active="modalActive"></modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import modal from '@/components/modal'

export default {
  name: 'mainMenu',
  components: {
    modal
  },
  data () {
    return {
      active: false,
      modalActive: false
    }
  },
  methods: {
    ...mapMutations('clock', [
      'resetClock',
      'startClock',
      'stopClock'
    ]),
    ...mapMutations('log', [
      'resetLog'
    ]),
    ...mapMutations('players', [
      'addPlayer',
      'removePlayer',
      'reorderPlayers',
      'resetPlayers'
    ]),
    /*
    * On new game tap, resets game
    */
    onGameNewTap: function (e) {
      this.resetGame()
    },
    
    /*
    * On new game tap, resets game
    */
    onGameToggleTap: function (e) {
      this.toggleGame()
    },

    /*
    * On add players tap, open modal
    */
    onPlayersAddTap: function (e) {
      console.log('open modal');
    },

    /*
    * On remove players tap, open modal
    */
    onPlayersRemoveTap: function (e) {
      console.log('open modal');
    },

    /*
    * On reorder players tap, open modal
    */
    onPlayersReorderTap: function (e) {
      console.log('open modal');
    },

    /*
    * Resets game components
    */
    resetGame: function (e) {
      this.resetClock()
      this.resetLog()
      this.resetPlayers()
    },

    /*
    * Starts game and clock
    */
    startGame: function (e) {
      this.active = true
      this.startClock()
    },

    /*
    * Stops game and clock
    */
    stopGame: function (e) {
      this.active = false
      this.stopClock()
    },

    /*
    * Toggles game state and clock
    */
    toggleGame: function (e) {
      this.active = !this.active

      this.active ? this.startClock() : this.stopClock()
    },
  }
}
</script>

<style scoped>
</style>
