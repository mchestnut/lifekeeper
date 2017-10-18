<template>
  <div class="c-view-main">
    <div class="c-view-main__players u-background-texture">
      <players></players>
    </div>
    <div class="c-view-main__sidebar c-view-sidebar u-background-texture">
      <clock class="c-view-sidebar__clock"></clock>
      <main-menu class="c-view-sidebar__main-menu"></main-menu>
      <log class="c-view-sidebar__log"></log>
    </div>
    <div class="c-view-main__modals">
      <players-add-modal></players-add-modal>
    </div>
  </div>
</template>

<script>
import clock from '@/components/clock'
import log from '@/components/log'
import mainMenu from '@/components/main-menu'
import players from '@/components/players'
import playersAddModal from '@/components/players-add-modal'

export default {
  name: 'view-main',
  components: {
    clock,
    log,
    mainMenu,
    players,
    playersAddModal
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-view-main {
    display: grid;
    grid-template-columns: auto 28rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-view-main__players,
  .c-view-main__sidebar {
    padding: 1rem;
  }

  .c-view-main__players {
    border-right: 1px solid;

    &::after {
      background-color: $grayMedium;
      opacity: 0.95;
    }
  }

  .c-view-main__sidebar {

    &::after {
      background-color: $grayDark;
      opacity: 0.95;
    }
  }

  .c-view-main__modals {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-view-sidebar {
    display: grid;
  }

  @media screen and (max-aspect-ratio: 1/1) {
    .c-view-main {
      grid-template-columns: auto;
      grid-template-rows: auto 22rem;
    }

    .c-view-main__players {
      border-right: none;
      border-bottom: 1px solid;
    }

    .c-view-sidebar {
      grid-template-rows: auto auto;
      grid-template-columns: 28rem 25rem;
    }

    .c-view-sidebar__main-menu {
      grid-column-start: 1;
      grid-row-start: 2;
    }
  }
</style>