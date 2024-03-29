import Vue from 'vue'
import App from './App.vue'


/* Font Awesome icons*/
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons 👇 QUI AGGIUNGI LE ICONE che vuoi usare in camelCase */

/* import { faStar } from '@fortawesome/free-solid-svg-icons' */
/* import { faStar } from '@fortawesome/free-regular-svg-icons' */

import { faStar, faMagnifyingGlass, faChevronRight, faChevronLeft, faPlay, faCircleInfo, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library 👇 QUI AGGIUNGI IL NOME DELL'ICONA in camelCase*/
/* library.add(faStar, farStar) */

library.add(faStar, farStar, faMagnifyingGlass, faChevronRight, faChevronLeft, faCirclePlay, faPlay, faCircleInfo);

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

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