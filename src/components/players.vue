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
  import {mapMutations, mapState} from 'vuex'
  import player from '@/components/player'

  export default {
    name: 'players',
    components: {
      player
    },
    mounted () {
      /*
      * TODO: Delete this
      */
      // this.addPlayer({
      //   name: 'Matt',
      //   colors: {
      //     dark: '#e2a307',
      //     light: '#e4d9d3',
      //     medium: '#bba66d',
      //     stroke: ['#e6e6e4', '#070506']
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Teysa, Orzhov Scion',
      //       nickname: 'Teysa',
      //       colors: ['w', 'b']
      //     },
      //     secondary: {
      //       name: '',
      //       nickname: '',
      //       colors: []
      //     }
      //   },
      //   position: 1
      // })
      
      // this.addPlayer({
      //   name: 'Chris',
      //   colors: {
      //     dark: '#bc1f00',
      //     light: '#fff8f9',
      //     medium: '#f7cfb6',
      //     stroke: '#da2933'
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Norin the Wary',
      //       nickname: 'Norin',
      //       colors: ['r']
      //     },
      //     secondary: {
      //       name: '',
      //       nickname: '',
      //       colors: []
      //     }
      //   },
      //   position: 2
      // })
      
      // this.addPlayer({
      //   name: 'Jake',
      //   colors: {
      //     dark: '#e2a307',
      //     light: '#e4d9d3',
      //     medium: '#bba66d',
      //     stroke: '#d2b768'
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Scion of the Ur-Dragon',
      //       nickname: 'Scion',
      //       colors: ['w', 'u', 'b', 'r', 'g']
      //     },
      //     secondary: {
      //       name: '',
      //       nickname: '',
      //       colors: []
      //     }
      //   },
      //   position: 3
      // })
      
      // this.addPlayer({
      //   name: 'Jonathan',
      //   colors: {
      //     dark: '#e2a307',
      //     light: '#e4d9d3',
      //     medium: '#bba66d',
      //     stroke: ['#067bc0', '#da2933']
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Kraum, Ludevic\'s Opus',
      //       nickname: 'Kraum',
      //       colors: ['u', 'r']
      //     },
      //     secondary: {
      //       name: 'Ludevic, Necro-Alchemist',
      //       nickname: 'Ludevic',
      //       colors: ['u', 'r']
      //     }
      //   },
      //   position: 4
      // })
      
      // this.addPlayer({
      //   name: 'Ruth',
      //   colors: {
      //     dark: '#396844',
      //     light: '#dfe9e0',
      //     medium: '#bfd7c9',
      //     stroke: '#057e4b'
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Oviya Pashiri, Sage Lifecrafter',
      //       nickname: 'Oviya Pashiri',
      //       colors: ['g']
      //     },
      //     secondary: {
      //       name: '',
      //       nickname: '',
      //       colors: []
      //     }
      //   },
      //   position: 2
      // })
      
      // this.addPlayer({
      //   name: 'Stephen',
      //   colors: {
      //     dark: '#e2d8c3',
      //     light: '#fefefc',
      //     medium: '#f6f5f0',
      //     stroke: '#e6e6e4'
      //   },
      //   commanders: {
      //     primary: {
      //       name: 'Eight-and-a-Half-Tails',
      //       nickname: 'Eight-and-Half',
      //       colors: ['w']
      //     },
      //     secondary: {
      //       name: '',
      //       nickname: '',
      //       colors: []
      //     }
      //   },
      //   position: 6
      // })
    },
    computed: {
      ...mapState('players', [
        'currentPlayers'
      ]),
      classModifier: function () {
        return 'c-players--' + this.currentPlayers.length
      }
    },
    methods: {
      ...mapMutations('players', [
        'addPlayer'
      ])
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
    margin: auto;
    transition: width 200ms;
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

  @media screen and (max-aspect-ratio: 15/10) {
    .c-players__ratio {
      width: 32vmin;
    }
  }
</style>
