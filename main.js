import Vue from 'vue'
import App from './App.vue'

export default new Vue({
  el: '#app',
  name: 'AppInit',
  render: createElement => {
    return createElement(App)
  },
})
