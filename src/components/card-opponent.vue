<template>
  <div class="c-card-opponent">
    <div class="c-card-opponent__border-outer" v-bind:style="border"></div>
    <div class="c-card-opponent__texture"></div>
    <div class="c-card-opponent__background" v-bind:style="background"></div>
    <div class="c-card-opponent__border-inner"></div>
    
    <div class="c-card-opponent__content">
      <div class="c-card-opponent__name"><slot name="name"></slot></div>
      <div class="c-card-opponent__value"><slot name="primary"></slot></div>
      <div class="c-card-opponent__separator" v-show="opponent.commanders.secondary">/</div>
      <div class="c-card-opponent__value" v-show="opponent.commanders.secondary"><slot name="secondary"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cardOpponet',
    props: [
      'opponent',
      'playerColors'
    ],
    computed: {
      background: function () {
        return {backgroundColor: this.playerColors.light}
      },
      border: function () {
        if (typeof this.opponent.colors.stroke === 'string') {
          return {backgroundColor: this.opponent.colors.stroke}
        } else {
          const direction = 'to right, '
          const values = this.opponent.colors.stroke[0] + ', ' + this.opponent.colors.stroke[1]
          const gradient = 'linear-gradient(' + direction + values + ')'

          return {backgroundImage: gradient}
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-card-opponent {
    padding: 0.3rem 0.5rem;
    position: relative;
  }

  .c-card-opponent__background,
  .c-card-opponent__border-inner,
  .c-card-opponent__border-outer,
  .c-card-opponent__texture {
    position: absolute;
    z-index: -1;
  }

  .c-card-opponent__background,
  .c-card-opponent__border-inner,
  .c-card-opponent__texture {
    border: $unitStroke solid transparent;
    border-radius: $unitStroke * 3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .c-card-opponent__texture {
    background-image: url('../assets/img/texture.jpg');
    background-size: cover;
  }

  .c-card-opponent__background {
    opacity: 0.95;
  }

  .c-card-opponent__border-inner {
    border-color: black;
  }

  .c-card-opponent__border-outer {
    border-radius: $unitStroke * 4;
    top: $unitStroke * -1.5;
    right: $unitStroke * -1.5;
    bottom: $unitStroke * -1.5;
    left: $unitStroke * -1.5;
  }

  .c-card-opponent__content {
    display: flex;
    align-items: baseline;

    p {
      width: 100%; // Over-ride for slot p
    }
  }

  .c-card-opponent__name {
    text-align: left;
    flex-grow: 1;
    overflow: hidden;
  }

  .c-card-opponent__value {
    font-family: $sans-serif;
    font-size: 0.8em;
    font-weight: bold;
    text-align: center;
    display: flex;
  }
</style>
