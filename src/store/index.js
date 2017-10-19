import Vue from 'vue'
import Vuex from 'vuex'
import clock from './modules/clock'
import commanders from './modules/commanders'
import log from './modules/log'
import players from './modules/players'
import playersAddModal from './modules/players-add-modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clock,
    commanders,
    log,
    players,
    playersAddModal
  }
})