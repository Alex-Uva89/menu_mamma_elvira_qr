<template>
  <div>
    <div :class="isDrink? 'border-container' : ''" :style="{ borderBottom: `1px solid var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
      <div class="dish-list-container">
        <div class="dish-list-item">
          <div :class="isDrink? 'drink-list-item-details' : 'dish-list-item-details'">
            <h3 class="title-dish">{{ dish.name }}</h3>
          </div>
          <div v-if="!isDrink" class="dish-list-item-price">
             {{ dish.price }}
          </div>
          <div v-if="dish.description" class="dish-list-item-description">
            {{  dish.description }}
          </div>
          <div v-if="isDrink && isWine" class="dish-list-item-price-drink">
            <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/bar.png" alt="bar" class="icon"/> {{  Math.ceil(dish.price / 4 + 1) }} | <img src="https://img.icons8.com/ios-filled/50/wine.png" alt="wine" class="icon"/> {{ dish.price }} | <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/shopping-bag.png" alt="shopping-bag" class="icon"/> {{ dish.price - ( Math.ceil(dish.price / 4 + 1)) }}
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
    }
  }
}
</script>