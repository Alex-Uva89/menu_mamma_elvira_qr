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
    props: route => {
      const list = JSON.parse(sessionStorage.getItem('list'));
      const listImg = JSON.parse(sessionStorage.getItem('listImg'));
      return { venue: route.params.venue, list, listImg };
    }
  },
  {
    path: '/dish/:id',
      name: 'viewDish',
      component: ViewDish,
      props: route => {
        const dish = JSON.parse(sessionStorage.getItem('dish'));
        const venueName = sessionStorage.getItem('venueName');
        const allergensDish = JSON.parse(sessionStorage.getItem('allergensDish'));
        const list = JSON.parse(sessionStorage.getItem('list'));
        const listImg = JSON.parse(sessionStorage.getItem('listImg'));
        return { id: route.params.id, dish, venueName, allergensDish, list, listImg };
      }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;