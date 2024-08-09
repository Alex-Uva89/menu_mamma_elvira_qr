import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import VenueComponent from '../views/VenueMenuComponent.vue';
import ViewDish from '@/views/ViewDish.vue';

const routes = [
  {
    path: '/',
    component: HomeComponent,
  },
  {
    path: '/:venue',
    component: VenueComponent,
  },
  {
    path: '/dish/:id',
      name: 'viewDish',
      component: ViewDish,
      props: route => {
        const dish = JSON.parse(sessionStorage.getItem('dish'));
        const venueName = sessionStorage.getItem('venueName');
        return { id: route.params.id, dish, venueName };
      }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;