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
        <input class="o-form-field__input" id="commander-name" type="text" v-model="args.commanders.primary.name" v-on:input="onCommanderChange('primary')" list="primary-list"/>
      </div>

      <div class="o-icon-button" v-show="secondaryCommander === false">
        <v-touch class="o-icon-button__container" v-on:tap="onAddCommanderTap">
          <div class="o-icon-button__icon o-icon-button__icon--plus"></div>
          <p class="o-icon-button__label">Add second commander</p>
        </v-touch>
      </div>

      <div class="o-form-field" v-show="secondaryCommander">
        <label class="o-form-field__label" for="commander-2-name">Second commander name</label>
        <input class="o-form-field__input" id="commander-2-name" type="text"v-model="args.commanders.secondary.name" v-on:input="onCommanderChange('secondary')"  list="secondary-list"/>
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
      ...mapState('colors', [
        'definitions'
      ]),
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
      * Gets array of colors from both commanders
      */
      getCommanderColors: function () {
        const commanderColors = []

        function addColors (commander) {
          commander.colors.forEach(function (color) {
            let found = false

            // Check if color is already in the array
            commanderColors.forEach(function (setColor) {
              if (setColor === color) {
                found = true
              }
            })

            if (!found) {
              commanderColors.push(color)
            }
          })
        }

        addColors(this.args.commanders.primary)
        addColors(this.args.commanders.secondary)

        return commanderColors
      },

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
        this.setCommanders()
        this.setColors()
        this.saveModal()
        this.closeModal()
      },

      /*
      * Set player colors based on commander colors
      */
      setColors: function () {
        const colorNames = {
          w: 'white',
          u: 'blue',
          b: 'black',
          r: 'red',
          g: 'green'
        }

        const commanderColors = this.getCommanderColors()

        // Set based on quantity of colors
        if (commanderColors.length === 0) {
          this.args.colors = {
            dark: this.definitions['colorlessDark'],
            light: this.definitions['colorlessLight'],
            medium: this.definitions['colorlessMedium'],
            stroke: this.definitions['colorlessStroke']
          }
        } else if (commanderColors.length === 1) {
          const colorPrimary = colorNames[commanderColors[0]]

          this.args.colors = {
            dark: this.definitions[colorPrimary + 'Dark'],
            light: this.definitions[colorPrimary + 'Light'],
            medium: this.definitions[colorPrimary + 'Medium'],
            stroke: this.definitions[colorPrimary + 'Stroke']
          }
        } else if (commanderColors.length > 2) {
          this.args.colors = {
            dark: this.definitions['goldDark'],
            light: this.definitions['goldLight'],
            medium: this.definitions['goldMedium'],
            stroke: this.definitions['goldStroke']
          }
        } else {
          const colorPrimary = colorNames[commanderColors[0]] + 'Stroke'
          const colorSecondary = colorNames[commanderColors[1]] + 'Stroke'

          this.args.colors = {
            dark: this.definitions['goldDark'],
            light: this.definitions['goldLight'],
            medium: this.definitions['goldMedium'],
            stroke: [this.definitions[colorPrimary], this.definitions[colorSecondary]]
          }
        }
      },      

      /*
      * Sets the commanders if matched to list, else sets blank values
      */
      setCommanders: function () {
        const root = this

        this.commandersList.forEach(function (commander) {
          if (commander.name === root.args.commanders.primary.name) {
            root.args.commanders.primary = commander
          } else if (commander.name === root.args.commanders.secondary.name) {
            root.args.commanders.secondary = commander
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
</style>