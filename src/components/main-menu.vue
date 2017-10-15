<template>
  <div>
    <div class="c-main-menu">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533 241.75">
        <defs>
          <pattern id="main-menu-texture" patternUnits="userSpaceOnUse" width="533" height="533">
            <image xlink:href="../assets/img/texture.jpg" x="0" y="0" width="533" height="533"/>
          </pattern>
          <path id="main-menu-background" d="M529,9.18V232.57a5.09,5.09,0,0,1-5,5.18H9a5.09,5.09,0,0,1-5-5.18V9.18A5.09,5.09,0,0,1,9,4H524A5.09,5.09,0,0,1,529,9.18Z"/>
        </defs>
        
        <use v-bind:style="{fill: 'url(#main-menu-texture)'}" xlink:href="#main-menu-background"/>
        <use v-bind:class="background" class="u-opacity-95" xlink:href="#main-menu-background"/>
        <path d="M524,6a3.1,3.1,0,0,1,3,3.18V232.57a3.1,3.1,0,0,1-3,3.18H9a3.1,3.1,0,0,1-3-3.18V9.18A3.1,3.1,0,0,1,9,6H524m0-2H9A5.09,5.09,0,0,0,4,9.18V232.57a5.09,5.09,0,0,0,5,5.18H524a5.09,5.09,0,0,0,5-5.18V9.18A5.09,5.09,0,0,0,524,4Z"/>
        <path v-bind:class="strokeOuter" d="M524,4a5.09,5.09,0,0,1,5,5.18V232.57a5.09,5.09,0,0,1-5,5.18H9a5.09,5.09,0,0,1-5-5.18V9.18A5.09,5.09,0,0,1,9,4H524m0-4H9A9.1,9.1,0,0,0,0,9.18V232.57a9.1,9.1,0,0,0,9,9.18H524a9.1,9.1,0,0,0,9-9.18V9.18A9.1,9.1,0,0,0,524,0Z"/>
        
        <text class="c-main-menu__subheader" transform="translate(265 35)">Game</text>
        <polygon class="u-fill-gray-dark" transform="translate(147 30)" points="83 3 0 3 0 1.5 40 0 83 0 83 3"/>
        <polygon class="u-fill-gray-dark" transform="translate(300 30)" points="0 3 83 3 83 1.5 43 0 0 0 0 3"/>
        <text class="c-main-menu__subheader" transform="translate(265 158)">Players</text>
        <polygon class="u-fill-gray-dark" transform="translate(147 153)" points="83 3 0 3 0 1.5 40 0 83 0 83 3"/>
        <polygon class="u-fill-gray-dark" transform="translate(300 153)" points="0 3 83 3 83 1.5 43 0 0 0 0 3"/>
      </svg>

      <v-touch v-on:tap="onGameNewTap">
        <menu-button class="c-main-menu__button c-main-menu__button--new">New</menu-button>
      </v-touch>
      <v-touch v-on:tap="onGameToggleTap">
        <menu-button class="c-main-menu__button c-main-menu__button--toggle">{{ active ? 'Stop' : 'Start'}}</menu-button>
      </v-touch>

      <v-touch v-on:tap="onPlayersAddTap">
        <menu-button class="c-main-menu__button c-main-menu__button--add">Add</menu-button>
      </v-touch>
      <v-touch v-on:tap="onPlayersReorderTap">
        <menu-button class="c-main-menu__button c-main-menu__button--reorder">Reorder</menu-button>
      </v-touch>
      <v-touch v-on:tap="onPlayersRemoveTap">
        <menu-button class="c-main-menu__button c-main-menu__button--remove">Remove</menu-button>
      </v-touch>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import menuButton from '@/components/menu-button'

export default {
  name: 'mainMenu',
  components: {
    menuButton
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
      this.openModal()
    },

    /*
    * On remove players tap, open modal
    */
    onPlayersRemoveTap: function (e) {
      this.openModal()
    },

    /*
    * On reorder players tap, open modal
    */
    onPlayersReorderTap: function (e) {
      this.openModal()
    },

    /*
    * Opens modal and passes callback and arguments
    */
    openModal: function () {
      console.log('openModal')
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

<style lang="scss" scoped>
  .c-main-menu {
    position: relative;
  }

  .c-main-menu__subheader {
    font-size: 18px;
  }

  .c-main-menu__button {
    position: absolute;
    width: calc(135 / 533 * 100%);
    height: calc(48 / 242 * 100%);
  }

  .c-main-menu__button--new {
    top: calc(52 / 242 * 100%);
    left: calc(105 / 533 * 100%);
  }

  .c-main-menu__button--toggle {
    top: calc(52 / 242 * 100%);
    left: calc(292 / 533 * 100%);
  }

  .c-main-menu__button--add {
    top: calc(173 / 242 * 100%);
    left: calc(15 / 533 * 100%);
  }

  .c-main-menu__button--reorder {
    top: calc(173 / 242 * 100%);
    left: calc(199 / 533 * 100%);
  }

  .c-main-menu__button--remove {
    top: calc(173 / 242 * 100%);
    left: calc(382 / 533 * 100%);
  }
</style>