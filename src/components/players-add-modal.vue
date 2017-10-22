<template>
  <div>
    <modal v-show="active" v-on:close="closeModal">
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
        <input class="o-form-field__input" id="commander-name" type="text" v-model="args.commanders.primary" v-on:input="onCommanderChange('primary')" list="primary-list"/>
      </div>

      <div class="o-icon-button" v-show="secondaryCommander === false">
        <v-touch class="o-icon-button__container" v-on:tap="onAddCommanderTap">
          <div class="o-icon-button__icon o-icon-button__icon--plus"></div>
          <p class="o-icon-button__label">Add second commander</p>
        </v-touch>
      </div>

      <div class="o-form-field" v-show="secondaryCommander">
        <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
        <input class="o-form-field__input" id="commander-2-name" type="text"v-model="args.commanders.secondary" v-on:input="onCommanderChange('secondary')"  list="secondary-list"/>
      </div>

      <div class="o-form-field">
        <label class="o-form-field__label" for="player-position">Player position</label>
        <select class="o-form-field__input" id="player-position" v-model="args.position">
          <option v-for="n in playersQty" v-bind:key="n">{{ n }}</option>
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

      <datalist id="primary-list">
        <option v-for="(commander, index) in datalist.primary" v-bind:key="index" v-bind:value="commander.name"/>
      </datalist>

      <datalist id="secondary-list">
        <option v-for="(commander, index) in datalist.secondary" v-bind:key="index" v-bind:value="commander.name"/>
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
      'commandersList'
    ]),
    ...mapState('players', [
      'currentPlayers'
    ]),
    ...mapState('playersAddModal', [
      'active',
      'args',
      'datalist',
      'secondaryCommander'
    ]),
    playersQty: function () {
      return this.currentPlayers.length + 1
    }
  },
  methods: {
    ...mapMutations('playersAddModal', [
      'addCommander',
      'closeModal',
      'filterDatalist',
      'saveModal',
    ]),

    /*
    * On add commander tap, show secondaryCommander
    */
    onAddCommanderTap: function (e) {
      this.addCommander()
    },

    /*
    * On cancel button tap, close modal
    */
    onCancelTap: function (e) {
      this.closeModal()
    },

    /*
    * On commander field change, filter commanders list
    */
    onCommanderChange: function (id) {
      this.filterDatalist({
        commandersList: this.commandersList,
        id: id
      })
    },

    /*
    * On save button tap, save modal
    */
    onSaveTap: function (e) {
      this.saveModal()
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
</style>