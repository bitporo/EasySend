import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import {
  Noir
} from './thems.js'

export function createApp() {
  const app = createSSRApp(App)
  app.use(PrimeVue, {
    theme: {
      preset: Noir,
      options: {
        // darkModeSelector: '.app-dark',
      }
    }
  });
  return {
    app
  }
}
// #endif