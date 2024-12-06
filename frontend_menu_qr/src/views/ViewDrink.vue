<template>
  <div>
    <header :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }"
      class="header-dish">
      <button class="buttonBack" @click="sendView()">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
          class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </button>
      <img :src="`/assets/${venueName}.png`" alt="">
    </header>


    <div class="dish-info">
      <section>

        <img :src="!dish.image ? `../assets/default_${venueName}.jpg` : dish.image" alt="dish Image" class="image_view">
        <h1>{{ dish.name }}</h1>
        <p v-if="dish.description"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Ingredienti</p>
        <span v-if="dish.description">{{ dish.description }}</span>
        <p v-if="dish.instructions"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Descrizione</p>
        <span v-if="dish.instructions">{{ dish.instructions }}</span>
        <p v-if="dish.degrees"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Gradi</p>
        <span v-if="dish.degrees">{{ dish.degrees }}</span>
        <p v-if="dish.origin"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Origine</p>
        <span v-if="dish.origin">{{ dish.origin }}</span>
        <p v-if="dish.color"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Colore</p>
        <span v-if="dish.color">{{ dish.color }}</span>
        <p v-if="dish.production_method"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Metodo di produzione</p>
        <span v-if="dish.production_method">{{ dish.production_method }}</span>
        <p v-if="dish.flavour"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Gusto</p>
        <span v-if="dish.flavour">{{ dish.flavour }}</span>
        <p v-if="dish.producer"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Produttore</p>
        <span v-if="dish.producer">{{ dish.producer }}</span>
        <p v-if="dish.grape_variety"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Vitigno</p>
        <span v-if="dish.grape_variety">{{ dish.grape_variety }}</span>
        <p v-if="dish.denomination"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Denominazione</p>
        <span v-if="dish.denomination">{{ dish.denomination }}</span>
        <p v-if="dish.vintage"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Annata</p>
        <span v-if="dish.vintage">{{ dish.vintage }}</span>
        <p v-if="dish.breeding_method"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Metodo di allevamento</p>
        <span v-if="dish.breeding_method">{{ dish.breeding_method }}</span>
        <p v-if="dish.format"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Formato</p>
        <span v-if="dish.format">{{ dish.format }}</span>
        <p v-if="dish.serving_temperature"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Temperatura di servizio</p>
        <span v-if="dish.serving_temperature">{{ dish.serving_temperature }}</span>
        <p v-if="dish.nose"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Olfatto</p>
        <span v-if="dish.nose">{{ dish.nose }}</span>
        <p v-if="dish.certifitations"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          Certificazioni</p>
        <span v-if="dish.certifications">{{ dish.certifitations }}</span>
        <p v-if="filteredAllergens.length > 0"
          :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }"
          class="allergens-dish">
          allergeni
        </p>
        <ul class="allergens-list">
          <template v-for="allergen in filteredAllergens">
            <li>
              <img :src="allergen.icon" alt="">
            </li>
          </template>
        </ul>
      </section>
      <section>
        <div v-if="dish.url">
          <button
            :style="{ borderColor: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <a :href="dish.url" target="_blank" rel="noopener noreferrer">Fattelo inviare a casa</a>
          </button>
        </div>
      </section>
    </div>



    <footer :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }"
      class="footer-dish">
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
    sendView() {
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