<template>
  <div class="c-modal">
    <v-touch class="c-modal__overlay" v-on:tap="onOverlayTap">
      <div></div>
    </v-touch>
    <div class="c-modal__content">
      <menu-container>
        <slot></slot>
      </menu-container>
    </div>
  </div>
</template>

<script>
import menuContainer from '@/components/menu-container'

export default {
  name: 'modal',
  components: {
    menuContainer
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    onOverlayTap: function (e) {
      this.close()
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-modal,
  .c-modal__overlay {    
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-modal {
    display: flex;
    text-align: center;
    z-index: 1000;
  }

  .c-modal__overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .c-modal__content {
    position: relative;
    width: 25rem;
    align-items: center;
    justify-content: center;
    margin: auto;
    z-index: 10;
  }

  .c-modal__header {
    margin-right: 1rem;
    margin-left: 1rem;
  }

  .c-modal__icon {
    font-size: 2rem;
    display: block;
    width: 2rem;
    height: 2rem;
    border: 2px solid;
    border-radius: 50%;
    background-color: $grayLight;

    &::after {
      display: block;
      margin-top: -0.2rem;
    }
  }

  .c-modal__icon--plus {

    &::after {
      content: '+';
    }
  }
</style>