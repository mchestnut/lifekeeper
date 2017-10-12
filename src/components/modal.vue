<template>
  <div v-show="active">
    <p>Modal</p>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    active: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
</style>
