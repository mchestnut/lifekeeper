<template>
  <div class="c-players" v-bind:class="classModifier">
    <player v-for="(player, index) of currentPlayers" v-bind:key="index" v-bind:index="index"></player>
  </div>
</template>

<script>
import { mapMutations } from 'vuex' // TODO: Delete this
import { mapState } from 'vuex'

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
    this.addPlayer({
      name: 'Matt',
      colors: {
        dark: '#e2a307',
        light: '#e4d9d3',
        medium: '#bba66d',
        stroke: ['#e6e6e4', '#070506']
      },
      commanders: {
        primary: 'Teysa, Orzhov Scion',
        secondary: ''
      },
      position: 1
    })
    
    this.addPlayer({
      name: 'Chris',
      colors: {
        dark: '#bc1f00',
        light: '#fff8f9',
        medium: '#f7cfb6',
        stroke: '#da2933'
      },
      commanders: {
        primary: 'Norin the Wary',
        secondary: ''
      },
      position: 2
    })
    
    this.addPlayer({
      name: 'Jake',
      colors: {
        dark: '#e2a307',
        light: '#e4d9d3',
        medium: '#bba66d',
        stroke: '#d2b768'
      },
      commanders: {
        primary: 'Scion of the Ur-Dragon',
        secondary: ''
      },
      position: 1
    })
    
    this.addPlayer({
      name: 'Jonathan',
      colors: {
        dark: '#e2a307',
        light: '#e4d9d3',
        medium: '#bba66d',
        stroke: ['#067bc0', '#da2933']
      },
      commanders: {
        // primary: 'Kraum, Ludevic\'s Opus',
        // secondary: 'Ludevic, Necro-Alchemist'
        primary: 'Kraum',
        secondary: 'Ludevic'
      },
      position: 4
    })
    
    this.addPlayer({
      name: 'Ruth',
      colors: {
        dark: '#396844',
        light: '#dfe9e0',
        medium: '#bfd7c9',
        stroke: '#057e4b'
      },
      commanders: {
        primary: 'Oviya Pashiri, Sage Lifecrafter',
        secondary: ''
      },
      position: 2
    })
    
    this.addPlayer({
      name: 'Stephen',
      colors: {
        dark: '#e2d8c3',
        light: '#fefefc',
        medium: '#f6f5f0',
        stroke: '#e6e6e4'
      },
      commanders: {
        primary: 'Eight-and-a-Half-Tails',
        secondary: ''
      },
      position: 6
    })
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
      'addPlayer' // TODO: Delete this
    ])
  }
}
</script>

<style lang="scss">
  .c-players {
    display: grid;
    grid-gap: 1rem;
    align-items: center;
    justify-items: center;
  }

  .c-players--1 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  .c-players--2 {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
  }

  .c-players--3 {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
  }

  .c-players--4 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  .c-players--5 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  .c-players--6 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
</style>
