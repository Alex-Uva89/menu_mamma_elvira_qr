<template>
  <div>
    <div :class="isDrink? 'border-container' : ''" :style="{ borderBottom: `1px solid var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
      <div class="dish-list-container">
        <div class="dish-list-item">
          <div v-if="!isDrink" class="dish-list-item-details">
            <h3 class="title-dish" v-html="language !== 'it' && !dish.name_en ? `<span class='badge-not-translated'>Lost in traslation - </span> ${dish.name}` : (language === 'it' ? dish.name : dish.name_en)"></h3>
          </div>
          <div v-if="isDrink" class="drink-list-item-details" >
            <h3 class="title-drink">
              <span class="title-name"  v-if="dish.name">
                 {{ dish.name }}
              </span>
            </h3>
            <h4 class="title-description">
              <span v-if="dish.grape_variety">
                {{ dish.grape_variety }}
              </span>
              <span v-if="dish.producer">
                 {{ dish.producer}}
              </span>
              <span v-if="dish.vintage">
                , {{ dish.vintage }}
              </span>
            </h4>
          </div>
          <div v-if="!isDrink" class="dish-list-item-price">
             {{ dish.price }}
          </div>
          <div v-if="dish.description" class="dish-list-item-description">
            {{ language !== 'it' && !dish.description_en ? dish.description : (language === 'it' ? dish.description : dish.description_en) }}
          </div>
          <div v-if="isDrink && isWine" class="dish-list-item-price-drink">
            <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/bar.png" alt="bar" class="icon"/> {{  Math.ceil(dish.price / 4 + 1) }} | <img src="https://img.icons8.com/ios-filled/50/wine.png" alt="wine" class="icon"/> {{ dish.price }} | <img width="50" height="50" src="https://img.icons8.com/glyph-neue/64/shopping-bag--v1.png" alt="shopping-bag" class="icon"/> {{ dish.price - ( Math.ceil(dish.price / 4 + 1)) }}
          </div>
          <div v-if="isDrink && !isWine" class="dish-list-item-price-drink">
            {{ dish.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>    
export default {
  name: 'ListDish',
  props: {
    dish: {
      type: Object,
      required: true
    },
    venuePath: {
      type: String,
      required: true
    },
    isDrink: {
      type: Boolean,
      required: true
    },
    isWine: {
      type: Boolean,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  }
}
</script>