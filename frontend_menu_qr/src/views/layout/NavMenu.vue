<template>
<nav :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">      <ul>
            <li v-if="showDrinks && hasVini" @click="sendDataWines">
                <span class="categories">
                    VINI
                </span>
            </li>
            <template v-for="category in categories" :key="category.id">
                <li v-if="!category.is_drink && !showDrinks" class="categories" @click="sendDataFood(category)">
                    <span class="categories">
                        {{ category.name }}
                    </span>
                </li>
            </template>
            <li v-if="showDrinks && hasDistillati"  @click="sendDataDistillati">
                <span class="categories">
                    DISTILLATI
                </span>
            </li>
            <li v-if="showDrinks && hasDrink"  @click="sendDataCocktails">
                <span class="categories">
                    COCKTAILS
                </span>
            </li>
            <li @click="toggleShowDrinks">
                <span class="categories">
                    {{ showDrinks ? 'Show Food' : 'Show Beverages' }}
                </span>
            </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavMenu',
    props: {
        categories: {
            type: Array,
            required: true
        },
        venuePath: {
            type: String,
            required: true
        }
    },
    data() {
      return {
        showDrinks: false,
        wines: [],
        distillati: [],
        cocktails: [],
        foods: []
      };
    },
    methods: {
        hasVini() {
          return this.categories.some(category => category.is_drink && category.name.toLowerCase().includes('vini'));
        },
        hasDrink() {
            return this.categories.some(category => category.is_drink && category.name.toLowerCase().includes('cocktails'));
        },
        hasDistillati() {
            return this.categories.filter(category => category.is_drink && !category.name.toLowerCase().includes('vini') && !category.name.toLowerCase().includes('cocktails'));        
        },
        toggleShowDrinks() {
            this.showDrinks = !this.showDrinks;
        },
        sendDataWines() {
            this.wines = Object.values(this.categories)
                .filter(category => category.is_drink && category.name.toLowerCase().includes('vini'));
            this.$emit('update-category', this.wines);
            this.$emit('category-name', 'Vini');
        },
        sendDataDistillati() {
            this.distillati = Object.values(this.categories)
                .filter(category => category.is_drink && !category.name.toLowerCase().includes('vini') && !category.name.toLowerCase().includes('cocktails'));
            this.$emit('update-category', this.distillati);
            this.$emit('category-name', 'Distillati');
        
        },
        sendDataCocktails() {
            this.cocktails = Object.values(this.categories)
                .filter(category => category.is_drink && category.name.toLowerCase().includes('cocktails'));
            this.$emit('update-category', this.cocktails);
            this.$emit('category-name', 'Cocktails');
        },
        sendDataFood(category) {
            this.foods = category;
            this.$emit('update-category', this.foods);
            this.$emit('category-name', category.name);
        }
    }
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
        }
        li:last-child {
            width: 100%;
        }
        .categories{
            color: var(--white);
            font-family: var(--Decima);
            font-size: 1rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>