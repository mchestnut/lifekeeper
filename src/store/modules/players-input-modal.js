const namespaced = true

const state = {
  active: false,
  callback: null,
  header: '',
  fields: [],
  timeout: null,
  valid: true,
  validation: null
}

const mutations = {

  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    clearTimeout(state.timeout)

    state.active = false
    state.header = ''
    state.fields = []
    state.valid = true
  },

  /*
  * Opens the modal and saves args to state
  */  
  openModal (state, args) {
    state.active = true
    state.callback = args.callback
    state.header = args.header
    state.fields = args.fields
    state.validation = args.validation
  },

  /*
  * Resets the valid state value after timeout
  */
  resetModal (state) {
    const root = state

    state.timeout = setTimeout(() => {
      root.valid = true
    }, 500)
  },

  /*
  * Saves the values and logs entries from the modal
  */
  saveModal (state) {
    clearTimeout(state.timeout)
    state.valid = true

    state.fields.forEach(function (args) {
      if (state.validation(args) == false) {
        state.valid = false
      }
    })

    if (state.valid) {
      state.fields.forEach(function (args) {
        state.callback(args)
      })
    }
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