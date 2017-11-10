<template>
  <div class="c-view-main">
    <div class="c-view-main__background"></div>
    <div class="c-view-main__players">
      <players></players>
    </div>
    <div class="c-view-main__sidebar c-view-sidebar">
      <clock class="c-view-sidebar__clock"></clock>
      <main-menu class="c-view-sidebar__main-menu"></main-menu>
      <log class="c-view-sidebar__log"></log>
    </div>
    <div class="c-view-main__modals">
      <players-add-modal></players-add-modal>
      <players-commander-modal></players-commander-modal>
      <players-input-modal></players-input-modal>
      <players-remove-modal></players-remove-modal>
      <players-reorder-modal></players-reorder-modal>
    </div>
  </div>
</template>

<script>
import clock from '@/components/clock'
import log from '@/components/log'
import mainMenu from '@/components/main-menu'
import players from '@/components/players'
import playersAddModal from '@/components/players-add-modal'
import playersCommanderModal from '@/components/players-commander-modal'
import playersInputModal from '@/components/players-input-modal'
import playersRemoveModal from '@/components/players-remove-modal'
import playersReorderModal from '@/components/players-reorder-modal'

export default {
  name: 'view-main',
  components: {
    clock,
    log,
    mainMenu,
    players,
    playersAddModal,
    playersCommanderModal,
    playersInputModal,
    playersRemoveModal,
    playersReorderModal
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-view-main,
  .c-view-main__background,
  .c-view-main__modals {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-view-main {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .c-view-main__background {
    z-index: -1;
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-view-main__players,
  .c-view-main__sidebar {
    padding: 1rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      opacity: 0.95;
    }
  }

  .c-view-main__players {
    border-right: $unitStroke solid;

    &::after {
      background-color: $grayMedium;
    }
  }

  .c-view-main__sidebar {
    width: 23rem;

    &::after {
      background-color: $grayDark;
    }
  }

  .c-view-sidebar {
    display: grid;
    grid-gap: 1rem;
    grid-template-rows: auto auto 1fr;
  }
</style>