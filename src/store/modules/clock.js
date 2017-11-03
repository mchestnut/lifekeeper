const namespaced = true

const state = {
  startTime: null,
  storedTime: 0,
  timeInterval: null,
  totalTime: null
}

const mutations = {
  /*
  * Stops the clock and resets the time values
  */  
  resetClock (state) {
    clearInterval(state.timeInterval)
    state.storedTime = 0
    state.totalTime = '0:00:00'
  },

  /*
  * Starts the clock by starting timeInterval, then calculates the total time
  * every 1 second
  */
  startClock (state) {
    state.startTime = new Date()

    state.timeInterval = setInterval(function() {
      const currentTime = new Date()
      const delta = currentTime.getTime() - state.startTime.getTime()
      let seconds = Math.floor(delta / 1000) + state.storedTime

      let hours = Math.floor(seconds / 3600)
      seconds -= hours * 3600
      let minutes = Math.floor(seconds / 60)
      seconds -= minutes * 60

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      state.totalTime = hours + ':' + minutes + ':' + seconds
    }, 1000)    
  },

  /*
  * Stops the clock by stopping timeInterval
  */  
  stopClock (state) {
    clearInterval(state.timeInterval)

    const currentTime = new Date()
    const delta = currentTime.getTime() - state.startTime.getTime()
    state.storedTime = Math.floor(delta / 1000)
  }
}

export default {
  namespaced,
  state,
  mutations
}