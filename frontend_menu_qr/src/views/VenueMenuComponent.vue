<template>
  <header>
    <header-component :venuePath="venueName" class="header" />
    <header-navigation :venuePath="venueName" 
      :categoryName="categoryName"
    />
  </header>
  <div class="venue">  
    <template v-if="Array.isArray(categories)">
      <template v-for="category in categories" :key="category.id">
        <div>
          <ul v-if="!category.is_drink && category.is_active">
            <li v-for="dish in category.dishes" :key="dish.id" class="categories">
              <span class="categories">
                {{ dish.name }}
              </span>
            </li>
          </ul>
          <ul v-else-if="category.is_drink && category.is_active">
            {{ category.name }}
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
    @category-name="handleUpdateNameCategory"
  />
</template>

<script>
import axios from 'axios';
import NavComponent from '../views/layout/NavMenu.vue';
import HeaderComponent from '../views/layout/HeaderMenu.vue';
import HeaderNavigation from '../views/layout/HeaderNav.vue';

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
    HeaderComponent,
    HeaderNavigation
  },
  data() {
    return {
      venue: {},
      venueName: '',
      categories: [],
      categoryName: ''
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
          this.categories = this.venue.categories[3]
          this.categoryName = this.categories.name;
        })
        .catch(error => {
          console.error('Errore durante il recupero dei dati del locale:', error);
        });
    },
    handleUpdateCategory(category) {
      this.categories = category;
    },
    handleUpdateNameCategory(name) {
      this.categoryName = name;
    }
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
}
header{
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.venue {
  max-width: 100%;
  max-height: calc(100vh - 300px);
  padding: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.footer {
  z-index: 0;
}
</style>