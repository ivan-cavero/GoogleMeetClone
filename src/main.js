/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles/modern-normalize.css'
import './assets/styles/global.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun, faUser, faQuestion, faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGoogle, faGithub, faMoon, faSun, faUser, faQuestion, faCaretDown, faChevronLeft, faChevronRight)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
