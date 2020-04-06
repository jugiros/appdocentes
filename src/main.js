import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import { store } from './store'
import router from './router'
import {config} from './helpers/firebaseConfig'
import Vuetify from 'vuetify'
import FBSignInButton from 'vue-facebook-signin-button'
import axios from 'axios'
import { axiosRequestConfig } from './env'
import VueTour from 'vue-tour'
import VueScrollTo from 'vue-scrollto'
import AOS from 'aos'



//maoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
import FileManager from 'laravel-file-manager'

Vue.use(FileManager, {store})



//**********************************************************************************
Vue.use(FBSignInButton)
Vue.prototype.$axios = axios.create(axiosRequestConfig)
Vue.use(VueScrollTo)


//#ffb606
Vue.use(Vuetify, {
  theme: {
    primary: "#6464ea",
    secondary: "#E8EAF6",
    accent: "#00796B",
    error: "#C62828",
    warning: "#FFA000",
    info: "#2196f3",
    success: "#4caf50"
  }
})
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import 'firebaseui/dist/firebaseui.css'
import 'aos/dist/aos.css'
import './ml'
require('vue-tour/dist/vue-tour.css')



new Vue({
  router,
  store,
  created() {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/dashboard/welcome')
      } else {
        this.$router.push('/auth')
      }
    })
    AOS.init()
  },
  el: '#app',
  render: h => h(App)
});
