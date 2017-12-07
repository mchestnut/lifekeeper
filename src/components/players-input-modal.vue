<template>
  <modal @close="close" @save="save" v-if="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">{{header}}</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <div v-for="(field, index) of fields" :key="index" class="o-form-field">
      <label class="o-form-field__label" :for="'field-' + index">{{field.label}}</label>
      <input class="o-form-field__input" :id="'field-' + index" type="text" v-model="field.value" v-focus="index == 0 ? true : false"/>
    </div>
    
    <div class="c-modal__button-row o-flex-row">
      <v-touch @tap="save" class="o-flex-row__item">
        <menu-button :event="save">Save</menu-button>
      </v-touch>

      <v-touch @tap="close" class="o-flex-row__item">
        <menu-button :event="close">Cancel</menu-button>
      </v-touch>
    </div>
  </modal>
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
      * Close the modal
      */
      close: function () {
        this.closeModal()
      },

      /*
      * Save and close the modal
      */
      save: function () {
        this.saveModal()
        this.closeModal()
      }
    }
  }
</script>

<style>
</style>