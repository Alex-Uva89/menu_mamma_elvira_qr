<template>
  <div>
    <img :src="dish.image" alt="dish Image">
    <h1>{{ dish.name }}</h1>
    <p>{{ dish.description }}</p>
    <p>Locale: {{ venueName }}</p>
  </div>
</template>

<script>
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
    }
  }
};
</script>