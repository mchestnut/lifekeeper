<template>
  <div class="c-main-menu">
    <menu-container>
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h3 class="c-main-menu__subheader">Game</h3>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-flex-row">
        <v-touch @tap="onGameNew" class="o-flex-row__item">
          <menu-button :event="onGameNew" :class="newButtonClass">New</menu-button>
        </v-touch>
        <v-touch @tap="onGameToggle" class="o-flex-row__item">
          <menu-button :event="onGameToggle">{{gameState}}</menu-button>
        </v-touch>
      </div>

      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h3 class="c-main-menu__subheader">Players</h3>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-flex-row">
        <v-touch @tap="onPlayersAdd" class="o-flex-row__item">
          <menu-button :event="onPlayersAdd" :class="addButtonClass">Add</menu-button>
        </v-touch>
        <v-touch @tap="onPlayersReorder" class="o-flex-row__item">
          <menu-button :event="onPlayersReorder" :class="reorderButtonClass">Reorder</menu-button>
        </v-touch>
        <v-touch @tap="onPlayersRemove" class="o-flex-row__item">
          <menu-button :event="onPlayersRemove" :class="removeButtonClass">Remove</menu-button>
        </v-touch>
      </div>
    </menu-container>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import menuBar from '@/components/menu-bar'
  import menuButton from '@/components/menu-button'
  import menuContainer from '@/components/menu-container'

  export default {
    name: 'mainMenu',
    components: {
      menuBar,
      menuButton,
      menuContainer
    },
    data () {
      return {
        active: false,
        background: 'u-fill-gray-medium',
        gameState: 'Start',
        strokeOuter: 'u-fill-gray-stroke'
      }
    },
    mounted () {
      const root = this

      /*
      * Add key bindings to window
      */
      window.addEventListener('keyup', function(e) {
        if (root.modalVisible) {
          return
        }
        
        // n
        if (e.keyCode == 78) {
          root.onGameNew()
        }

        // Space
        if (e.keyCode == 32) {
          root.onGameToggle()
        }
        
        // a
        if (e.keyCode == 65) {
          root.onPlayersAdd()
        }

        // m
        if (e.keyCode == 77) {
          root.onPlayersReorder()
        }

        // r
        if (e.keyCode == 82) {
          root.onPlayersRemove()
        }
      })
    },
    computed: {
      ...mapState([
        'modalVisible'
      ]),
      ...mapState('players', [
        'currentPlayers',
        'maxPlayers'
      ]),
      addButtonClass: function () {
        if (this.currentPlayers.length == this.maxPlayers) {
          return 'c-menu-button--disabled'
        } else {
          return ''
        }
      },
      newButtonClass: function () {
        return this.gameState === 'Stop' ? 'c-menu-button--disabled' : ''
      },
      removeButtonClass: function () {
        if (this.currentPlayers.length === 0) {
          return 'c-menu-button--disabled'
        } else {
          return ''
        }
      },
      reorderButtonClass: function () {
        if (this.currentPlayers.length < 2) {
          return 'c-menu-button--disabled'
        } else {
          return ''
        }
      }
    },
    methods: {
      ...mapActions('log', [
        'resetLog'
      ]),
      ...mapMutations('clock', [
        'resetClock',
        'startClock',
        'stopClock'
      ]),
      ...mapActions('playersAddModal', {
        openPlayersAddModal: 'openModal'
      }),
      ...mapActions('playersRemoveModal', {
        openPlayersRemoveModal: 'openModal'
      }),
      ...mapActions('playersReorderModal', {
        openPlayersReorderModal: 'openModal'
      }),
      ...mapMutations('players', [
        'addPlayer',
        'removePlayer',
        'reorderPlayers',
        'resetPlayers'
      ]),
      /*
      * On new game button, resets game
      */
      onGameNew: function (e) {
        if (this.gameState != 'Stop') {
          this.resetGame()
        }
      },
      
      /*
      * On new game button, resets game
      */
      onGameToggle: function (e) {
        this.toggleGame()
      },

      /*
      * On add players button, open modal
      */
      onPlayersAdd: function (e) {
        if (this.currentPlayers.length !== this.maxPlayers) {
          this.openPlayersAddModal({
            callback: this.addPlayer
          })
        }
      },

      /*
      * On remove players button, open modal
      */
      onPlayersRemove: function (e) {
        if (this.currentPlayers.length > 0) {
          this.openPlayersRemoveModal({
            callback: this.removePlayer
          })
        }
      },

      /*
      * On reorder players button, open modal
      */
      onPlayersReorder: function (e) {
        if (this.currentPlayers.length > 1) {
          this.openPlayersReorderModal({
            callback: this.reorderPlayers
          })
        }
      },

      /*
      * Resets game components
      */
      resetGame: function () {
        this.gameState = 'Start'
        this.resetClock()
        this.resetLog()
        this.resetPlayers()
      },

      /*
      * Toggles game state and clock
      */
      toggleGame: function () {
        switch (this.gameState) {
          case 'Start':
            this.gameState = 'Stop'
            this.startClock()
            break
          case 'Stop':
            this.gameState = 'Resume'
            this.stopClock()
            break
          case 'Resume':
            this.gameState = 'Stop'
            this.startClock()
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .c-main-menu {
    position: relative;
  }

  .c-main-menu__subheader {
    font-size: 1rem;
    text-align: center;
    width: 3rem;
    margin: 0 1rem;
  }

  @media screen and (max-aspect-ratio: 14/10) {
    .c-main-menu__subheader { /* Move to new line */
      margin: 0.5rem 2.5rem 0;
      order: 3;
    }
  }
</style>