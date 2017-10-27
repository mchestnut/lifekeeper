<template>
  <card-shell class="c-player" v-bind:colors="player.colors">
    <card-name class="c-player__name" v-bind:colors="player.colors">
      <p>{{player.name}}</p>
    </card-name>

    <card-life class="c-player__life" v-bind:colors="player.colors">
      <p>{{player.life}}</p>
    </card-life>

    <card-button-life class="c-player__button-life c-player__button-life--minus" v-bind:player="player">
      <path d="M0,9.01H22.37V18.52H0Z"/>
    </card-button-life>

    <card-button-life class="c-player__button-life c-player__button-life--plus" v-bind:player="player">
      <path d="M0,9.51H9.51V0h6.43V9.51h9.51v6.43H15.94v9.51H9.51V15.94H0Z"/>
    </card-button-life>

    <card-name class="c-player__commander" v-bind:colors="player.colors">
      <p>{{player.commanders.primary}} {{player.commanders.secondary}}</p>
    </card-name>

    <card-damage class="c-player__damage" v-bind:colors="player.colors">
      <card-opponent v-for="(opponent, index) of player.damage" v-bind:key="index" class="c-player__opponent" v-bind:opponent="opponent.player" v-bind:playerColors="player.colors">
        <p slot="name">{{opponent.player.name}}</p>
        <p slot="primary">{{opponent.primary}}</p>
        <p slot="secondary">{{opponent.secondary}}</p>
      </card-opponent>
    </card-damage>

    <card-button-decked class="c-player__button-status c-player__button-status--decked" v-bind:player="player">
    </card-button-decked>

    <card-button-poison class="c-player__button-status c-player__button-status--poison" v-bind:player="player">
      {{player.poison}}
    </card-button-poison>
  </card-shell>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

import cardButtonDecked from '@/components/card-button-decked'
import cardButtonLife from '@/components/card-button-life'
import cardButtonPoison from '@/components/card-button-poison'
import cardDamage from '@/components/card-damage'
import cardLife from '@/components/card-life'
import cardName from '@/components/card-name'
import cardOpponent from '@/components/card-opponent'
import cardShell from '@/components/card-shell'

export default {
  name: 'player',
  components: {
    cardButtonDecked,
    cardButtonLife,
    cardButtonPoison,
    cardDamage,
    cardLife,
    cardName,
    cardOpponent,
    cardShell
  },
  props: [
    'index'
  ],
  computed: {
    ...mapState('players', [
      'currentPlayers'
    ]),
    player: function () {
      return this.currentPlayers[this.index]
    }
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
  @import '../assets/scss/variables.scss';

  .c-player {
    width: 100%;
    max-width: 24rem;
    padding: 1rem;
    z-index: 1;
  }

  .c-player__button-life,
  .c-player__button-status,
  .c-player__life,
  .c-player__opponent {
    cursor: pointer;
  }

  .c-player__name,
  .c-player__life,
  .c-player__commander,
  .c-player__damage {
    text-align: center;
    padding: 0.2rem;
  }

  .c-player__name {
    font-size: 2.4rem;
  }

  .c-player__life {
    font-family: $sans-serif;
    font-size: 10rem;
    font-weight: bold;
    width: 90%;
    margin: 4px auto;
  }

  .c-player__commander {
    font-size: 1.4rem;
  }

  .c-player__damage {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    min-height: 11rem;
    margin: 4px auto 1rem;
    padding-bottom: 1rem;
  }

  .c-player__opponent {
    font-size: 1.1rem;
    flex-basis: 45%;
    padding: 0.5rem;
  }

  .c-player__button-life {
    position: absolute;
    top: 8rem;
  }

  .c-player__button-status {
    position: absolute;
    bottom: 0.7rem;
  }

  .c-player__button-life--minus,
  .c-player__button-status--decked {
    left: .7rem;
  }

  .c-player__button-life--plus,
  .c-player__button-status--poison {
    right: .7rem;
  }
</style>
