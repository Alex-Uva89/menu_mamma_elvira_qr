import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import VenueComponent from '../views/VenueMenuComponent.vue';

const routes = [
  {
    path: '/',
    component: HomeComponent,
  },
  {
    path: '/:venue',
    component: VenueComponent,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
