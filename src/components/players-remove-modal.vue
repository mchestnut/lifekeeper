<template>
  <modal @close="closeModal" v-show="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Remove Players</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <div class="c-modal__button-list">
      <div v-for="(player, index) in cacheList" :key="index" class="o-icon-button" :class="{'o-icon-button--disabled': cacheList[index].remove}" :data-index="index">
        <v-touch @tap="onPlayerTap" class="o-icon-button__container">
          <div class="o-icon-button__icon o-icon-button__icon--minus"></div>
          <p class="o-icon-button__label">{{ player.name }}</p>
        </v-touch>
      </div>
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
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import menuBar from '@/components/menu-bar'
  import menuButton from '@/components/menu-button'
  import modal from '@/components/modal'

  export default {
    name: 'playersRemoveModal',
    components: {
      menuBar,
      menuButton,
      modal
    },
    computed: {
      ...mapState('players', [
        'currentPlayers'
      ]),
      ...mapState('playersRemoveModal', [
        'active',
        'cacheList'
      ])
    },
    methods: {
      ...mapMutations('playersRemoveModal', [
        'closeModal',
        'saveModal',
        'toggleRemove',
        'updateCacheList'
      ]),

      /*
      * On cancel button tap, close modal
      */
      onCancelTap: function (e) {
        this.closeModal()
      },

      /*
      * On player button tap, toggle for removal
      */
      onPlayerTap: function (e) {
        const rootNode = e.target.parentElement.parentElement
        const playerIndex = rootNode.dataset.index

        if (playerIndex !== undefined) {
          this.toggleRemove({playerIndex})
        }
      },

      /*
      * On save button tap, get list of players to remove and save modal
      */
      onSaveTap: function (e) {
        const removeList = this.cacheList.filter(player =>
          player.remove
        )

        this.saveModal({removeList})
        this.closeModal()
      }
    },
    watch: {
      currentPlayers: function () {
        this.updateCacheList({
          currentPlayers: this.currentPlayers
        })
      }
    }
  }
</script>

<style>
</style>