// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import Vuefire from 'vuefire'
import firebase from './service/firebase'
Vue.use(Vuefire)
Vue.config.productionTip = false
sync(store, router)

/* eslint-disable */
window.vm = new Vue({
  el: '#app',
  store,
  firebase: {
    memoword: firebase.init.database().ref('memoword').orderByChild('created_at')
  },
  router,
  template: '<App/>',
  components: { App }
})
console.log(firebase)