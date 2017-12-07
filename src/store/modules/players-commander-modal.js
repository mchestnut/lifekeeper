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