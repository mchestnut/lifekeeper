<template>
  <div class="c-main-menu">
    <menu-container>
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h3 class="c-main-menu__subheader">Game</h3>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-flex-row">
        <v-touch @tap="onGameNewTap" class="o-flex-row__item">
          <menu-button :class="newButtonClass">New</menu-button>
        </v-touch>
        <v-touch @tap="onGameToggleTap" class="o-flex-row__item">
          <menu-button>{{gameState}}</menu-button>
        </v-touch>
      </div>

      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h3 class="c-main-menu__subheader">Players</h3>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-flex-row">
        <v-touch @tap="onPlayersAddTap" class="o-flex-row__item">
          <menu-button :class="addButtonClass">Add</menu-button>
        </v-touch>
        <v-touch @tap="onPlayersReorderTap" class="o-flex-row__item">
          <menu-button :class="reorderButtonClass">Reorder</menu-button>
        </v-touch>
        <v-touch @tap="onPlayersRemoveTap" class="o-flex-row__item">
          <menu-button :class="removeButtonClass">Remove</menu-button>
        </v-touch>
      </div>
    </menu-container>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapState} from 'vuex'
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
    computed: {
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
      ...mapMutations('playersAddModal', {
        openPlayersAddModal: 'openModal'
      }),
      ...mapMutations('playersRemoveModal', {
        openPlayersRemoveModal: 'openModal'
      }),
      ...mapMutations('playersReorderModal', {
        openPlayersReorderModal: 'openModal'
      }),
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
        if (this.gameState != 'Stop') {
          this.resetGame()
        }
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
        if (this.currentPlayers.length !== this.maxPlayers) {
          this.openPlayersAddModal({
            callback: this.addPlayer
          })
        }
      },

      /*
      * On remove players tap, open modal
      */
      onPlayersRemoveTap: function (e) {
        if (this.currentPlayers.length > 0) {
          this.openPlayersRemoveModal({
            callback: this.removePlayer
          })
        }
      },

      /*
      * On reorder players tap, open modal
      */
      onPlayersReorderTap: function (e) {
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

<style>
  .c-main-menu {
    position: relative;
  }

  .c-main-menu__subheader {
    font-size: 1rem;
    text-align: center;
    width: 3rem;
    margin: 0 1rem;
  }
</style>