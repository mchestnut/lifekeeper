<template>
  <button class="c-menu-button">
    <svg class="c-menu-button__svg" viewBox="0 0 136.85 50">
      <path class="c-menu-button__stroke" d="M135.42,46V4a3,3,0,0,0-3-3H18.79c-2,0-3.59,1.52-4.57,3L1.42,23a5,5,0,0,0,0,4L14.22,46c1,1.46,2.59,3,4.57,3H132.42A3,3,0,0,0,135.42,46Z"/>
      <text class="c-menu-button__label" transform="translate(72 32)"><slot></slot></text>
    </svg>
  </button>
</template>

<script>
  export default {
    name: 'menuButtonLeft'
  }
</script>

<style>
</style>
