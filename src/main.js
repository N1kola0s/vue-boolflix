import Vue from 'vue'
import App from './App.vue'

/* Bootstrap */
const bootstrap = require('bootstrap')
Vue.use(bootstrap)

/* vue-flag-icon */
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')