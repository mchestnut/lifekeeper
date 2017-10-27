const namespaced = true

const state = {
  active: false,
  args: {
    name: '',
    colors: {},
    commanders: {
      primary: '',
      secondary: ''
    },
    position: 1
  },
  callback: null,
  datalist: {
    primary: [],
    secondary: []
  },
  secondaryCommander: false
}

const mutations = {
  /*
  * Shows additional commander input
  */  
  addCommander (state) {
    state.secondaryCommander = true
  },

  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    state.active = false
    state.args.name = ''
    state.args.commanders.primary = ''
    state.args.commanders.secondary = ''
    state.args.position = 1
    state.args.colors = []
    state.datalist.primary = []
    state.datalist.secondary = []
    state.secondaryCommander = false
  },

  /*
  * Filters the datalist of commanders base on input
  */
  filterDatalist (state, args) {
    const commandersList = args.commandersList
    const value = state.args.commanders[args.id]
    const regex = new RegExp(value, 'i')

    if (value.length > 2) {
      state.datalist[args.id] = commandersList.filter(commander => 
        commander.name.search(regex) > -1
      )

      // Remove list of exact match
      if (state.datalist[args.id].length === 1) {
        if (state.datalist[args.id][0].name === value) {
          state.datalist[args.id] = []
        }
      }
    }
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
  saveModal (state) {
    state.callback(state.args)
  }  
}

export default {
  namespaced,
  state,
  mutations
}