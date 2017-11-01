<template>
  <div>
    <modal v-show="active" v-on:close="closeModal">
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h2 class="c-modal__header">{{header}}</h2>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-form-field" v-for="(field, index) of fields" v-bind:key="index">
        <label class="o-form-field__label" v-bind:for="'field-' + index">{{field.label}}</label>
        <input class="o-form-field__input" v-bind:id="'field-' + index" type="text" v-model="field.value"/>
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
    name: 'playersInputModal',
    components: {
      menuBar,
      menuButton,
      modal
    },
    computed: {
      ...mapState('players', [
        'currentPlayers'
      ]),
      ...mapState('playersInputModal', [
        'active',
        'header',
        'fields'
      ])
    },
    methods: {
      ...mapMutations('playersInputModal', [
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
  @import '../assets/scss/variables.scss';
  
</style>