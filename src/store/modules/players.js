const namespaced = true

const state = {
  currentPlayers: [],
  index: 0,
  maxPlayers: 6
}

const mutations = {
  /*
  * Adds a player to currentPlayers
  */  
  addPlayer (state, args) {
    // Create player object
    const player = {
      commanders: {
        primary: args.commanders.primary,
        secondary: args.commanders.secondary
      },
      damage: [],
      dead: false,
      decked: false,
      id: state.index,
      life: 40,
      name: args.name,
      poison: 0,
      position: args.position - 1
    }

    // Create new player damage reference
    const newPlayerRef = {
      player: player,
      primary: 0,
      secondary: 0
    }

    // Add commander damage references for players
    state.currentPlayers.forEach(function(opponent) {
      const currentPlayerRef = {
        player: opponent,
        primary: 0,
        secondary: 0
      }

      opponent.damage.splice(args.position - 1, 0, newPlayerRef)
      player.damage.push(currentPlayerRef);
    })

    // Add new player to currentPlayers and increase index
    state.currentPlayers.splice(args.position - 1, 0, player)
    state.index++
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
    let playerIndex = -1

    state.currentPlayers.forEach(function (player, index) {
      if (player.id === args.id) {
        playerIndex = index
      }
    })

    if (playerIndex > -1) {
      state.currentPlayers.splice(playerIndex, 1)
    }
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