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
    state.cacheList.forEach((player, index) =>
      state.cacheList[index].remove = false
    )
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
    args.removeList.forEach(player =>
      state.callback(player)
    )
  },

  /*
  * Toggles remove state of player in cacheList
  */
  toggleRemove (state, args) {
    const player = state.cacheList[args.playerIndex]

    player.remove = player.remove ? false : true
  },

  /*
  * Updates cacheList to the currentPlayers list
  */  
  updateCacheList (state, args) {
    state.cacheList = args.currentPlayers.map(function (player) {
        return {
          id: player.id,
          name: player.name,
          remove: false
        }
    })
  }  
}

const actions = {
  /*
  * Closes the modal and toggles global state
  */
  closeModal ({state, commit, rootState}) {
    commit('closeModal')
    rootState.modalVisible = false
  },

  /*
  * Opens the modal and toggles global state
  */
  openModal ({state, commit, rootState}, args) {
    commit('openModal', args)
    rootState.modalVisible = true
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}