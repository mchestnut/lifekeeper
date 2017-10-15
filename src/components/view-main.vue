<template>
  <div class="c-view-main">
    <div class="c-view-main__players u-background-texture">
      <players></players>
    </div>
    <div class="c-view-main__menu u-background-texture">
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

  .c-view-main {
    display: grid;
    grid-template-columns: 7fr 3fr;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-view-main__players,
  .c-view-main__menu {
    padding: 10px;
  }

  .c-view-main__players {
    border-right: 1px solid;

    &::after {
      background-color: $grayMedium;
      opacity: .95;
    }
  }

  .c-view-main__menu {

    &::after {
      background-color: $grayDark;
      opacity: .95;
    }
  }

  @media screen and (max-aspect-ratio: 1/1) {
    .c-view-main {
      grid-template-columns: 1fr;
      grid-template-rows: 7fr 3fr;
    }

    .c-view-main__players {
      border-right: none;
      border-bottom: 1px solid;
    }
  }
</style>