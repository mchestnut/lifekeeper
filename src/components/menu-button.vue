<template>
  <svg class="c-menu-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136.85 50">
    <path class="u-fill-gray-light" d="M118.06,49c2,0,3.59-1.52,4.57-3l12.79-19a5,5,0,0,0,0-4L122.63,4c-1-1.46-2.59-3-4.57-3H18.79c-2,0-3.59,1.52-4.57,3L1.42,23a5,5,0,0,0,0,4L14.22,46c1,1.46,2.59,3,4.57,3Z"/>
    <path d="M118.06,50H18.79c-2,0-3.94-1.25-5.4-3.42L.51,27.42a6,6,0,0,1,0-4.84l.09-.16,12.79-19C14.85,1.25,16.82,0,18.79,0h99.26c2,0,3.94,1.25,5.4,3.42l12.88,19.16a6,6,0,0,1,0,4.84l-.09.16-12.79,19C122,48.75,120,50,118.06,50ZM2.31,26.54,15,45.46C15.56,46.22,17,48,18.79,48h99.26c1.84,0,3.23-1.78,3.74-2.54l12.74-18.92a4,4,0,0,0,0-3.08L121.8,4.54c-.51-.76-1.91-2.54-3.74-2.54H18.79C17,2,15.56,3.78,15,4.54L2.31,23.46A4,4,0,0,0,2.31,26.54Z"/>
    <text class="c-menu-button__label" transform="translate(68 32)"><slot></slot></text>
  </svg>
</template>

<script>
export default {
  name: 'menuButton'
}
</script>

<style lang="scss" scoped>
  .c-menu-button {
    cursor: pointer;
  }

  .c-menu-button__label {
    font-size: 30px;
  }
</style>
