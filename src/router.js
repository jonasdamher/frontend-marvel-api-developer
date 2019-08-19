import Vue from 'vue'
import Router from 'vue-router'

import Comics from './views/Comics.vue'
import Details from './views/Details.vue'
import Creators from './views/Creators.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'comics/',
      component: Comics
    },
    {
      path: '/comics/details/:id',
      name: 'details',
      component: Details
    },
    {
      path: '/creators/:id',
      name: 'creators',
      component: Creators
    }
  ]
})
