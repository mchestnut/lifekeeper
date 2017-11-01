<template>
  <card-shell class="c-player" v-bind:class="classModifier" v-bind:colors="player.colors">
    <card-name class="c-player__name" v-bind:colors="player.colors">
      <p>{{player.name}}</p>
    </card-name>

    <v-touch v-on:tap="onLifeTap" v-on:press="onLifePress" class="c-player__life">
      <card-life v-bind:colors="player.colors">
        <p>{{player.life}}</p>
      </card-life>
    </v-touch>

    <v-touch v-on:tap="onLifeMinusTap" class="c-player__button-life c-player__button-life--minus">
      <card-button-life v-bind:player="player">
        <path d="M0,9.01H22.37V18.52H0Z"/>
      </card-button-life>
    </v-touch>

    <v-touch v-on:tap="onLifePlusTap" class="c-player__button-life c-player__button-life--plus">
      <card-button-life v-bind:player="player">
        <path d="M0,9.51H9.51V0h6.43V9.51h9.51v6.43H15.94v9.51H9.51V15.94H0Z"/>
      </card-button-life>
    </v-touch>

    <card-name class="c-player__commander" v-bind:colors="player.colors">
      <p>{{player.commanders.primary}} {{player.commanders.secondary}}</p>
    </card-name>

    <card-damage class="c-player__damage" v-bind:colors="player.colors">
      <v-touch v-for="(opponent, index) of player.damage" v-bind:key="index" v-on:tap="onDamageTap" v-on:press="onDamagePress" class="c-player__opponent">
        <card-opponent v-bind:data-index="index" v-bind:opponent="opponent.player" v-bind:playerColors="player.colors">
          <p slot="name">{{opponent.player.name}}</p>
          <p slot="primary">{{opponent.primary}}</p>
          <p slot="secondary">{{opponent.secondary}}</p>
        </card-opponent>
      </v-touch>
    </card-damage>

    <v-touch v-on:tap="onDeckedTap" class="c-player__button-status c-player__button-status--decked">
      <card-button-decked v-bind:player="player">
      </card-button-decked>
    </v-touch>

    <v-touch v-on:tap="onPoisonTap" v-on:press="onPoisonPress" class="c-player__button-status c-player__button-status--poison">
      <card-button-poison v-bind:player="player">
        {{player.poison}}
      </card-button-poison>
    </v-touch>
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
      classModifier: function () {
        return this.player.dead ? 'c-player--dead' : ''
      },
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
        'setDead',
        'setLife',
        'setPoison'
      ]),
      ...mapMutations('playersInputModal', [
        'openModal'
      ]), 


      /*
      * Checks if player is dead and adds log entry
      */
      checkDead: function (property) {
        let isDead = false

            this.player.damage.forEach(function (opponent) { 
              if (opponent.primary >= 21 || opponent.secondary >= 21) {
                isDead = true
              }
            })

            if (this.player.decked) {
              isDead = true
            }

            if (this.player.life <= 0) {
              isDead = true
            }

            if (this.player.poison >= 10) {
              isDead = true
            }


        const args = {
          index: this.index,
          property: 'dead',
          value: isDead
        }

        this.setDead(args)
        this.addEntry(args)
      },     

      /*
      * Finds the opponent index of the target
      */
      getOpponentIndex: function (origin) {
        let target = origin
        let index = null

        if (target.dataset.index) {
          return target.dataset.index
        } else {
          while (!index) {
            target = target.parentNode

            index = target.dataset.index
          }

          return index
        }
      },

      /*
      * On commander damage press, open modal
      */    
      onDamagePress: function (e) {
        const opponentIndex = this.getOpponentIndex(e.target)
        const opponent = this.player.damage[opponentIndex]

        this.openDamageModal(opponentIndex, opponent)
      },
      
      /*
      * On commander damage tap, find index of target, then increment damage
      * and add log entry, unless opponent has two commanders, then open modal
      */
      onDamageTap: function (e) {
        const opponentIndex = this.getOpponentIndex(e.target)
        const opponent = this.player.damage[opponentIndex]

        if (!opponent.player.commanders.secondary) {
          const args = {
            commander: 'primary',
            index: this.index,
            opponentIndex: opponentIndex,
            property: 'damage',
            value: opponent.primary + 1
          }

          this.setDamage(args)
          this.addEntry(args)
          this.checkDead()
        } else {
          this.openDamageModal(opponentIndex, opponent)
        }
      },
      
      /*
      * On decked icon tap, toggle decked value and add log entry
      */
      onDeckedTap: function (e) {
        const args = {
          index: this.index,
          property: 'decked',
          value: !this.player.decked
        }
        this.setDecked(args)
        this.addEntry(args)
        this.checkDead()
      },
      
      /*
      * On life minus tap, decrement life total and add log entry
      */
      onLifeMinusTap: function (e) {
        const args = {
          index: this.index,
          property: 'life',
          value: this.player.life - 1
        }

        this.setLife(args)
        this.addEntry(args)
        this.checkDead()
      },
      
      /*
      * On life plus tap, increment life total and add log entry
      */
      onLifePlusTap: function (e) {
        const args = {
          index: this.index,
          property: 'life',
          value: this.player.life + 1
        }

        this.setLife(args)
        this.addEntry(args)
        this.checkDead()
      },
      
      /*
      * On life press, open modal
      */
      onLifePress: function (e) {
        const root = this
        const fields = [{
            index: this.index,
            label: 'New life total',
            property: 'life',
            value: this.player.life
        }]

        const callback = function (args) {
          root.setLife(args)
          root.addEntry(args)
          root.checkDead()
        }

        this.openModal({
          callback: callback,
          fields: fields,
          header: 'Set Life'
        })
      },
      
      /*
      * On life tap, decrement life total and add log entry
      */
      onLifeTap: function (e) {
        const args = {
          index: this.index,
          property: 'life',
          value: this.player.life - 1
        }

        this.setLife(args)
        this.addEntry(args)
        this.checkDead()
      },
      
      /*
      * On poison icon press, open modal
      */
      onPoisonPress: function (e) {
        const root = this
        const fields = [{
            index: this.index,
            label: 'New poison total',
            property: 'poison',
            value: this.player.poison
        }]

        const callback = function (args) {
          root.setPoison(args)
          root.addEntry(args)
          root.checkDead()
        }

        this.openModal({
          callback: callback,
          fields: fields,
          header: 'Set Poison'
        })
      },
      
      /*
      * On poison icon tap, increment life total and add log entry
      */
      onPoisonTap: function (e) {
        const args = {
          index: this.index,
          property: 'poison',
          value: this.player.poison + 1
        }

        this.setPoison(args)
        this.addEntry(args)
        this.checkDead()
      },

      /*
      * Calls modal for commander damage
      */
      openDamageModal: function (opponentIndex, opponent) {
        const root = this
        let fields = []

        fields.push({
          commander: 'primary',
          index: this.index,
          label: 'New primary commander total',
          opponentIndex: opponentIndex,
          property: 'damage',
          value: opponent.primary
        })

        if (opponent.player.commanders.secondary) {
          fields.push({
            commander: 'secondary',
            index: this.index,
            label: 'New secondary commander total',
            opponentIndex: opponentIndex,
            property: 'damage',
            value: opponent.secondary
          })
        }

        const callback = function (args) {
          root.setDamage(args)
          root.addEntry(args)
          root.checkDead()
        }

        this.openModal({
          callback: callback,
          fields: fields,
          header: 'Set Commander Damage'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-player {
    padding: 1rem;
    z-index: 1;
  }

  .c-player--dead {
    opacity: 0.4;
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
    font-size: 2rem;
  }

  .c-player__life {
    font-family: $sans-serif;
    font-size: 7rem;
    font-weight: bold;
    margin: 0 1rem;
  }

  .c-player__commander {
    font-size: 1.1rem;
  }

  .c-player__damage {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    justify-content: space-around;
    min-height: 12vh;
    margin: ($unitStroke * 2)  1rem ($unitStroke * 5);
    padding-bottom: $unitStroke * 5;
  }

  .c-player__opponent {
    font-size: 0.8rem;
    flex-basis: 45%;
    margin: $unitStroke * 2;
  }

  .c-player__button-life {
    width: 2.25rem;
    position: absolute;
    top: 6rem;
  }

  .c-player__button-status {
    width: 4.5rem;
    position: absolute;
    bottom: 0.7rem;
  }

  .c-player__button-life--minus,
  .c-player__button-status--decked {
    left: 0.7rem;
  }

  .c-player__button-life--plus,
  .c-player__button-status--poison {
    right: 0.7rem;
  }
</style>
