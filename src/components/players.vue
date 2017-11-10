<template>
  <div class="c-players" :class="classModifier">
    <div v-for="(player, index) of currentPlayers" :key="index" class="c-players__wrapper">
      <div class="c-players__ratio">
        <player class="c-players__player" :index="index"></player>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import player from '@/components/player'

  export default {
    name: 'players',
    components: {
      player
    },
    computed: {
      ...mapState('players', [
        'currentPlayers'
      ]),
      classModifier: function () {
        return 'c-players--' + this.currentPlayers.length
      }
    }
  }
</script>

<style lang="scss">
  .c-players {
    display: grid;
    height: 100%;
    align-items: center;
    justify-items: center;
    align-content: center;
    justify-content: center;
  }

  .c-players__wrapper {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }

  .c-players__ratio {
    width: 34vmin;
    height: 40vmin;
    margin: auto;
  }

  .c-players--1 {
    grid-template-rows: auto;
    grid-template-columns: auto;
  }

  .c-players--2 {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, auto);
    grid-gap: 1rem;
  }

  .c-players--3 {
    grid-template-rows: repeat(4, auto);
    grid-template-columns: repeat(2, auto);
    grid-gap: 1rem;

    .c-players__wrapper:nth-child(1) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
    }

    .c-players__wrapper:nth-child(2) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 2;
    }

    .c-players__wrapper:nth-child(3) {
      grid-row-start: 3;
      grid-row-end: 5;
      grid-column-start: 2;
    }
  }

  .c-players--4 {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);

    .c-players__wrapper:nth-child(1) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
    }

    .c-players__wrapper:nth-child(2) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 2;
    }

    .c-players__wrapper:nth-child(3) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 3;
    }

    .c-players__wrapper:nth-child(4) {
      grid-row-start: 3;
      grid-row-end: 5;
      grid-column-start: 2;
    }
  }

  .c-players--5 {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, auto);

    .c-players__wrapper:nth-child(1) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
    }

    .c-players__wrapper:nth-child(2) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 2;
    }

    .c-players__wrapper:nth-child(3) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 3;
    }

    .c-players__wrapper:nth-child(4) {
      grid-row-start: 3;
      grid-row-end: 5;
      grid-column-start: 3;
    }

    .c-players__wrapper:nth-child(5) {
      grid-row-start: 3;
      grid-row-end: 5;
      grid-column-start: 2;
    }
  }

  .c-players--6 {
    grid-template-rows: 1fr 40vh 1fr 1fr 40vh 1fr;
    grid-template-columns: repeat(3, 1fr);

    .c-players__wrapper:nth-child(1) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
    }

    .c-players__wrapper:nth-child(2) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 2;
    }

    .c-players__wrapper:nth-child(3) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 3;
    }

    .c-players__wrapper:nth-child(4) {
      grid-row-start: 4;
      grid-row-end: 6;
      grid-column-start: 3;
    }

    .c-players__wrapper:nth-child(5) {
      grid-row-start: 5;
      grid-row-end: 7;
      grid-column-start: 2;
    }

    .c-players__wrapper:nth-child(6) {
      grid-row-start: 4;
      grid-row-end: 6;
      grid-column-start: 1;
    }
  }
</style>
