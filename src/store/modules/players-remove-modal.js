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
  closePlayersRemoveModal (state) {
    state.active = false
    state.cacheList.forEach((player, index) =>
      state.cacheList[index].remove = false
    )
  },

  /*
  * Opens the modal and saves args to state
  */  
  openPlayersRemoveModal (state, args) {
    state.active = true
    state.callback = args.callback
  },

  /*
  * Saves the values from the modal
  */
  savePlayersRemoveModal (state, args) {
    args.removeList.forEach(player =>
      state.callback(player)
    )
  },

  /*
  * Toggles remove state of player in cacheList
  */
  toggleRemovePlayersRemoveModal (state, args) {
    const player = state.cacheList[args.playerIndex]

    player.remove = player.remove ? false : true
  },

  /*
  * Updates cacheList to the currentPlayers list
  */  
  updateCacheListPlayersRemoveModal (state, args) {
    state.cacheList = args.currentPlayers.map(function (player) {
        return {
          id: player.id,
          name: player.name,
          remove: false
        }
    })
  }  
}

export default {
  namespaced,
  state,
  mutations
}