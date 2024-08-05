<template>
    <header class="header-menu" :style="{ background: `var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
        <HamburgerMenu :venuePath="venuePath" />
        <div class="logo">
            <!-- Logo del tuo sito -->
            <img :src="`/assets/${venuePath}.svg`" alt="Logo">
        </div>
        <LanguageSwitch @language-changed="changeLanguage" />
    </header>
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
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    height: 60px;
}

.logo{
    width: 30%;
}

</style>