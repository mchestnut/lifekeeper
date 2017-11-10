import Vue from 'vue'

const focus = {
  inserted(el, binding) {
    if (binding.value !== false) {
      el.focus()
    }
  }
}

Vue.directive('focus', focus)