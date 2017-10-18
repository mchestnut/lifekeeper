<template>
  <div>
    <player v-for="player of currentPlayers" v-bind:key="player.position"></player>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

import player from '@/components/player'

export default {
  name: 'players',
  components: {
    player
  },
  computed: {
    ...mapState('players', [
      'currentPlayers'
    ])
  }
}
</script>

<style lang="scss">
</style>
