import { authGuard } from '@auth0/auth0-vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const extendedAuth0Guard = async (to) => {
  const response = await authGuard(to)
  store.commit('updateAuthenticationStatus', { isAuthenticated: response })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/protected-page',
    name: 'protected-page',
    component: () => import(/* webpackChunkName: "protected-page" */ '../views/ProtectedView.vue'),
    beforeEnter: extendedAuth0Guard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('updateAuthButtonVisibility', { fullPath: to.fullPath })

  next()
})

export default router
