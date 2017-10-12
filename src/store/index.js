import Vue from 'vue'
import Vuex from 'vuex'
import clock from './modules/clock'
import log from './modules/log'
import players from './modules/players'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clock,
    log,
    players
  }
})