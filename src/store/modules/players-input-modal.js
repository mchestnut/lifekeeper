const namespaced = true

const state = {
  active: false,
  callback: null,
  header: '',
  fields: []
}

const mutations = {

  /*
  * Closes the modal and resets the state
  */  
  closeModal (state) {
    state.active = false
    state.header = ''
    state.fields = []
  },

  /*
  * Opens the modal and saves args to state
  */  
  openModal (state, args) {
    state.active = true
    state.callback = args.callback
    state.header = args.header
    state.fields = args.fields
  },

  /*
  * Saves the values and logs entries from the modal
  */
  saveModal (state) {
    state.fields.forEach(function (args) {
      state.callback(args)
    })
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