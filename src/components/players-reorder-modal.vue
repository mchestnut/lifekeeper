<template>
  <modal @close="close" @save="save" v-if="active">
    <div class="o-flex-row">
      <menu-bar></menu-bar>
      <h2 class="c-modal__header">Reorder Players</h2>
      <menu-bar class="u-flip-x"></menu-bar>
    </div>

    <draggable class="c-modal__button-list" v-model="sortList" :options="{animation: 75}">
      <div v-for="(player, index) in sortList" :key="index" class="o-icon-button">
        <div @keyup.down="onPlayerDown" @keyup.up="onPlayerUp" class="o-icon-button__container" :data-index="index" v-focus="index == 0 ? true : false" tabindex="0">
          <div class="o-icon-button__icon o-icon-button__icon--drag"></div>
          <p class="o-icon-button__label">{{player.name}}</p>
        </div>
      </div>
    </draggable>
    
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
      * Close the modal
      */
      close: function () {
        this.closeModal()
        this.resetCacheList({
          currentPlayers: this.currentPlayers
        })
      },

      /*
      * Move the selected player in the players list
      */      
      movePlayer: function (currentPosition, newPosition) {
        const buttonList = document.querySelector('.c-modal__button-list')
        let removed

        if (newPosition < 0 || newPosition > this.sortList.length - 1) {
          return
        }

        removed = this.sortList.splice(currentPosition, 1)
        this.sortList.splice(newPosition, 0, removed[0])
        
        buttonList.children[newPosition].children[0].focus()
      },

      /*
      * On down key, move player down in list
      */
      onPlayerDown: function (e) {
        const currentPosition = parseInt(e.target.dataset.index)
        const newPosition = currentPosition + 1

        this.movePlayer(currentPosition, newPosition)
      },

      /*
      * On up key, move player up in list
      */
      onPlayerUp: function (e) {
        const currentPosition = parseInt(e.target.dataset.index)
        const newPosition = currentPosition - 1

        this.movePlayer(currentPosition, newPosition)
      },

      /*
      * On save button tap, get list of players to reorder and save modal
      */
      save: function (e) {
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

<style>
</style>