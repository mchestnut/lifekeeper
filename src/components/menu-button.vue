<template>
  <button @keyup.enter="onEnter" class="c-menu-button">
    <svg class="c-menu-button__svg" viewBox="0 0 136.85 50">
      <path class="c-menu-button__stroke" d="M118.06,49c2,0,3.59-1.52,4.57-3l12.79-19a5,5,0,0,0,0-4L122.63,4c-1-1.46-2.59-3-4.57-3H18.79c-2,0-3.59,1.52-4.57,3L1.42,23a5,5,0,0,0,0,4L14.22,46c1,1.46,2.59,3,4.57,3Z"/>
      <text class="c-menu-button__label" transform="translate(68 32)"><slot></slot></text>
    </svg>
</button>
</template>

<script>
  export default {
    name: 'menuButton',
    props: [
      'event'
    ],
    methods: {
      /*
      * On enter, call passed event if defined
      */
      onEnter: function (e) {
        if (typeof this.event === 'function') {
          this.event()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .c-menu-button {
    font: inherit;
    line-height: 1;
    padding: 0;
    border: none;
    background-color: transparent;
    background-image: none;

    &:focus,
    &:hover {
      outline: none;

      .c-menu-button__svg {
        filter: drop-shadow(0 0 0.5rem $whiteLight)
      }
    }
  }
  
  .c-menu-button__svg {
    width: 6rem;
    cursor: pointer;
    transition: width 200ms;

    @media screen and (max-aspect-ratio: 15/10) {
      width: 5.5rem;
    }
  }

  .c-menu-button__label {
    font-size: 28px; /* Use px to scale in SVG */
  }

  .c-menu-button__stroke {
    fill: $grayLight;
    stroke: black;
    stroke-width: $unitStroke;
  }

  .c-menu-button--disabled {
    fill: $grayDark;
    opacity: 0.8;
    cursor: default;

    .c-menu-button__stroke {
      fill: $grayMedium;
      stroke: $grayDark;
    }
  }
</style>
