import Vue from 'vue'
import Vuex from 'vuex'
import testModule from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    testModule
  },
  state: {
    test: 'test'
  },
  mutations: {
    testMutation (state) {
      state.test = 'test'
    }
  }
})