import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/app.css'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
