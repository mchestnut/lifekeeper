<template>
  <div class="c-entries-container">
    <v-touch @pan="onEntriesContainerPan" class="c-entries-container__wrapper">
      <div class="c-entries-container__content" :style="{transform: entriesTransform}"><slot></slot></div>
    </v-touch>
    <div class="c-entries-container__border-outer"></div>
    <div class="c-entries-container__texture"></div>
    <div class="c-entries-container__background"></div>
    <div class="c-entries-container__border-inner"></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'entriesContainer',
    computed: {
      ...mapState('log', [
        'transform'
      ]),
      entriesTransform: function () {
        return 'translateY(' + this.transform.actual + '%)'
      }
    },
    methods: {
      ...mapMutations('log', [
        'setTransform',
        'setTransformMax'
      ]),

      /*
      * On entries container pan, set transform to distance panned
      */      
      onEntriesContainerPan: function (e) {
        this.setTransformMax()

        if (e.eventType == 2) {
          this.setTransform({
            property: 'actual',
            value: e.deltaY + this.transform.stored
          })
        } else if (e.eventType == 4) {
          this.setTransform({
            property: 'stored',
            value: this.transform.actual
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  
  .c-entries-container {
    position: relative;
    z-index: 1;
  }

  .c-entries-container__wrapper {
    position: absolute;
    overflow: hidden;
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
  }

  .c-entries-container__content {
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: transform 250ms;
  }

  .c-entries-container__background,
  .c-entries-container__border-inner,
  .c-entries-container__border-outer,
  .c-entries-container__texture {
    position: absolute;
    z-index: -1;
  }

  .c-entries-container__background,
  .c-entries-container__border-inner,
  .c-entries-container__texture {
    border: $unitStroke solid transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: $unitStroke * 1.5;
    border-bottom-left-radius: $unitStroke * 1.5;
    border-top-left-radius: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-entries-container__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-entries-container__background {
    background-color: $grayStroke;
    opacity: 0.9;
  }

  .c-entries-container__border-inner {
    border-color: black;
  }

  .c-entries-container__border-outer {
    background-color: $grayStroke;
    border-top-right-radius: 0;
    border-bottom-right-radius: $unitStroke * 3;
    border-bottom-left-radius: $unitStroke * 3;
    border-top-left-radius: 0;
    top: $unitStroke * -2;
    right: $unitStroke * -2;
    bottom: $unitStroke * -2;
    left: $unitStroke * -2;
  }
</style>
