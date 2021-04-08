import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueGoogleCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
