<template>
  <div>
    <modal v-show="active" v-on:close="closeModal">
      <div class="o-flex-row">
        <menu-bar></menu-bar>
        <h2 class="c-modal__header">Remove Players</h2>
        <menu-bar class="u-flip-x"></menu-bar>
      </div>

      <div class="o-icon-button"
           v-bind:class="{'o-icon-button--disabled': cacheList[index].remove}"
           v-bind:data-index="index"
           v-for="(player, index) in cacheList"
           v-bind:key="index">
        <v-touch class="o-icon-button__container" v-on:tap="onPlayerTap">
          <div class="o-icon-button__icon o-icon-button__icon--minus"></div>
          <p class="o-icon-button__label">{{ player.name }}</p>
        </v-touch>
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

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
</style>