const namespaced = true

const state = {
  currentTurn: -1,
  entryCache: {
    'event': '',
    'opponentId': -1,
    'playerId': -1
  },
  entryTimeout: null,
  turns: []
}

const mutations = {
  /*
  * Adds an entry object to turns
  */
  addEntry (state, args) {
    console.log('addEntry')
  },
  
  /*
  * Clears entryCache
  */
  clearEntryCache (state) {
    console.log('clearEntryCache')
  },
  
  /*
  * Deletes an entry object from turns
  */
  deleteEntry (state, args) {
    console.log('deleteEntry')
  },
  
  /*
  * Resets the log state
  */
  resetLog (state) {
    console.log('resetLog')
  },
  
  /*
  * Sets currentTurn and adds new turn to turns if needed
  */
  setTurn (state, args) {
    console.log('setTurn')
  }
}

export default {
  namespaced,
  state,
  mutations
}