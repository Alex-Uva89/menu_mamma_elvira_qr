<template>
  <section class="home">
    <h1 v-if="isHomePage" class="home-title">I Nostri Menù</h1>
    <article class="home-link" v-if="isHomePage">
      <VenueLink v-for="venue in venues" :key="venue" :venue="venue" />
    </article>
    <router-view v-if="!isHomePage"/>
  </section>
</template>

<style lang="scss">

.home{
  height: 100vh;
  width: 100%;
  background-color: var(--mamma-stone);
  .home-title{
    font-size: 2rem;
    text-transform: uppercase;
  }
  .home-link{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    a {
        width: 300px;
        height: 200px;
        padding: 30px;
        border: 1px solid #000;
        border-radius: 5px;
        text-decoration: none;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bg-olive {
        background-color: olive;
    }
    .bg-gray {
        background-color: gray;
    }
    .bg-red {
        background-color: red;
    }
  }
}


</style>

<script>
  import VenueLink from './views/VenueLinkComponent.vue';
  import axios from 'axios';
  
  export default {
    components: {
      VenueLink,
    },
    data() {
      return {
        venues: [],
      };
    },
    mounted() {
        axios.get(`${process.env.VUE_APP_API_URL}/api/venues`)
        .then(response => {
          this.venues = response.data;

        })
        .catch(error => {
          console.error('Errore durante il recupero dei locali:', error);
        });

        this.updateMeta();
    },
    computed: {
      isHomePage() {
        return this.$route.path === '/';
      },
    },
    watch: {
      $route() {
        this.updateMeta();
      }
    },
    methods: {
      updateMeta() {
      const favicon = document.getElementById('dynamic-favicon');
      const routeName = this.$route.path;
      let title = 'Menu'; // Titolo di default

      if (routeName === '/') {
        title = 'Home - I nostri menù';
        favicon.href = `${process.env.BASE_URL}apple-touch-icon_dark.ico`;
      } else if (routeName.startsWith('/')) {
        title = 'Menu - ' + decodeURIComponent(routeName.replace('/', ''));
        favicon.href = `${routeName}.ico`;
      }

          document.title = title;
      }
    }
  };
  </script>