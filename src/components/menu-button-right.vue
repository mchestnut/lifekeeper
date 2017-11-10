<template>
  <button class="c-menu-button">
    <svg class="c-menu-button__svg" viewBox="0 0 136.85 50">
      <path class="c-menu-button__stroke" d="M1,46V4A3,3,0,0,1,4,1H117.63c2,0,3.59,1.52,4.57,3L135,23a5,5,0,0,1,0,4L122.21,46c-1,1.46-2.59,3-4.57,3H4A3,3,0,0,1,1,46Z"/>
      <text class="c-menu-button__label" transform="translate(64 32)"><slot></slot></text>
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
