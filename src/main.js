import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('neataptic')

window.eventBus = new Vue()

Vue.config.productionTip = false

import VueWorker from 'vue-worker'
Vue.use(VueWorker)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
