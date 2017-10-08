<template>
  <p>Basic</p>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'basic',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({

    }),
    test: function () {
      return
    }
  },
  methods: {
    ...mapMutations( {

    }),
    testMethod: function () {
      
    }
  }
}
</script>

<style scoped>
</style>
