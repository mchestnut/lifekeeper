import Vue from 'vue'

const focus = {
  /*
  * Set focus on object at insertion
  */  
  inserted(el, binding) {
    if (binding.value !== false) {
      // Uses timeout for delay on touch events
      setTimeout(function() {
        el.focus()
      }, 10)
    }
  }
}

Vue.directive('focus', focus)