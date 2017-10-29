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
    const position = args.position - 1
    const opponentsA = []
    const opponentsB = []

    // Create player object
    const player = {
      colors: args.colors,
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
      poison: 0
    }

    // Create new player damage reference
    const newPlayerRef = {
      player: player,
      primary: 0,
      secondary: 0
    }

    // Add commander damage references for players
    state.currentPlayers.forEach(function(opponent, opponentIndex) {
      const opponentPlayerRef = {
        player: opponent,
        primary: 0,
        secondary: 0
      }
      let currentIndex = 0

      if (opponentIndex < position) {
        opponentsA.push(opponentPlayerRef)

        currentIndex = position - opponentIndex - 1
      } else {
        opponentsB.push(opponentPlayerRef)

        currentIndex = position - opponentIndex

        if (currentIndex === 0) {
          currentIndex = state.currentPlayers.length
        }
      }

      opponent.damage.splice(currentIndex, 0, newPlayerRef)
    })

    player.damage.push(...opponentsB)
    player.damage.push(...opponentsA)
    
    // Add new player to currentPlayers and increase index
    state.currentPlayers.splice(position, 0, player)
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
      } else {
        let opponentIndex = -1

        player.damage.forEach(function (opponent, index) {

          if (opponent.player.id === args.id) {
            opponentIndex = index
          }
        })

        if (opponentIndex > -1) {
          player.damage.splice(opponentIndex, 1)
        }
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