<template>
  <div>
    <header :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }" class="header-dish">
      <button class="buttonBack" @click="sendView()">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
        </svg>
      </button>
      <img :src="`/assets/${venueName}.png`" alt="">
    </header>
    <div class="dish-info">
      <img :src="!dish.image ? `../assets/default_${venueName}.jpg` : dish.image" alt="dish Image" class="image_view">
      <h1>{{ currentLanguage === 'it'? dish.name : currentLanguage === 'en'? dish.name_en : currentLanguage === 'fr'? dish.name_fr : dish.name}}</h1>
      <p v-if="dish.description != ''" :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">Ingredienti</p>
      <span>{{ currentLanguage === 'it'? dish.description : currentLanguage === 'en'? dish.description_en : currentLanguage === 'fr'? dish.description_fr : dish.description }}</span>
      <p v-if="pairings.length > 0" :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">abbinamenti</p>
      <ul class="container-pairings">
        <li v-for="pairing in pairings">
          {{ pairing.name }}
        </li>
      </ul>
      <!-- <p :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">i consigli della mamma</p>
      <span></span> -->
      <p v-if="filteredAllergens.length > 0" :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }" class="allergens-dish">
        {{currentLanguage === 'it'? 'Allergeni' : currentLanguage === 'en'? 'Allergens': currentLanguage === 'fr'? 'Allergènes' : 'Allergeni'}} 
      </p>
      <ul class="allergens-list">
        <template v-for="allergen in filteredAllergens">
          <li>
            <img :src="allergen.icon" alt="">
          </li>
        </template>
      </ul>
    </div>
    <footer :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }" class="footer-dish">
      <a href="http://mammaelvira.com/">
        <img src="../../public/assets/mammaelvira_2024.svg" alt="">
      </a>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewDish',
  props: {
    id: {
      type: String,
      required: true
    },
    dish: {
      type: Object,
      required: true
    },
    venueName: {
      type: String,
      required: true
    },
    allergensDish: {
      type: Object,
      required: true
    },
    list: {
      type: Boolean,
    },
    listImg: {
      type: Boolean,
    },
    categorySelected: {
      type: Object,
      required: true
    },
    currentLanguage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      allergens: [],
      list: this.list,
      listImg: this.listImg,
      pairings: []
    };
  },
  created() {
    this.fetchPairing();
    this.fetchAllergens();
  },
  methods: {
    fetchAllergens() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/allergens`)
        .then(response => {
          this.allergens = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchPairing() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/dishes/drinks/${this.id}`)
      .then(response => {
        this.pairings = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendView()  {
      sessionStorage.setItem('list', JSON.stringify(this.list));
      sessionStorage.setItem('listImg', JSON.stringify(this.listImg));
      sessionStorage.setItem('categorySelected', JSON.stringify(this.categorySelected));
      window.history.back();
    }
  },
  computed: {
    filteredAllergens() {
      return this.allergens.filter(allergen => 
        this.allergensDish.some(ad => ad.allergen_id === allergen.id && ad.dish_id === this.dish.id)
      );
    }
  },
};
</script>