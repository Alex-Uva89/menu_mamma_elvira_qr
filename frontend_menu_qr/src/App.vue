<template>
  <section class="home">
    <article class="home-link" v-if="isHomePage">
      <h1 v-if="isHomePage" class="home-title">I Nostri Menù</h1>
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
  overflow: auto;
  .home-title{
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-family: var(--Decima); 
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom:10px;
  }
  .home-link{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    a {
        width: 60vw ;
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
        background-color: rgb(107, 114, 56);
    }
    .bg-gray {
        background-color: rgb(150, 150, 150);
    }
    .bg-red {
        background-color: rgb(165, 26, 26);
    }
    
  }
  .pill-button {
  border: 1px solid var(--white);
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 50px;
  cursor: pointer;
  font-family: var(--Decima);
  font-size: 16px;
  transition: background-color 0.3s;
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
      } else if (routeName.startsWith('/') && isNaN(routeName.replace('/', ''))) {
        title = 'Menu - ' + decodeURIComponent(routeName.replace('/', ''));
        favicon.href = `${routeName}.ico`;
      } else {
        title = '';
        favicon.href = '';
      }
          document.title = title;
      }
    }
  };
  </script>