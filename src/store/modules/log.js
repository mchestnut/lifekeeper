const namespaced = true

const state = {
  currentTurn: 0,
  cache: {
    damage: {},
    dead: {},
    decked: {},
    life: {},
    poison: {}
  },
  entryId: 0,
  timeout: {},
  transform: {
    actual: 0,
    max: 0,
    stored: 0
  },
  turns: [[]]
}

const mutations = {
  /*
  * Adds an entry object to turns and caches the location
  */
  addEntry (state, args) {
    const cache = state.cache[args.property]
    const turn = state.turns[state.currentTurn]
    turn.push(args.entry)

    cache.turn = state.currentTurn
    cache.entryId = args.entry.entryId
    state.entryId++
  },

  /*
  * Replaces an entry object from turns
  */
  replaceEntry (state, args) {
    const cache = state.cache[args.property]
    const turn = state.turns[cache.turn]
    let position

    turn.forEach(function (entry, index) {
      if (entry.entryId == cache.entryId) {
        position = index
      }
    })

    turn.splice(position, 1, args.entry)
  },
  
  /*
  * Resets cache for a property and deletes entry if no change
  */
  resetCacheProperty (state, args) {
    const cache = state.cache[args.property]

    if (cache.args.startValue === cache.args.value) {
      const turn = state.turns[cache.turn]
      let position

      turn.forEach(function (entry, index) {
        if (entry.entryId == cache.entryId) {
          position = index
        }
      })

      turn.splice(position, 1)
    }

    state.cache[args.property] = {}
  }, 
  
  /*
  * Resets all cache properties
  */
  resetCache (state) {
    const properties = ['damage', 'dead', 'decked', 'life', 'poison']

    function reset (property) {
      state.cache[property] = {}
      clearTimeout(state.timeout[property])
    }

    properties.forEach(property => reset(property))
  },  

  /*
  * Resets transform for entries container
  */
  resetTransform (state) {
    state.transform = {
      actual: 0,
      stored: 0
    }
  },

  /*
  * Resets turns and entries
  */
  resetTurns (state) {
    state.entryId = 0
    state.currentTurn = 0
    state.turns = [[]]
  },

  /*
  * Sets the cache for a property
  */
  setCache (state, args) {
    state.cache[args.property].args = args
  },
  

  /*
  * Sets transform for entries container
  */
  setTransform (state, args) {
    if (args.value < 0) {
      args.value = 0
    } else if (args.value > state.max) {
      args.value = state.max
    }
    state.transform[args.property] = args.value
  },
  
  /*
  * Sets transform max based on height of wrapper and content
  */
  setTransformMax (state) {
    const content = document.querySelector('.c-entries-container__content')
    const contentHeight = content.clientHeight
    const wrapper = document.querySelector('.c-entries-container__wrapper')
    const wrapperHeight = wrapper.clientHeight
    const max = (1 - wrapperHeight / contentHeight) * 100

    state.max = max <= 0 ? 0 : max
  },
  
  
  /*
  * Sets currentTurn and adds new turn to turns if needed
  */
  setTurn (state, args) {
    state.currentTurn = args.value

    while (state.turns.length < args.value + 1) {
      state.turns.push([])
    }
  }
}

const actions = {
  /*
  * Resets log, including cache, transform, and turns
  */
  resetLog ({state, commit}) {
    commit('resetCache')
    commit('resetTransform')
    commit('resetTurns')
  },

  /*
  * Sets an entry
  */
  setEntry ({state, commit}, args) {
    const player = args.currentPlayers[args.playerIndex]
    const name = player.name
    let action = ''
    let commander = ''
    let delta = null
    let entryText = ''
    let entryId = state.entryId
    let modifier = ''
    let mutation = 'addEntry'
    let opponent = ''

    // Check cache
    if (state.cache[args.property].args) {
      if (state.cache[args.property].args.playerIndex == args.playerIndex) {
        let match = true

        // Check commander match
        if (args.property == 'damage') {
          if (state.cache[args.property].args.opponentIndex != args.opponentIndex) {
            match = false
          }

          if (state.cache[args.property].args.commander != args.commander) {
            match = false
          }
        }

        if (match) {
          args.startValue = state.cache[args.property].args.startValue
          entryId = state.cache[args.property].entryId
          mutation = 'replaceEntry'
        }
      } else {
        clearTimeout(state.timeout[args.property])
        commit('resetCacheProperty', args)
      }
    }

    // Create entry string
    switch (args.property) {
      case 'damage':
        delta = args.value - args.startValue
        action = delta >= 0 ? 'took' : 'removed'
        opponent = player.damage[args.opponentIndex].player
        commander = opponent.commanders[args.commander].nickname
        entryText = name + ' ' + action + ' ' + Math.abs(delta) + ' damage from ' + commander + '.'
        break
      case 'dead':
        delta = args.value == args.startValue ? false : true
        action = args.value ? 'died.' : 'came back to life!'
        entryText = name + ' ' + action
        break
      case 'decked':
        delta = args.value == args.startValue ? false : true
        action = args.value ? 'got milled out.' : 'regained a library!'
        entryText = name + ' ' + action
        break
      case 'life':
        delta = args.value - args.startValue
        action = delta >= 0 ? 'gained' : 'lost'
        entryText = name + ' ' + action + ' ' + Math.abs(delta) + ' life.'
        break
      case 'poison':
        delta = args.value - args.startValue
        action = delta >= 0 ? 'gained' : 'removed'
        modifier = Math.abs(delta) > 1 ? 's' : ''
        entryText = name + ' ' + action + ' ' + Math.abs(delta) + ' poison counter' + modifier + '.'
        break
    }

    // Add, replace, or delete entry
    commit(mutation, {
      entry: {
        entryId: entryId,
        text: entryText
      },
      property: args.property
    })

    // Update cache
    commit('setCache', args)

    // Reset timeout
    clearTimeout(state.timeout[args.property])
    state.timeout[args.property] = setTimeout(function() {
      commit('resetCacheProperty', args)
    }, 3000)
  },

  /*
  * Sets the current turn, clears all caches, and sets transform
  */
  setTurn ({state, commit}, args) {
    commit('setTurn', args)
    commit('resetCache')

    // Set transform to set turn
    let position = 0

    // If existing turn, find position
    if (args.value < state.turns.length - 1) {
      const content = document.querySelector('.c-entries-container__content')
      const entry = content.children[args.value]
      const offset = content.clientHeight - entry.offsetTop - entry.clientHeight
      position = offset / content.clientHeight * 100
    }

    commit('setTransformMax')
    commit('setTransform', {
      property: 'actual',
      value: position
    })
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}