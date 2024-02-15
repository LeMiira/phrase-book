import { createRouter, createWebHashHistory } from 'vue-router'

import CategoriesView from '../views/CategoriesView.vue'
import PhrasesView from '../views/PhrasesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/CategoriesView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Auth.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/Search.vue')
  },
  {
    path: '/phrases/:cat_id',
    name: 'phrases',
    component: () => import( '../views/PhrasesView.vue')
 
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import( '../views/CategoriesView.vue')
  },
  {
    path: '/about',
    name: 'about',
 
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/ask',
    name: 'askMe',
 
    component: () => import( '../views/AskMeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
