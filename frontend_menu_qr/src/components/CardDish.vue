<template>
    <div class="dish-item">
      <div class="dish-container" :style="{ border: `1px solid var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
        <div class="dish-background" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }"></div>
        <img :src="dish.image === 'null' || !dish.image ? `assets/default_${venuePath}.jpg` : dish.image" alt="dish Image">        
        <div class="dish-details">
          <h3 class="title-dish" v-html="language !== 'it' && !dish.name_en ? `<span class='badge-not-translated'>Lost in traslation - </span> ${dish.name}` : (language === 'it' ? dish.name : dish.name_en)"></h3>
        </div>
        </div>
        <div v-if="!isDrink" class="price-tag" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          {{ dish.price }}
        </div>
        <div v-if="isDrink && isWine" class="price-tag-drink" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/bar.png" alt="bar" class="icon"/> {{ Math.ceil(dish.price / 4 + 1) }} | <img src="https://img.icons8.com/ios-filled/50/wine.png" alt="wine" class="icon"/> {{ dish.price }} | <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/shopping-bag.png" alt="shopping-bag" class="icon"/> {{ dish.price - ( Math.ceil(dish.price / 4 + 1)) }}
        </div>
        <div v-if="isDrink && !isWine" class="price-tag-drink" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
          {{ dish.price }}
        </div>

    </div>
  </template>
  
  <script>
  export default {
    name: 'CardDish',
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
  
  