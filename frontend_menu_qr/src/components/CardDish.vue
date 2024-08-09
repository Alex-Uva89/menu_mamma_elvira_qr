<template>
    <div class="dish-item">
      <div class="dish-container" :style="{ border: `1px solid var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
        <div class="dish-background" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }"></div>
        <img :src="dish.image" alt="dish Image">
        <div class="dish-details">
            <h3>{{ dish.name }}</h3>
            <div>
                <p>{{ dish.description }}</p>
            </div>
        </div>
        </div>
        <div class="price-tag" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            {{ dish.price }} €
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
      }
    }
  }
  </script>
  
  