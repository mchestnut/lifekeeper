const namespaced = true

const state = {
  active: false,
  args: {
    name: '',
    commanders: {
      primary: '',
      secondary: ''
    },
    position: 1
  },
  callback: null,
  secondaryCommander: false
}

const mutations = {
  /*
  * Shows additional commander input
  */  
  addCommanderPlayersAddModal (state) {
    state.secondaryCommander = true
  },

  /*
  * Closes the modal and resets the state
  */  
  closePlayersAddModal (state) {
    state.active = false
    state.args.name = ''
    state.args.commanders.primary = ''
    state.args.commanders.secondary = ''
    state.args.position = 1
    state.secondaryCommander = false
  },

  /*
  * Opens the modal and saves args to state
  */  
  openPlayersAddModal (state, args) {
    state.active = true
    state.callback = args.callback
  },

  /*
  * Saves the values from the modal
  */
  savePlayersAddModal (state) {
    state.callback(state.args)
  }  
}

export default {
  namespaced,
  state,
  mutations
}