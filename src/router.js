import Vue from 'vue'
import Router from 'vue-router'

import Comics from './views/Comics.vue'
import Details from './views/Details.vue'

import AllCreators from './views/AllCreators.vue'
import Creators from './views/Creators.vue'

import AllCharacters from './views/AllCharacters.vue'
import Characters from './views/Characters.vue'

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
      name: 'details/',
      component: Details
    },
    {
      path: '/creators/',
      name: 'allCreators/',
      component: AllCreators
    },
    {
      path: '/creators/:id',
      name: 'creators/',
      component: Creators
    },
    {
      path: '/characters/',
      name: 'allCharacters/',
      component: AllCharacters
    },
    {
      path: '/characters/:id',
      name: 'characters/',
      component: Characters
    }
  ]
})
