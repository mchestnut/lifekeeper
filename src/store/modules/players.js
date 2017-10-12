const namespaced = true

const state = {
  currentPlayers: [],
  maxPlayers: 6
}

const mutations = {
  /*
  * Adds a player to currentPlayers
  */  
  addPlayer (state, args) {
    console.log('addPlayer')
  },

  /*
  * Parses string for math statements and runs it
  */  
  parseMath (state, args) {
    console.log('parseMath')
  },

  /*
  * Removes a player from currentPlayers
  */  
  removePlayer (state, args) {
    console.log('removePlayer')
  },

  /*
  * Reorders players in currentPlayers
  */  
  reorderPlayers (state, args) {
    console.log('reorderPlayers')
  },

  /*
  * Resets players in currentPlayers
  */  
  resetPlayers (state, args) {
    console.log('resetPlayers')
  },

  /*
  * Sets colors for a player
  */  
  setColors (state, args) {
    console.log('setColors')
  },

  /*
  * Sets commanders for a player
  */  
  setCommander (state, args) {
    console.log('setCommander')
  },

  /*
  * Sets commander damage for a player and checks if player is dead
  */  
  setDamage (state, args) {
    console.log('setDamage')
  },

  /*
  * Sets decked value for a player
  */  
  setDecked (state, args) {
    console.log('setDecked')
  },

  /*
  * Sets life value for a player and checks if player is dead
  */  
  setLife (state, args) {
    console.log('setLife')
  },

  /*
  * Sets name for a player
  */  
  setName (state, args) {
    console.log('setName')
  },

  /*
  * Sets poison value for a player and checks if player is dead
  */  
  setPoison (state, args) {
    console.log('setPoison')
  }
}

export default {
  namespaced,
  state,
  mutations
}