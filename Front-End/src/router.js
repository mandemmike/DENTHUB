import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Booking from './views/Booking.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/booking/:_id',
      name: 'booking',
      component: Booking
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    }
  ]
})
