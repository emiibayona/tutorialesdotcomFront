import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faEdit, faHandshake, faHandshakeAltSlash, faHandshakeSlash, faSearch, faTimes, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)
library.add(faTimes, faCoffee, faEdit, faHandshake, faHandshakeSlash, faHandshakeAltSlash, faTrash, faTrashAlt, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
