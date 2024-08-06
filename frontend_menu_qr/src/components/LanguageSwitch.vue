<template>
    <div class="language-switch">
      <button @click="toggleLanguage" class="pill-button" style="background-color: var(--white);">
        {{ currentLanguage === 'it' ? 'ENG' : 'ITA' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: 'it',
      };
    },
    methods: {
      toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'it' ? 'en' : 'it';
        this.$emit('language-changed', this.currentLanguage);
      },
    },
  };
  </script>
  
  <style scoped>
  .language-switch {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pill-button:hover {
    background-color: var(--mamma-stone);
  }
  </style>
  