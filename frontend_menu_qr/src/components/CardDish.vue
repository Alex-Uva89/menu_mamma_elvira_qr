<template>
    <div class="dish-item">
      <div class="dish-container">
        <div class="dish-background"></div>
        <img :src="dish.image" alt="dish Image">
        <div class="dish-details">
            <h3>{{ dish.name }}</h3>
            <div>
                <p>{{ dish.description }}</p>
            </div>
        </div>
        </div>
        <div class="price-tag">
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
      }
    }
  }
  </script>
  
  