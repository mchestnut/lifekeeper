<template>
  <div class="c-log">
    <menu-container class="c-log__menu">
      <div class="o-flex-row">
        <v-touch @tap="onTurnPrevious" class="c-log__button o-flex-row__item">
          <menu-button-left :event="onTurnPrevious" :class="previousButtonClass">Previous</menu-button-left>
        </v-touch>

        <div class="c-log__turn o-flex-row__item">
          Turn {{currentTurn + 1}}
        </div>

        <v-touch @tap="onTurnNext" class="c-log__button o-flex-row__item">
          <menu-button-right :event="onTurnNext">Next</menu-button-right>
        </v-touch>
      </div>
    </menu-container>

    <entries-container class="c-log__entries">
      <div v-for="(turn, index) of turns" :key="index" class="c-entry">
        <div class="c-entry__turn">
          <p>Turn {{index + 1}}</p>
        </div>
        <div class="c-entry__line">
          <p v-for="(entry, index) of turn" :key="index">{{entry.text}}</p>
        </div>
      </div>
    </entries-container>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import entriesContainer from '@/components/entries-container'
  import menuButtonLeft from '@/components/menu-button-left'
  import menuButtonRight from '@/components/menu-button-right'
  import menuContainer from '@/components/menu-container'

  export default {
    name: 'log',
    components: {
      entriesContainer,
      menuButtonLeft,
      menuButtonRight,
      menuContainer
    },
    mounted () {
      const root = this

      /*
      * Add key bindings to window
      */
      window.addEventListener('keyup', function(e) {
        if (root.modalVisible) {
          return
        }

        // Comma
        if (e.keyCode == 188) {
          root.onTurnPrevious()
        }

        // Period
        if (e.keyCode == 190) {
          root.onTurnNext()
        }
      })

      /*
      * Set initial turn
      */      
      this.setTurn({
        value: 0
      })
    },
    computed: {
      ...mapState([
        'modalVisible'
      ]),
      ...mapState('log', [
        'currentTurn',
        'turns'
      ]),
      previousButtonClass: function () {
        if (this.currentTurn == 0) {
          return 'c-menu-button--disabled'
        } else {
          return ''
        }
      }
    },
    methods: {
      ...mapActions('log', [
        'setTurn'
      ]),
      /*
      * On previous turn button, decrement turn
      */
      onTurnPrevious: function (e) {
        this.setTurn({
          value: this.currentTurn - 1
        })
      },

      /*
      * On next turn button, increment turn
      */
      onTurnNext: function (e) {
        this.setTurn({
          value: this.currentTurn + 1
        })
      }
    }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-log {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .c-log__menu {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .c-log__button {
    line-height: 0;
  }

  .c-log__turn {
    font-size: 1.6rem;
    text-align: center;
    flex-grow: 1;
  }

  .c-log__entries {
    margin: ($unitStroke * 2) 0.5rem 0;
  }

  .c-entry {
    display: flex;
    padding-right: 0.25rem;
    padding-left: 0.25rem;

    &:nth-child(2n + 1) {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  .c-entry__turn {
    flex-basis: 4em;
    flex-shrink: 0;
  }

  .c-entry__line {
    flex-grow: 1;
  }

  @media screen and (max-aspect-ratio: 16/10) {
    .c-log__turn { /* Move to new line */
      margin: 0.5rem 2rem 0;
      order: 3
    }
  }
</style>
