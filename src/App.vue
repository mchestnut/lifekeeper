<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function() {
    // Prevent context menu
    document.addEventListener('contextmenu', event => event.preventDefault())
  }
}
</script>

<style lang="scss">
  @import './assets/scss/variables.scss';
  @import './assets/scss/fonts.scss';
  @import './assets/scss/main.scss';
</style>
