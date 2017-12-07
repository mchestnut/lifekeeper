<template>
  <modal @close="close" @save="save" v-if="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Add Player</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="player-name">Player name</label>
      <input class="o-form-field__input" id="player-name" type="text" v-model="args.name" v-focus/>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="commander-name">Commander name</label>
      <input @input="onCommanderChange('primary')" id="commander-name" class="o-form-field__input" type="text" v-model="args.commanders.primary.name" list="primary-list"/>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
      <input @input="onCommanderChange('secondary')" id="commander-2-name" class="o-form-field__input" type="text" v-model="args.commanders.secondary.name" list="secondary-list"/>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="player-position">Player position</label>
      <select id="player-position" class="o-form-field__input" v-model="args.position">
        <option v-for="n in playersQty" :key="n">{{n}}</option>
      </select>
    </div>
    
    <div class="c-modal__button-row o-flex-row">
      <v-touch @tap="save" class="o-flex-row__item">
        <menu-button :event="save">Save</menu-button>
      </v-touch>

      <v-touch @tap="close" class="o-flex-row__item">
        <menu-button :event="close">Cancel</menu-button>
      </v-touch>
    </div>

    <datalist id="primary-list">
      <option v-for="(commander, index) in datalist.primary" :key="index" :value="commander.name"/>
    </datalist>

    <datalist id="secondary-list">
      <option v-for="(commander, index) in datalist.secondary" :key="index" :value="commander.name"/>
    </datalist>
  </modal>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import {commanders} from '../mixins/commanders.js'
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
    updated: function () {
      if (!this.args.position) {
        this.setPosition({
          value: this.playersQty
        })
      }
    },
    computed: {
      ...mapState('commanders', [
        'commandersList',
        'datalist'
      ]),
      ...mapState('players', [
        'currentPlayers'
      ]),
      ...mapState('playersAddModal', [
        'active',
        'args'
      ]),
      playersQty: function () {
        return this.currentPlayers.length + 1
      }
    },
    mixins: [
      commanders
    ],
    methods: {
      ...mapMutations('commanders', [
        'filterDatalist'
      ]),
      ...mapActions('playersAddModal', [
        'closeModal'
      ]),
      ...mapMutations('playersAddModal', [
        'saveModal',
        'setPosition'
      ]),

      /*
      * Close the modal
      */
      close: function () {
        this.closeModal()
      },

      /*
      * On commander field change, filter commanders list
      */
      onCommanderChange: function (id) {
        this.filterDatalist({
          commandersList: this.commandersList,
          commanderName: this.args.commanders[id].name,
          id: id
        })
      },

      /*
      * Save and close the modal
      */
      save: function () {
        this.args.commanders = this.matchCommanders({
          commanders: this.args.commanders,
          commandersList: this.commandersList
        })

        this.args.colors = this.getPlayerColors({
          commanders: this.args.commanders
        })
        
        this.saveModal()
        this.closeModal()
      }
    }
  }
</script>

<style>  
</style>