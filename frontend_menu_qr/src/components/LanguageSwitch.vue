<template>
  <div class="language-switch">
    <button @click="setLanguage(otherLanguages[0])" class="pill-button right" style="background-color: var(--white);">
      {{ otherLanguages[0].toUpperCase() }}
    </button>
    <button @click="setLanguage(otherLanguages[1])" class="pill-button left" style="background-color: var(--white);">
      {{ otherLanguages[1].toUpperCase() }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'it',
      languages: ['it', 'en', 'fr'],
    };
  },
  computed: {
    otherLanguages() {
      return this.languages.filter(lang => lang !== this.currentLanguage);
    },
  },
  methods: {
    setLanguage(language) {
      this.currentLanguage = language;
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
  padding: 7px 13px;
  border: none;
  cursor: pointer;
}

.left {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 1px solid var(--text-color);
}

.right {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: 1px solid var(--text-color);
}

.pill-button:hover {
  background-color: var(--mamma-stone);
}
</style>