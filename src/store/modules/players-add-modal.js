const namespaced = true

const state = {
  active: false,
  args: {
    name: '',
    colors: {},
    commanders: {
      primary: {
        name: '',
        nickname: '',
        colors: []
      },
      secondary: {
        name: '',
        nickname: '',
        colors: []
      }
    },
    position: 1
  },
  callback: null
}

const mutations = {

  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    state.active = false
    state.args.name = ''
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
    state.args.position = 0
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
  },

  /*
  * Sets the initial selected position
  */
  setPosition (state, args) {
    state.args.position = args.value
  }
}

export default {
  namespaced,
  state,
  mutations
}