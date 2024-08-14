<template>
  <header>
    <header-component :venuePath="venueName" class="header" />
    <header-navigation 
      :venuePath="venueName" 
      :categoryName="categoryName"
      :list="list"
      :listImg="listImg"
      @filter-allergen="handleFilterAllergen"
      @update-open-list="handleUpdateOpenList"
      @update-open-list-img="handleUpdateOpenListImg"
    />
  </header>
  <div class="venue">  
    <template v-if="Array.isArray(categories)">
      <template v-if="categories.some(category => category.is_drink && category.is_active && category.drinks.length > 0)">
        <template v-for="category in categories" :key="category.id">
          <div v-if="category.is_drink && category.is_active && category.drinks.length > 0" class="category-container">
            <div
              class="categories-drink" 
              :style="{ 
                  border: `5px solid var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})`,
                  background: `var(--header-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})`
                }" 
                @click="toggleCategory(category.id)">
              {{ category.name }}
            </div>
            <ul v-if="isCategoryVisible(category.id)">
              <li v-for="drink in category.drinks" :key="drink.id">
                <span class="categories">
                  <card v-if="listImg" :dish="drink" :venuePath="venueName" />
                  <list v-if="list" :dish="drink" :venuePath="venueName" />
                </span>
              </li>
            </ul>
          </div>
        </template>
      </template>

      <!-- Mostra il messaggio se nessuna categoria ha drink disponibili -->
      <template v-else>
        <p class="absent">Non sono presenti prodotti nella categoria {{ categoryName }}</p>
      </template>
    </template>
    <template v-else>
      <div>

        <!-- FOOD -->
        <ul v-if="!categories.is_drink && categories.is_active">
          <li v-for="dish in categories.dishes" :key="dish.id" class="categories">
            <template v-if="selectedAllergens && selectedAllergens.length > 0">
              <router-link 
                :to="{ name: 'viewDish', params: { id: dish.id } }" 
                @click.native="storeDishData(dish, venueName, allergensDish, list, listImg)"
                v-if="!allergensDish.some(allergen => allergen.dish_id === dish.id && selectedAllergens.some(selected => allergen.allergen_id === selected.id))">
                  <card v-if="listImg" :dish="dish" :venuePath="venueName" />
                  <list v-if="list" :dish="dish" :venuePath="venueName" />
              </router-link>
            </template>
            <router-link 
            :to="{ name: 'viewDish', params: { id: dish.id } }" 
            @click.native="storeDishData(dish, venueName, allergensDish, list, listImg)" 
            v-else>
              <card v-if="listImg"  :dish="dish" :venuePath="venueName" />
              <list v-if="list" :dish="dish" :venuePath="venueName" />
            </router-link>
          </li>
          <li v-if="selectedAllergens && selectedAllergens.length > 0 && !categories.dishes.some(dish => !allergensDish.some(allergen => allergen.dish_id === dish.id && selectedAllergens.some(selected => allergen.allergen_id === selected.id)))">
            Non ci sono piatti con i filtri selezionati
          </li>
        </ul>

        <!-- DRINKS -->
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
import Card from '../components/CardDish.vue';
import List from '../components/ListDish.vue';

export default {
  name: 'VenueMenu',
  emits: ['view'],
  props: {
    venuePath: {
      type: String,
      required: true
    }
  },
  components: {
    NavComponent,
    HeaderComponent,
    HeaderNavigation,
    Card,
    List
  },
  data() {
    return {
      venue: {},
      venueName: '',
      categories: [],
      categoryName: '',
      selectedAllergens: [],
      allergensDish: [],
      list: true,
      listImg: false,
      visibleCategories: []
    };
  },
  mounted() {
      this.venueName = this.$route.params.venue;
      this.fetchVenueData();
      this.fetchAllergensDish();

      const storedList = sessionStorage.getItem('list');
      const storedListImg = sessionStorage.getItem('listImg');

      if (storedList) {
        this.list = JSON.parse(storedList);
        sessionStorage.removeItem('list');
      }

      if (storedListImg) {
        this.listImg = JSON.parse(storedListImg);
        sessionStorage.removeItem('listImg');
      }
    },
    methods: {
      fetchVenueData() {
        axios.get(`${process.env.VUE_APP_API_URL}/api/venues/${this.venueName}`)
        .then(response => {
          this.venue = response.data;
          const categoriesArray = Object.values(this.venue.categories);
          this.categories = categoriesArray[0];
          this.categoryName = this.categories.name;
        })
        .catch(error => {
          console.error('Errore durante il recupero dei dati del locale:', error);
        });

      },
      fetchAllergensDish() {
        axios.get(`${process.env.VUE_APP_API_URL}/api/dishes/allergens`)
        .then(response => {
          this.allergensDish = response.data;
        })
        .catch(error => {
          console.error('Errore durante il recupero degli allergeni:', error);
        });
      },
      handleUpdateCategory(category) {
        this.categories = category;
      },
      handleUpdateNameCategory(name) {
        this.categoryName = name;
      },
      handleFilterAllergen(allergenId) {
        this.selectedAllergens = allergenId;
      },
      storeDishData(dish, venueName, allergen, list, listImg) {
        sessionStorage.setItem('dish', JSON.stringify(dish));
        sessionStorage.setItem('venueName', venueName);
        sessionStorage.setItem('allergensDish', JSON.stringify(allergen));
        sessionStorage.setItem('list', list);
        sessionStorage.setItem('listImg', listImg);
      },
      handleUpdateOpenList(value) {
        this.list = value;
        this.listImg = !value;
      },
      handleUpdateOpenListImg(value) {
        this.listImg = value;
        this.list = !value;
      },
      toggleCategory(categoryId) {
        const index = this.visibleCategories.indexOf(categoryId);
        if (index > -1) {
  
          this.visibleCategories.splice(index, 1);
        } else {
          this.visibleCategories.push(categoryId);
        }
      },
      isCategoryVisible(categoryId) {
        return this.visibleCategories.includes(categoryId);
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
  overflow-y: scroll;
  scrollbar-width: none;
}

.footer {
  z-index: 0;
}

.category-container{
  margin: 20px 0;
  .categories-drink {
      font-family: var(--Decima);
      color: var(--white);
      font-size: 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      margin: 10px 0;
      height: 50px;
      display: flex;
      width: 90%;
      margin: auto;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
  }
}

.absent{
  font-family: var(--Decima);
  color: var(--text-color);
  font-size: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 0;
  height: calc(100vh - 300px);
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}


</style>