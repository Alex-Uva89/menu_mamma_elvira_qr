<template>
  <header-component :venuePath="venueName" class="header" />
  <div class="venue">
    
    <template v-if="Array.isArray(categories)">
      <template v-for="category in categories" :key="category.id">
        <div>
          <h2>{{ category.name }}</h2>
          <ul v-if="!category.is_drink && category.is_active">
            <li v-for="dish in category.dishes" :key="dish.id" class="categories">
              <span class="categories">
                {{ dish.name }}
              </span>
            </li>
          </ul>
          <ul v-else-if="category.is_drink && category.is_active">
            <li v-for="drink in category.drinks" :key="drink.id" class="categories">
              <span class="categories">
                {{ drink.name }}
              </span>
            </li>
          </ul>
        </div>
      </template>
    </template>

    <template v-else>
      <div>
        <h2>{{ categories.name }}</h2>
        <ul v-if="!categories.is_drink && categories.is_active">
          <li v-for="dish in categories.dishes" :key="dish.id" class="categories">
            <span class="categories">
              {{ dish.name }}
            </span>
          </li>
        </ul>
        <ul v-else-if="categories.is_drink && categories.is_active">
          <li v-for="drink in categories.drinks" :key="drink.id" class="categories">
            <span class="categories">
              {{ drink.name }}
            </span>
          </li>
        </ul>
      </div>
    </template>
      
  </div>
  <nav-component 
    :categories="venue.categories" 
    :venuePath="venueName" 
    class="footer"
    @update-category="handleUpdateCategory"
  />
</template>

<script>
import axios from 'axios';
import NavComponent from '../views/layout/NavMenu.vue';
import HeaderComponent from '../views/layout/HeaderMenu.vue';

export default {
  name: 'VenueMenu',
  props: {
    venuePath: {
      type: String,
      required: true
    }
  },
  components: {
    NavComponent,
    HeaderComponent
  },
  data() {
    return {
      venue: {},
      venueName: '',
      categories: []
    };
  },
  mounted() {
      this.venueName = this.$route.params.venue;

      this.fetchVenueData();
  },
  methods: {
    fetchVenueData() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/venues/${this.venueName}`)
        .then(response => {
          this.venue = response.data;
        })
        .catch(error => {
          console.error('Errore durante il recupero dei dati del locale:', error);
        });
    },
    handleUpdateCategory(category) {
      console.log('DATTO RICEVUTO:', category);
      this.categories = category;
    }
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
}
.header{
  z-index: 100;
}

.venue {
  margin: 65px auto 150px;
  max-width: 100%;
  max-height: 100vh;
  padding: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.footer {
  z-index: 0;
}
</style>