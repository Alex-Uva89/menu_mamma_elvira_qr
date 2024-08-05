<template>
    <router-link :to="'/' + venue" :class="backgroundClass">
      <img :src="'./assets/' + venue + '.svg'" :alt="venue + ' logo'" />
    </router-link>
</template>
  
  <script>
  export default {
    props: {
      venue: {
        type: String,
        required: true
      }
    },
    computed: {
    backgroundClass() {
      switch (this.venue) {
        case 'La Cucina':
          return 'bg-olive';
        case "'Scante":
          return 'bg-gray';
        case 'Enoteca':
          return 'bg-red';
        default:
          return '';
      }
    }
  }
  };
  </script>
  
  <style scoped>

    

  </style>