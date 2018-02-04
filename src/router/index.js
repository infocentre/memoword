import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import AddingView from '@/components/AddingView'
import LoginView from '@/components/LoginView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'Adding',
      component: AddingView
    },
    {
      path: '/login',
      name: 'Loggin',
      component: LoginView
    }
  ]
})
