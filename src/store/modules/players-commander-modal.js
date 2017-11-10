const namespaced = true

const state = {
  active: false,
  args: {
    colors: {},
    commanders: {
      primary: {
        name: '',
        colors: []
      },
      secondary: {
        name: '',
        colors: []
      }
    }
  },
  callback: null
}

const mutations = {
  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    state.active = false
    state.args.colors = []
    state.args.commanders.primary = {
      name: '',
      nickname: '',
      colors: []
    }
    state.args.commanders.secondary = {
      name: '',
      nickname: '',
      colors: []
    }
  },

  /*
  * Opens the modal and saves args to state
  */  
  openModal (state, args) {
    state.active = true
    state.args = args.args
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