<template>
  <div>
    <div class="c-main-menu">
      <menu-container>
        <div class="o-flex-row">
          <menu-bar></menu-bar>
          <h3 class="c-main-menu__subheader">Game</h3>
          <menu-bar class="u-flip-x"></menu-bar>
        </div>

        <div class="o-flex-row">
          <v-touch class="o-flex-row__item" v-on:tap="onGameNewTap">
            <menu-button>New</menu-button>
          </v-touch>
          <v-touch class="o-flex-row__item" v-on:tap="onGameToggleTap">
            <menu-button>{{active ? 'Stop' : 'Start'}}</menu-button>
          </v-touch>
        </div>

        <div class="o-flex-row">
          <menu-bar></menu-bar>
          <h3 class="c-main-menu__subheader">Players</h3>
          <menu-bar class="u-flip-x"></menu-bar>
        </div>

        <div class="o-flex-row">
          <v-touch class="o-flex-row__item" v-on:tap="onPlayersAddTap">
            <menu-button>Add</menu-button>
          </v-touch>
          <v-touch class="o-flex-row__item" v-on:tap="onPlayersReorderTap">
            <menu-button>Reorder</menu-button>
          </v-touch>
          <v-touch class="o-flex-row__item" v-on:tap="onPlayersRemoveTap">
            <menu-button>Remove</menu-button>
          </v-touch>
        </div>
      </menu-container>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

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
        strokeOuter: 'u-fill-gray-stroke'
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
        this.openPlayersAddModal({
          callback: this.addPlayer
        })
      },

      /*
      * On remove players tap, open modal
      */
      onPlayersRemoveTap: function (e) {
        this.openPlayersRemoveModal({
          callback: this.removePlayer
        })
      },

      /*
      * On reorder players tap, open modal
      */
      onPlayersReorderTap: function (e) {
        this.openPlayersReorderModal({
          callback: this.reorderPlayers
        })
      },

      /*
      * Resets game components
      */
      resetGame: function () {
        this.resetClock()
        this.resetLog()
        this.resetPlayers()
      },

      /*
      * Starts game and clock
      */
      startGame: function () {
        this.active = true
        this.startClock()
      },

      /*
      * Stops game and clock
      */
      stopGame: function () {
        this.active = false
        this.stopClock()
      },

      /*
      * Toggles game state and clock
      */
      toggleGame: function () {
        this.active = !this.active

        this.active ? this.startClock() : this.stopClock()
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
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