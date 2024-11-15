<template>
  <section class="home">
    <article class="home-link" v-if="isHomePage">
      <h1 v-if="isHomePage" class="home-title">I Nostri Menù</h1>
      <div class="container-main">
        <VenueLink class="venue" v-for="venue in venues" :key="venue" :venue="venue" />
      </div>
      <div class="container-link-ext">
          <a href="https://www.mammaelvira.com" target="_blank" >
            www.<img src="/assets/favicon-32x32_dark.png" alt="Mamma Elvira" style="width: 30px; height: auto;">.com
          </a>
      </div>
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
  scrollbar-width: none;
  .home-title{
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--Decima); 
    font-size: 2rem;
    margin-bottom:10px;
  }
    .home-link{
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      gap: 10px;
      .container-main{
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      .container-link-ext{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
          width: 100%;
          display:flex;
          justify-content: center;
          align-items: center;
        }
      }
      a.venue{
          width: 100%;
          display: flex;
          justify-content: center;
          border: 1px solid #000;
          border-radius: 10px;
          img{
            width: 95%;
            height: auto;
          }
      }
  
      .bg-olive {
          background-color: var(--nav-La-Cucina);
      }
      .bg-gray {
          background-color: #afafaf;
      }
      .bg-red {
          background-color: var(--nav-Enoteca);
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.logo-home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (min-width: 768px) {
  #app{
    background-color: var(--mamma-stone-dark);
  }
  .home{
    width: 30vw;
    margin: 0 auto;
    border: 3px solid #000;
    box-shadow: 0 0 20px rgba(0,0,0,0.9);
    .home-link{
      justify-content: space-around;
      a {
          width: 100%;
          text-decoration: none;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 100%;
            height: auto;
          }
      }
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