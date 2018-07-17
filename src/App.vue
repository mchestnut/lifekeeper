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

    // Prevent double tap to zoom (iOS)
    // Src: https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari/38573198#38573198
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}
</script>

<style lang="scss">
  @import './assets/scss/variables.scss';
  @import './assets/scss/fonts.scss';
  @import './assets/scss/main.scss';
</style>
