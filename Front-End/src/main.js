import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Icon } from 'leaflet'
import VModal from 'vue-js-modal'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('./components/Media/Untitled (3) 1.svg'),
  iconUrl: require('./components/Media/Untitled (3) 1.svg')
})

Vue.use(BootstrapVue)
Vue.use(VModal)
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
