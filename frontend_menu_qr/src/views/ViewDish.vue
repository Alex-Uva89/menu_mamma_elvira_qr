<template>
  <div>
    <header :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }" class="header-dish">
      <img :src="`/assets/${venueName}.svg`" alt="">
    </header>
    <img :src="dish.image" alt="dish Image">
    <div class="dish-info">

      <h1>{{ dish.name }}</h1>
      <p :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">Ingredienti</p>
      <span>{{ dish.description }}</span>
      <p :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">abbinamenti</p>
      <span></span>
      <p :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">i consigli della mamma</p>
      <span></span>
      <p :style="{ background: `var(--nav-${venueName.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }" class="allergens-dish">
        allergeni
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
    }
  },
  data() {
    return {
      allergens: []
    };
  },
  created() {
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