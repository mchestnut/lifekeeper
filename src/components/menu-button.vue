<template>
  <svg class="c-menu-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136.85 50">
    <path class="c-menu-button__stroke u-fill-gray-light" d="M118.06,49c2,0,3.59-1.52,4.57-3l12.79-19a5,5,0,0,0,0-4L122.63,4c-1-1.46-2.59-3-4.57-3H18.79c-2,0-3.59,1.52-4.57,3L1.42,23a5,5,0,0,0,0,4L14.22,46c1,1.46,2.59,3,4.57,3Z"/>
    <text class="c-menu-button__label" transform="translate(68 32)"><slot></slot></text>
  </svg>
</template>

<script>
export default {
  name: 'menuButton'
}
</script>

<style lang="scss">
  .c-menu-button {
    width: 7rem;
    cursor: pointer;
  }

  .c-menu-button__label {
    font-size: 24px; /* Use px to scale in SVG */
  }

  .c-menu-button__stroke {
    stroke: black;
    stroke-width: 2px;
  }
</style>
