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
        <input class="o-form-field__input" id="player-name" type="text"/>
      </div>

      <div class="o-form-field">
        <label class="o-form-field__label" for="commander-name">Commander name</label>
        <input class="o-form-field__input" id="commander-name" type="text" list="commander-list"/>
      </div>

      <v-touch class="o-flex-row" v-on:tap="onAddCommanderTap" v-show="commander2 === false">
        <div class="o-flex-row__item c-modal__icon c-modal__icon--plus"></div>
        <p class="o-flex-row__item">Additional commander</p>
      </v-touch>

      <div class="o-form-field" v-show="commander2">
        <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
        <input class="o-form-field__input" id="commander-2-name" type="text" list="commander-list"/>
      </div>

      <datalist id="commander-list">
        <option value="Freyalise, Llanowar's Fury"/>
        <option value="Karador, Ghost Chieftan"/>
        <option value="Marchesa, the Black Rose"/>
        <option value="Queen Marchesa"/>
        <option value="Sigarda, Heron's Grace"/>
        <option value="Sigarda, Host of Herons"/>
        <option value="The Locust God"/>
        <option value="The Scarab God"/>
        <option value="The Scorpion God"/>
      </datalist>

      <div class="o-form-field">
        <label class="o-form-field__label" for="player-position">Player position</label>
        <select class="o-form-field__input" id="player-position">
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
    ...mapState('players', [
      'currentPlayers'
    ]),
    ...mapState('playersAddModal', [
      'active',
      'args',
      'commander2'
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
    * On add commander tap, show commander2
    */
    onAddCommanderTap: function (e) {
      this.addCommanderPlayersAddModal()
    },

    /*
    * On cancel button tap, close modal
    */
    onCancelTap: function (e) {
      this.commander2 = false
      this.closePlayersAddModal()
    },

    /*
    * On save button tap, save modal
    */
    onSaveTap: function (e) {
      this.commander2 = false
      this.savePlayersAddModal()
      this.closePlayersAddModal()
    }
  }
}
</script>

<style lang="scss">
</style>