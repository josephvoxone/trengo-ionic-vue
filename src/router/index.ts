import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/signin/index.vue')
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('../views/session/index.vue')
  },
  {
    path: '/addcustomer',
    name: 'Customer',
    component: () => import('../views/customer/index.vue')
  },
  {
    path: '/order-details',
    name: 'Order Detail',
    component: () => import('../views/order-details/index.vue')
  },
  {
    path: '/order-finish/:id',
    name: 'order-finish',
    component: () => import('../views/order-finish/index.vue')
  },
  {
    path: '/query',
    name: 'QueryHome',
    component: () => import('../views/query/index.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/signup/index.vue')
  },
  {
    path: '/add-store',
    name: 'Store',
    component: () => import('../views/session-store/index.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/history/index.vue')
  },
  {
    path: '/history-details',
    name: 'history-details',
    component: () => import('../views/history-details/index.vue')
  },
  {
    path: '/history-order-details',
    name: 'history-order-details',
    component: () => import('../views/history-order-details/index.vue')
  },
  {
    path: '/edit-customer',
    name: 'edit-customer',
    component: () => import('../views/edit-customer/index.vue')
  },
  {
    path: '/credit',
    name: 'credit',
    component: () => import('../views/credit/index.vue')
  },
  {
    path: '/folder/:id',
    component: () => import('../views/Folder.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
