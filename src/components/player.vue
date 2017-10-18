<template>
  <div>
    <p>Player</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'player',
  computed: {
    ...mapState('players', [
      'currentPlayers',
      'maxPlayers'
    ])
  },
  methods: {
    ...mapMutations('log', [
      'addEntry'
    ]),
    ...mapMutations('players', [
      'setDamage',
      'setDecked',
      'setLife',
      'setPoison'
    ]),
    /*
    * On commander damage press, open modal
    */    
    onDamagePress: function (e) {
      console.log('open modal')
    },
    
    /*
    * On commander damage tap, increment damage and add log entry
    */
    onDamageTap: function (e) {
      this.setDamage()
      this.addEntry()
    },
    
    /*
    * On decked icon tap, toggle decked value and add log entry
    */
    onDeckedTap: function (e) {
      this.setDecked()
      this.addEntry()
    },
    
    /*
    * On life minus tap, decrement life total and add log entry
    */
    onLifeMinusTap: function (e) {
      this.setLife()
      this.addEntry()
    },
    
    /*
    * On life plus tap, increment life total and add log entry
    */
    onLifePlusTap: function (e) {
      this.setLife()
      this.addEntry()
    },
    
    /*
    * On life press, open modal
    */
    onLifePress: function (e) {
      console.log('open modal')
    },
    
    /*
    * On life tap, increment life total and add log entry
    */
    onLifeTap: function (e) {
      this.setLife()
      this.addEntry()
    },
    
    /*
    * On poison icon press, open modal
    */
    onPoisonPress: function (e) {
      console.log('open modal')
    },
    
    /*
    * On poison icon tap, increment life total and add log entry
    */
    onPoisonTap: function (e) {
      this.setPoison()
      this.addEntry()
    }
  }
}
</script>

<style lang="scss">
</style>
