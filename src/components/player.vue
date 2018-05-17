<template>
  <card-shell class="c-player" :class="classModifier" :colors="player.colors">
    <card-name class="c-player__name" :colors="player.colors">
      <p>{{player.name}}</p>
    </card-name>

    <v-touch @tap="onLifeTap" @press="onLifePress" class="c-player__life">
      <card-life :colors="player.colors">
        <p class="t-burst" :class="transitionLife.class">{{player.life}}</p>
      </card-life>
    </v-touch>

    <v-touch @tap="onLifeMinusTap" class="c-player__button-life c-player__button-life--minus">
      <card-button-life :player="player">
        <path d="M0,9.01H22.37V18.52H0Z"/>
      </card-button-life>
    </v-touch>

    <v-touch @tap="onLifePlusTap" class="c-player__button-life c-player__button-life--plus">
      <card-button-life :player="player">
        <path d="M0,9.51H9.51V0h6.43V9.51h9.51v6.43H15.94v9.51H9.51V15.94H0Z"/>
      </card-button-life>
    </v-touch>

    <v-touch @press="onCommanderPress" class="c-player__commander">
      <card-name :colors="player.colors">
        <p>{{commanderNames}}</p>
      </card-name>
    </v-touch>

    <card-damage class="c-player__damage" :colors="player.colors">
      <v-touch v-for="(opponent, index) of player.damage" :key="index" @tap="onDamageTap" @press="onDamagePress" class="c-player__opponent">
        <card-opponent :data-index="index" :opponent="opponent.player" :playerColors="player.colors">
          <p slot="name">{{opponent.player.name}}</p>
          <p slot="primary">{{opponent.primary}}</p>
          <p slot="secondary">{{opponent.secondary}}</p>
        </card-opponent>
      </v-touch>
    </card-damage>

    <v-touch @tap="onDeckedTap" class="c-player__button-status c-player__button-status--decked">
      <card-button-decked :player="player">
      </card-button-decked>
    </v-touch>

    <v-touch @tap="onPoisonTap" @press="onPoisonPress" class="c-player__button-status c-player__button-status--poison">
      <card-button-poison :player="player">
        {{player.poison}}
      </card-button-poison>
    </v-touch>
  </card-shell>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
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
    data: function() {
      return {
        transitionLife: {
          class: '',
          timeout: null
        }
      }
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
      commanderNames: function () {
        if (this.player.commanders.secondary.name) {
          const primary = this.player.commanders.primary.nickname
          const secondary = this.player.commanders.secondary.nickname

          return primary + ' / ' + secondary
        } else {
          return this.player.commanders.primary.name
        }
      },
      player: function () {
        return this.currentPlayers[this.index]
      }
    },
    methods: {
      ...mapActions('log', [
        'setEntry'
      ]),
      ...mapMutations('players', [
        'setCommanders',
        'setDamage',
        'setDecked',
        'setDead',
        'setLife',
        'setPoison'
      ]),
      ...mapActions('playersCommanderModal', {
        openPlayerCommanderModal: 'openModal'
      }),
      ...mapActions('playersInputModal', [
        'openModal'
      ]), 

      /*
      * Checks if player is dead and adds log entry on change
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

        if (isDead != this.player.dead) {
          const args = {
            currentPlayers: this.currentPlayers,
            playerIndex: this.index,
            property: 'dead',
            startValue: this.player.dead,
            value: isDead
          }

          this.setDead(args)
          this.setEntry(args)
        }
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
      * On commander name press, open player commander modal
      */
      onCommanderPress: function (e) {
        const root = this

        const callback = function (args) {
          root.setCommanders(args)
        }

        this.openPlayerCommanderModal({
          args: {
            commanders: {
              primary: {
                name: this.player.commanders.primary.name
              },
              secondary: {
                name: this.player.commanders.secondary.name
              }
            },
            playerIndex: this.index
          },
          callback: callback
        })
      },

      /*
      * On commander damage press, open modal
      */    
      onDamagePress: function (e) {
        const opponentIndex = this.getOpponentIndex(e.target)

        this.setDamageModal(opponentIndex)
      },
      
      /*
      * On commander damage tap, find index of target, then increment damage
      * and add log entry, unless opponent has two commanders, then open modal
      */
      onDamageTap: function (e) {
        const opponentIndex = this.getOpponentIndex(e.target)
        const opponent = this.player.damage[opponentIndex]

        if (!opponent.player.commanders.secondary.name) {
          this.setProperty({
            commander: 'primary',
            opponentIndex: opponentIndex,
            property: 'damage', 
            value: opponent.primary + 1
          })
        } else {
          this.setDamageModal(opponentIndex)
        }
      },
      
      /*
      * On decked icon tap, toggle decked value and add log entry
      */
      onDeckedTap: function (e) {
        this.setProperty({
          property: 'decked', 
          value: !this.player.decked
        })
      },
      
      /*
      * On life minus tap, decrement life total and add log entry
      */
      onLifeMinusTap: function (e) {
        this.setProperty({
          property: 'life', 
          value: this.player.life - 1
        })
      },
      
      /*
      * On life plus tap, increment life total and add log entry
      */
      onLifePlusTap: function (e) {
        this.setProperty({
          property: 'life', 
          value: this.player.life + 1
        })
      },
      
      /*
      * On life press, open modal
      */
      onLifePress: function (e) {
        this.setModal('life', 'Set Life', 'Life total')
      },
      
      /*
      * On life tap, decrement life total and add log entry
      */
      onLifeTap: function (e) {
        this.setProperty({
          property: 'life', 
          value: this.player.life - 1
        })
      },
      
      /*
      * On poison icon press, open modal
      */
      onPoisonPress: function (e) {
        this.setModal('poison', 'Set Poison', 'Poison total')
      },
      
      /*
      * On poison icon tap, increment life total and add log entry
      */
      onPoisonTap: function (e) {
        this.setProperty({
          property: 'poison', 
          value: this.player.poison + 1
        })
      },

      /*
      * Sets modal arguments and opens modal for commander damage
      */
      setDamageModal: function (opponentIndex) {
        const root = this
        const fieldArgs = []
        const opponent = this.player.damage[opponentIndex]

        fieldArgs.push({
          commander: 'primary',
          label: opponent.player.commanders.primary.name,
          opponentIndex: opponentIndex,
          property: 'damage',
          value: opponent.primary
        })

        if (opponent.player.commanders.secondary.name) {
          fieldArgs.push({
          commander: 'secondary',
          label: opponent.player.commanders.secondary.name,
          opponentIndex: opponentIndex,
          property: 'damage',
          value: opponent.secondary
          })
        }

        const callback = function (args) {
          root.setProperty(args)
        }

        const validation = function (args) {
          return root.validateProperty(args)
        }

        this.openModal({
          callback: callback,
          fields: fieldArgs,
          header: 'Commander Damage',
          validation: validation
        })
      },

      /*
      * Sets modal arguments, opens modal, and passes setProperty callback
      */
      setModal: function (property, header, label) {
        const root = this
        const fieldArgs = [{
          label: label,
          property: property,
          value: this.player[property]
        }]

        const callback = function (args) {
          root.setProperty(args)
        }

        const validation = function (args) {
          return root.validateProperty(args)
        }

        this.openModal({
          callback: callback,
          fields: fieldArgs,
          header: header,
          validation: validation
        })
      },
      
      /*
      * Calls a set property mutation, adds a log entry, and checks if dead
      */
      setProperty: function (args) {
        let setMutation = null

        args.currentPlayers = this.currentPlayers

        if (args.playerIndex === undefined) {
          args.playerIndex = this.index
        }

        switch (args.property) {
          case 'damage':
            setMutation = this.setDamage
            args.startValue = this.player.damage[args.opponentIndex][args.commander]
            break
          case 'decked':
            setMutation = this.setDecked
            args.startValue = this.player.decked
            break
          case 'life':
            setMutation = this.setLife
            args.startValue = this.player.life
            break
          case 'poison':
            setMutation = this.setPoison
            args.startValue = this.player.poison
            break
        }

        setMutation(args)

        if (args.startValue != args.value) {
          this.setEntry(args)
        }

        this.checkDead()
      },

      /*
      * Validates if passed value is a number or equation
      */
      validateProperty: function (args) {
        const basicRegex = RegExp('[^\\d\\+\\-\\*\\/]')
        const leadingRegex = RegExp('\\b(?:0*(0\\.\\d+)|0+)', 'g')
        const mathRegex = RegExp('(^\\*|^\\/|\\D$)')
        const whitespaceRegex = RegExp('\\s+', 'g')

        // Remove leading zeros and whitespace
        if (typeof args.value === 'string') {
          args.value = args.value.replace(leadingRegex, '$1')
          args.value = args.value.replace(whitespaceRegex, '')
        }

        // Set empty value to 0
        if (args.value == '') {
          args.value = 0
        }

        // Test if value contains non-digits or basic math symbols
        if (basicRegex.test(args.value)) {
          return false
        }

        // If equation, evaluate
        if (Number.isInteger(args.value) === false) {
          if (mathRegex.test(args.value)) {
            return false
          } else {
            args.value = Math.round(eval(args.value))
          }
        }

        return true
      }
    },
    watch: {
      'player.life': function () {
        const root = this

        clearTimeout(this.transitionLife.timeout)
        this.transitionLife.class = 't-burst-enter'

        this.transitionLife.timeout = setTimeout(function() {
          root.transitionLife.class = 't-burst-leave'
        }, 50)
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
  .c-player__commander,
  .c-player__life,
  .c-player__opponent {
    cursor: pointer;
  }

  .c-player__name,
  .c-player__life,
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
    font-size: 1rem;
    text-align: center;
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
    transition: font-size 200ms;
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

  @media screen and (max-aspect-ratio: 15/10) {
    .c-player__opponent {
      font-size: 0.7rem;
    }
  }
</style>
