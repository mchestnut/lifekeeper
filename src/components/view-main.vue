<template>
  <div>
    <p>Main View</p>
    <players></players>
    <clock></clock>
    <log></log>
    <main-menu></main-menu>
  </div>
</template>

<script>
import clock from '@/components/clock'
import log from '@/components/log'
import mainMenu from '@/components/main-menu'
import players from '@/components/players'

export default {
  name: 'view-main',
  components: {
    clock,
    log,
    mainMenu,
    players
  }
}
</script>

<style scoped>
</style>
