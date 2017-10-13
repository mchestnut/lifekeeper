<template>
  <div class="o_view-main">
    <div class="o_view-main__players u-texture">
      <players></players>
    </div>
    <div class="o_view-main__menu u-texture">
      <clock></clock>
      <main-menu></main-menu>
      <log></log>
    </div>
  </div>
</template>

<script>
import clock from '@/components/clock'
import log from '@/components/log'
import mainMenu from '@/components/main-menu'
import players from '@/components/players'

export default {
  name: 'view-main',
  components: {
    clock,
    log,
    mainMenu,
    players
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .o_view-main {
    display: grid;
    grid-template-columns: 7fr 3fr;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .o_view-main__players {
    border-right: 1px solid;

    &::after {
      background-color: $grayMedium;
      opacity: .95;
    }
  }

  .o_view-main__menu {

    &::after {
      background-color: $grayDark;
      opacity: .95;
    }
  }

  @media screen and (max-aspect-ratio: 1/1) {
    .o_view-main {
      grid-template-columns: 1fr;
      grid-template-rows: 7fr 3fr;
    }

    .o_view-main__players {
      border-right: none;
      border-bottom: 1px solid;
    }
  }
</style>