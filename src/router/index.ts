import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SupportPage from '../views/SupportPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SupportPage',
    component: SupportPage,
  },
  {
    path: '/success',
    name: 'SuccessPage',
    component: () => import('../views/SuccessPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
