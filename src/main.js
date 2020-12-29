import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router'
import store from './store'
//axios tem haver com a requisição da API
import axios from 'axios'
import firebase from 'firebase/app'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BIcon, BIconArrowUp, BIconArrowDown} from  'bootstrap-vue'


Vue.prototype.$axios = axios
Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.component ( 'BIcon' , BIcon)
Vue.component ( 'BIconArrowUp' , BIconArrowUp)
Vue.component ( 'BIconArrowDown' , BIconArrowDown)
Vue.use(IconsPlugin)
Vue.use(VueRouter);


const firebaseConfig = {
  apiKey: "AIzaSyDem2tvaUtMxVA8BbcHVhWqTKJkkh4G1-k",
  authDomain: "gestor-assessment.firebaseapp.com",
  databaseURL: "https://gestor-assessment.firebaseio.com",
  projectId: "gestor-assessment",
  storageBucket: "gestor-assessment.appspot.com",
  messagingSenderId: "218390293190",
  appId: "1:218390293190:web:20947352ed96b71d7ec5c7",
  measurementId: "G-G2FQ52P373"
};
firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
