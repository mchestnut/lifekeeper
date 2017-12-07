<template>
  <modal @close="close" @save="save" v-if="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Remove Players</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <div class="c-modal__button-list">
      <div v-for="(player, index) in cacheList" :key="index" class="o-icon-button" :class="{'o-icon-button--disabled': cacheList[index].remove}" :data-index="index">
        <v-touch @tap="toggle">
          <div class="o-icon-button__container" @keyup.space="toggle" v-focus="index == 0 ? true : false" tabindex="0">
            <div class="o-icon-button__icon o-icon-button__icon--minus"></div>
            <p class="o-icon-button__label">{{player.name}}</p>
          </div>
        </v-touch>
      </div>
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
  import {mapActions, mapMutations, mapState} from 'vuex'
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
      ...mapActions('playersRemoveModal', [
        'closeModal'
      ]),
      ...mapMutations('playersRemoveModal', [
        'saveModal',
        'toggleRemove',
        'updateCacheList'
      ]),

      /*
      * Close the modal
      */
      close: function () {
        this.closeModal()
      },

      /*
      * Get list of players to remove, save, and close modal
      */
      save: function () {
        const removeList = this.cacheList.filter(player =>
          player.remove
        )

        this.saveModal({removeList})
        this.closeModal()
      },

      /*
      * Toggle player for removal
      */
      toggle: function (e) {
        let rootNode = e.target
        let playerIndex

        // while (rootNode.clas)
        while (rootNode.dataset.index === undefined) {
          rootNode = rootNode.parentElement
        }

        playerIndex = rootNode.dataset.index

        if (playerIndex !== undefined) {
          this.toggleRemove({playerIndex})
        }
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