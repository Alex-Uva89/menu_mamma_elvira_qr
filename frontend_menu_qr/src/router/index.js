import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import VenueComponent from '../views/VenueMenuComponent.vue';
import ViewDish from '@/views/ViewDish.vue';
import ViewDrink from '@/views/ViewDrink.vue';

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
      const categorySelected = JSON.parse(sessionStorage.getItem('categorySelected'));
      return { venue: route.params.venue, list, listImg, categorySelected };
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
        const categorySelected = JSON.parse(sessionStorage.getItem('categorySelected'));
        const currentLanguage = sessionStorage.getItem('currentLanguage');
        return { id: route.params.id, dish, venueName, allergensDish, list, listImg, categorySelected, currentLanguage };
      }
  },
  {
    path: '/drink/:id',
      name: 'viewDrink',
      component: ViewDrink,
      props: route => {
        const dish = JSON.parse(sessionStorage.getItem('dish'));
        const venueName = sessionStorage.getItem('venueName');
        const allergensDish = JSON.parse(sessionStorage.getItem('allergensDish'));
        const list = JSON.parse(sessionStorage.getItem('list'));
        const listImg = JSON.parse(sessionStorage.getItem('listImg'));
        const categorySelected = JSON.parse(sessionStorage.getItem('categorySelected'));
        return { id: route.params.id, dish, venueName, allergensDish, list, listImg, categorySelected };
      }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;