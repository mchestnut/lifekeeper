<template>
  <modal @close="closeModal" v-if="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Change Commanders</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="commander-name">Commander name</label>
      <input @input="onCommanderChange('primary')" id="commander-name" class="o-form-field__input" type="text" v-model="args.commanders.primary.name" list="primary-list" v-focus/>
    </div>

    <div class="o-form-field">
      <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
      <input @input="onCommanderChange('secondary')" id="commander-2-name" class="o-form-field__input" type="text" v-model="args.commanders.secondary.name" list="secondary-list"/>
    </div>
    
    <div class="c-modal__button-row o-flex-row">
      <v-touch @tap="onSaveTap" class="o-flex-row__item">
        <menu-button :event="onSaveTap">Save</menu-button>
      </v-touch>

      <v-touch @tap="onCancelTap" class="o-flex-row__item">
        <menu-button :event="onCancelTap">Cancel</menu-button>
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
  import {mapMutations, mapState} from 'vuex'
  import {commanders} from '../mixins/commanders.js'
  import menuBar from '@/components/menu-bar'
  import menuButton from '@/components/menu-button'
  import modal from '@/components/modal'

  export default {
    name: 'playersCommanderModal',
    components: {
      menuBar,
      menuButton,
      modal
    },
    mixins: [
      commanders
    ],
    computed: {
      ...mapState('commanders', [
        'commandersList',
        'datalist'
      ]),
      ...mapState('playersCommanderModal', [
        'active',
        'args'
      ]),
      playersQty: function () {
        return this.currentPlayers.length + 1
      }
    },
    methods: {
      ...mapMutations('commanders', [
        'filterDatalist'
      ]),
      ...mapMutations('playersCommanderModal', [
        'closeModal',
        'saveModal'
      ]),

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
          commanderName: this.args.commanders[id].name,
          id: id
        })
      },

      /*
      * On save button tap, save modal
      */
      onSaveTap: function (e) {
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