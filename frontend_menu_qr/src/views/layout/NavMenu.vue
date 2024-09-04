<template>
<nav :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
    <ul>
      <li v-if="showDrinks && hasViniEBolle" @click="sendDataWines" :class="{ active: activeCategory === 'Vini' }">
        <span class="categories">
          {{ language === 'it'? 'Vini' : 'Wines' }}
        </span>
      </li>
      <template v-for="category in categories" :key="category.id">
            <li v-if="!category.is_drink && !showDrinks" class="categories" @click="sendDataFood(category)" :class="{ active: category.name === categoryName || activeCategory === category.name}">
              <span class="categories">
                    {{ language === 'it'? category.name : category.name_en }}
                </span>
            </li>
        </template>
        <li v-if="showDrinks && hasDistillati" @click="sendDataDistillati" :class="{ active: activeCategory === 'Distillati' }">
            <span class="categories">
                {{ language === 'it'? 'Altri Alcolici' : 'Other Spirits'  }}
            </span>
        </li>
        <li v-if="showDrinks && hasCocktails" @click="sendDataCocktails" :class="{ active: activeCategory === 'Cocktails' }">
            <span class="categories">
                cocktails
            </span>
        </li>
        <li v-if="showDrinks && hasVermouth" @click="sendDataVermouth" :class="{ active: activeCategory === 'Vermouth' }">
            <span class="categories">
                VERMOUTH    
            </span>
        </li>
        <li v-if="showDrinks && hasBeer" @click="sendDataBeer" :class="{ active: activeCategory === 'Birre' }">
            <span class="categories">
                {{ language === 'it'? 'Birre' : 'Beers' }}
            </span>
        </li>
        <li @click="toggleShowDrinks">
            <span class="categories">
                {{ textSee }}
            </span>
        </li>
    </ul>
</nav>
</template>
  
  <script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        showDrinks: false,
        wines: [],
        distillati: [],
        cocktails: [],
        foods: [],
        activeCategory: this.categoryName,
      };
    },
    props: {
      categories: {
        type: Object,
        required: true
      },
      venuePath: {
        type: String,
        required: true
      },
      categoryName: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      }
    },
    computed: {
      hasViniEBolle() {
            const bolle = Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('bolle'));
            const vini = Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('vini'));

            if( bolle || vini ) {
                return true;
            }
            return false;
      },
      hasCocktails() {
        return Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('cocktails'));
      },
      hasDistillati() {
        return Object.values(this.categories).some(category => category.is_drink && !category.name.toLowerCase().includes('vini') && !category.name.toLowerCase().includes('cocktails'));
      },
      hasVermouth() {
        return Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('vermouth'));
      },
      hasBeer() {
        return Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('birre'));
      },
      textSee() {
        switch (this.language) {
          case 'it':
            return this.showDrinks ? 'Mostra cibo' : 'Mostra bevande';
          case 'en':
            return this.showDrinks ? 'See food' : 'See drinks';
          default:
            return this.showDrinks ? 'Vedi cibo' : 'Vedi bevande';
        }
      }
    },
    methods: {
      toggleShowDrinks() {
        this.showDrinks = !this.showDrinks;
      },
      sendDataWines() {
        const bolle = Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('bolle'));
        const vini = Object.values(this.categories).some(category => category.is_drink && category.name.toLowerCase().includes('vini'));

        if( bolle && vini ) {
            this.wines = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('bolle') || category.name.toLowerCase().includes('vini'));
        } else if( bolle ) {
            this.wines = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('bolle'));
        } else {
            this.wines = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('vini'));
        }

        this.$emit('update-category', this.wines);
        this.$emit('category-name', 'Vini');
        this.activeCategory = 'Vini';
      },
      sendDataDistillati() {
        this.distillati = Object.values(this.categories).filter(category => category.is_drink && !category.name.toLowerCase().includes('vini') && !category.name.toLowerCase().includes('cocktails') && !category.name.toLowerCase().includes('vermouth') && !category.name.toLowerCase().includes('bolle') && !category.name.toLowerCase().includes('birre'));
        this.$emit('update-category', this.distillati);
        this.$emit('category-name', 'Distillati');
        this.activeCategory = 'Distillati';
      },
      sendDataCocktails() {
        this.cocktails = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('cocktails'));
        this.$emit('update-category', this.cocktails);
        this.$emit('category-name', 'Cocktails');
        this.activeCategory = 'Cocktails';
      },
      sendDataFood(category) {
        this.foods = category;
        this.$emit('update-category', this.foods);
        this.$emit('category-name', category.name);
        this.activeCategory = category.name;
      },
      sendDataVermouth() {
        this.vermouth = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('vermouth'));
        this.$emit('update-category', this.vermouth);
        this.$emit('category-name', 'Vermouth');
        this.activeCategory = 'Vermouth';
      },
      sendDataBeer() {
        this.beer = Object.values(this.categories).filter(category => category.is_drink && category.name.toLowerCase().includes('birre'));
        this.$emit('update-category', this.beer);
        this.$emit('category-name', 'Birre');
        this.activeCategory = 'Birre';
      }
    },
  };
  </script>

<style scoped>
nav {
    width: 100%;
    max-height: 150px;
    position: fixed;
    bottom: 0;
    display: flex;
    z-index: 0;
    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 3px 0;
        li {
            width: calc(50% - 4px);;
            padding: 5px;
            border: 1.8px solid #000;
            border-radius:5px;
            margin: 2px;
            text-transform: uppercase;
            cursor: pointer;
            display: flex;
            justify-content: center;
            color: var(--white);
            &.active{
                background-color: var(--button-hover);
                color: var(--text-color);
            }
        }
        li:last-child {
            width: 100%;
        }
        .categories{
            font-family: var(--Decima);
            font-size: 1rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

}

@media screen and (min-width: 768px) {
    nav {
        width: 29.7vw;
    }
  
}
</style>