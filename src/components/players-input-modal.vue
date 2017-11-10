<template>
  <div>
    <modal @close="closeModal" v-show="active">
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h2 class="c-modal__header">{{header}}</h2>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div v-for="(field, index) of fields" :key="index" class="o-form-field">
        <label class="o-form-field__label" :for="'field-' + index">{{field.label}}</label>
        <input class="o-form-field__input" :id="'field-' + index" type="text" v-model="field.value"/>
      </div>
      
      <div class="o-flex-row">
        <v-touch @tap="onSaveTap" class="o-flex-row__item">
          <menu-button>Save</menu-button>
        </v-touch>

        <v-touch @tap="onCancelTap" class="o-flex-row__item">
          <menu-button>Cancel</menu-button>
        </v-touch>
      </div>
    </modal>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
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

<style>
</style>