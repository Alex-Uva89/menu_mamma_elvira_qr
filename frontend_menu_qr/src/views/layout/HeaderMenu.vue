<template>
    <div class="header-menu" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
        <router-link to="/">
            <img src="../../../public/assets/mammaelvira_2024.svg" alt="Hamburger" class="hamburger" />
        </router-link>
        <div class="logo">
            <!-- Logo del tuo sito -->
            <img :src="`/assets/${venuePath}.svg`" alt="Logo">
        </div>
        <LanguageSwitch @language-changed="changeLanguage" />
    </div>
</template>
 
<script>
import HamburgerMenu from '../../components/HamburgerMenu.vue';
import LanguageSwitch from '../../components/LanguageSwitch.vue';

export default {
    name: 'HeaderMenu',
    data() {
        return {
            currentLanguage: 'it' 
        };
    },
    props: {
        venuePath: {
            type: String,
            required: true
        }
    },
    components: {
        HamburgerMenu,
        LanguageSwitch
    },
    methods: {
    changeLanguage(newLanguage) {
      this.currentLanguage = newLanguage;
    },
  },
};
</script>

<style scoped>
.header-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    height: 80px;
}

.hamburger {
    width: 70px;
    height: 50px;
    border-radius: 5px;
}

.logo{
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo img{
    width: 125px;
}

</style>