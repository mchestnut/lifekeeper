<template>
  <modal v-show="active" v-on:close="closeModal">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Reorder Players</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <draggable class="c-modal__button-list" v-model="sortList" v-bind:options="{animation: 75}">
      <div class="o-icon-button"
           v-for="(player, index) in sortList"
           v-bind:key="index">
        <div class="o-icon-button__container">
          <div class="o-icon-button__icon o-icon-button__icon--drag"></div>
          <p class="o-icon-button__label">{{ player.name }}</p>
        </div>
      </div>
    </draggable>
    
    <div class="o-flex-row">
      <v-touch class="o-flex-row__item" v-on:tap="onSaveTap">
        <menu-button>Save</menu-button>
      </v-touch>

      <v-touch class="o-flex-row__item" v-on:tap="onCancelTap">
        <menu-button>Cancel</menu-button>
      </v-touch>
    </div>
  </modal>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapState } from 'vuex'

  import draggable from 'vuedraggable'
  import menuBar from '@/components/menu-bar'
  import menuButton from '@/components/menu-button'
  import modal from '@/components/modal'

  export default {
    name: 'playersReorderModal',
    components: {
      draggable,
      menuBar,
      menuButton,
      modal
    },
    computed: {
      ...mapState('players', [
        'currentPlayers'
      ]),
      ...mapState('playersReorderModal', [
        'active',
        'cacheList'
      ]),
      sortList: {
        get() {
          return this.cacheList
        },
        set(sortList) {
          this.updateCacheList({
            sortList
          })
        }
      }
    },
    methods: {
      ...mapMutations('playersReorderModal', [
        'closeModal',
        'saveModal',
        'toggleRemove',
        'resetCacheList',
        'updateCacheList'
      ]),

      /*
      * On cancel button tap, close modal
      */
      onCancelTap: function (e) {
        this.closeModal()
        this.resetCacheList({
          currentPlayers: this.currentPlayers
        })
      },

      /*
      * On save button tap, get list of players to reorder and save modal
      */
      onSaveTap: function (e) {
        this.saveModal({
          sortList: this.sortList
        })
        this.closeModal()
      }  
    },
    watch: {
      currentPlayers: function () {
        this.resetCacheList({
          currentPlayers: this.currentPlayers
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
</style>