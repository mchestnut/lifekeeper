<template>
  <div @keyup.enter="save" @keyup.esc="close" class="c-modal">
    <v-touch class="c-modal__overlay" @tap="close">
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
      /*
      * Emits a close event
      */      
      close: function () {
        this.$emit('close')
      },

      /*
      * Emits a save event
      */
      save: function () {
        this.$emit('save')
      }
    }
  }
</script>

<style lang="scss">
  @keyframes shake {
    10%, 90% {
      transform: translate(-1px, 0);
    }
    
    20%, 80% {
      transform: translate(2px, 0);
    }

    30%, 50%, 70% {
      transform: translate(-4px, 0);
    }

    40%, 60% {
      transform: translate(4px, 0);
    }
  }

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

  .c-modal--invalid {

    .c-modal__content {
      animation: shake 500ms cubic-bezier(.36,.07,.19,.97) both;
      transform: translate(0, 0);
    }
  }

  .c-modal__overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .c-modal__content {
    position: relative;
    width: 28rem;
    align-items: center;
    justify-content: center;
    margin: auto;
    z-index: 10;
  }

  .c-modal__header {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  .c-modal__button-list {
    margin-top: 1rem;
  }

  .c-modal__button-row {
    margin-top: 2rem;
  }
</style>