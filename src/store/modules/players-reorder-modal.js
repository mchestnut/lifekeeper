const namespaced = true

const state = {
  active: false,
  callback: null,
  cacheList: []
}

const mutations = {
  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    state.active = false
  },

  /*
  * Opens the modal and saves args to state
  */  
  openModal (state, args) {
    state.active = true
    state.callback = args.callback
  },

  /*
  * Saves the values from the modal
  */
  saveModal (state, args) {
    state.callback({
      sortList: args.sortList
    })
  },

  /*
  * Resets cacheList to the currentPlayers list
  */  
  resetCacheList (state, args) {
    state.cacheList = args.currentPlayers.map(player => player)
  },

  /*
  * Updates player in cacheList
  */
  updateCacheList (state, args) {
    state.cacheList = args.sortList
  }
  
}

export default {
  namespaced,
  state,
  mutations
}