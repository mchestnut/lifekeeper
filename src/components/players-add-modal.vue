<template>
  <div>
    <modal v-show="active" v-on:close="closePlayersAddModal">
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h2 class="c-modal__header">Add Player</h2>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-form-field">
        <label class="o-form-field__label" for="player-name">Player name</label>
        <input class="o-form-field__input" id="player-name" type="text" v-model="args.name"/>
      </div>

      <div class="o-form-field">
        <label class="o-form-field__label" for="commander-name">Commander name</label>
        <input class="o-form-field__input" id="commander-name" type="text" v-model="args.commanders.primary" list="commander-list"/>
      </div>

      <v-touch class="o-flex-row" v-on:tap="onAddCommanderTap" v-show="secondaryCommander === false">
        <div class="o-flex-row__item c-modal__icon c-modal__icon--plus"></div>
        <p class="o-flex-row__item">Additional commander</p>
      </v-touch>

      <div class="o-form-field" v-show="secondaryCommander">
        <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
        <input class="o-form-field__input" id="commander-2-name" type="text"v-model="args.commanders.secondary"  list="commander-list"/>
      </div>

      <div class="o-form-field">
        <label class="o-form-field__label" for="player-position">Player position</label>
        <select class="o-form-field__input" id="player-position" v-model="args.position">
          <option v-for="(n, index) in playersQty" v-bind:key="index">{{ index + 1 }}</option>
        </select>
      </div>
      
      <div class="o-flex-row">
        <v-touch class="o-flex-row__item" v-on:tap="onSaveTap">
          <menu-button>Save</menu-button>
        </v-touch>

        <v-touch class="o-flex-row__item" v-on:tap="onCancelTap">
          <menu-button>Cancel</menu-button>
        </v-touch>
      </div>

      <datalist id="commander-list">
        <option v-for="(commander, index) in commanders" v-bind:key="index" v-bind:value="commander.name"/>
      </datalist>
    </modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

import menuBar from '@/components/menu-bar'
import menuButton from '@/components/menu-button'
import modal from '@/components/modal'

export default {
  name: 'playersAddModal',
  components: {
    menuBar,
    menuButton,
    modal
  },
  computed: {
    ...mapState('commanders', [
      'commanders'
    ]),
    ...mapState('players', [
      'currentPlayers'
    ]),
    ...mapState('playersAddModal', [
      'active',
      'args',
      'secondaryCommander'
    ]),
    playersQty: function () {
      return this.currentPlayers.length + 1
    }
  },
  methods: {
    ...mapMutations('playersAddModal', [
      'addCommanderPlayersAddModal',
      'closePlayersAddModal',
      'savePlayersAddModal',
    ]),

    /*
    * On add commander tap, show secondaryCommander
    */
    onAddCommanderTap: function (e) {
      this.addCommanderPlayersAddModal()
    },

    /*
    * On cancel button tap, close modal
    */
    onCancelTap: function (e) {
      this.closePlayersAddModal()
    },

    /*
    * On save button tap, save modal
    */
    onSaveTap: function (e) {
      this.savePlayersAddModal()
      this.closePlayersAddModal()
    }
  }
}
</script>

<style lang="scss">
</style>