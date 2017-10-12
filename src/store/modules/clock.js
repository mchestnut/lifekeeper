const namespaced = true

const state = {
  currentTime: null,
  startTime: null,
  stopTime: null,
  timeInterval: null,
  totalTime: null
}

const mutations = {
  /*
  * Stops the clock and resets the time values
  */  
  resetClock (state) {
    console.log('stopClock')
    console.log('resetClock')
  },

  /*
  * Starts the clock by starting timeInterval
  */
  startClock (state) {
    console.log('startClock')
  },

  /*
  * Stops the clock by stopping timeInterval
  */  
  stopClock (state) {
    console.log('stopClock')
  }
}

export default {
  namespaced,
  state,
  mutations
}