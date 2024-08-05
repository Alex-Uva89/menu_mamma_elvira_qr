<template>
    <div class="language-switch">
      <button @click="toggleLanguage" class="pill-button">
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
  
  .pill-button {
    background-color: var(--white);
    border: none;
    color: var(--text-color);
    padding: 5px 10px;
    border-radius: 50px;
    cursor: pointer;
    font-family: var(--Decima);
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .pill-button:hover {
    background-color: var(--mamma-stone);
  }
  </style>
  