const namespaced = true

const state = {
  active: false,
  args: null,
  commander2: false
}

const mutations = {
  /*
  * Shows additional commander input
  */  
  addCommanderPlayersAddModal (state) {
    state.commander2 = true
  },

  /*
  * Closes the modal
  */  
  closePlayersAddModal (state) {
    console.log('close modal')
    state.commander2 = false
    state.active = false
  },

  /*
  * Opens the modal and saves args to state
  */  
  openPlayersAddModal (state, args) {
    console.log('open modal')
    state.active = true
    state.args = args
  },

  /*
  * Saves the values from the modal
  */
  savePlayersAddModal (state) {
    console.log('save modal')
    state.args.callback()
  }  
}

export default {
  namespaced,
  state,
  mutations
}