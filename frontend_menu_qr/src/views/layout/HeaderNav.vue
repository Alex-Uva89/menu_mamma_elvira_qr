<template>
    <div :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
        <div class="backgroundNav">
            <select-view :list="list" :listImg="listImg" :openList="openList" :openListImg="openListImg"
                @openList="updateOpenList" @openListImg="updateOpenList" />
            <span class="categoryName">
                {{ categoryText }}
            </span>
            <AllergensButton :language="language" :venuePath="venuePath" @filter-allergen="handleFilterAllergen" />
        </div>
        <div v-if="selectedAllergens.length > 0" class="allergenFilter">
            {{ language === 'it' ? 'Allergeni esclusi:' :
                language === 'en' ? 'Excluded allergens:' :
                    language === 'fr' ? 'Allergènes exclus:' :
                        'Allergeni esclusi:' }}
            <div>
                <img v-for="allergen in selectedAllergens" :key="allergen.id" :src="allergen.icon" alt=""
                    @click="deleteFilterAllergen(allergen)">
            </div>
        </div>
    </div>
</template>

<script>
import AllergensButton from '../../components/AllergensButton.vue'
import SelectView from '../../components/SelectView.vue';


export default {
    name: 'HeaderNavigation',
    props: {
        venuePath: {
            type: String,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        },
        categoryName_en: {
            type: String,
            required: true
        },
        categoryName_fr: {
            type: String,
            required: true
        },
        list: {
            type: Boolean,
            required: true
        },
        listImg: {
            type: Boolean,
            required: true
        },
        language: {
            type: String,
            required: true
        }
    },
    components: {
        AllergensButton,
        SelectView
    },
    data() {
        return {
            selectedAllergens: [],
        };
    },
    methods: {
        handleFilterAllergen(allergenId) {
            this.selectedAllergens = allergenId;
            this.$emit('filter-allergen', this.selectedAllergens);
        },
        deleteFilterAllergen(allergen) {
            const index = this.selectedAllergens.findIndex(a => a.id === allergen.id);
            if (index !== -1) {
                this.selectedAllergens.splice(index, 1);
                this.$emit('filter-allergen', this.selectedAllergens);
            }
        },
        updateOpenList(value) {
            this.$emit('update-open-list', value);
            this.$emit('update-open-list-img', !value);
        },
        updateOpenListImg(value) {
            this.$emit('update-open-list-img', value);
            this.$emit('update-open-list', !value);
        }
    },
    computed: {
        categoryText() {
            const translations = {
                Vini: { it: 'Vini', en: 'Wines', fr: 'Vins' },
                Distillati: { it: 'Altri Alcolici', en: 'Other Spirits', fr: 'Autres Spiritueux' },
                Birre: { it: 'Birre', en: 'Beers', fr: 'Bières' },
                Cocktails: { it: 'Cocktails', en: 'Cocktails', fr: 'Cocktails' },
                Vermouth: { it: 'Vermouth', en: 'Vermouth', fr: 'Vermouth' },
            };

            const defaultTranslation = { it: this.categoryName, en: this.categoryName_en || this.categoryName, fr: this.categoryName_fr || this.categoryName };

            const translation = translations[this.categoryName] || defaultTranslation;
            return translation[this.language] || translation.it;
        }
    }
}

</script>

<style lang="scss" scoped>
.backgroundNav {
    font-family: var(--Decima);
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 5px;
    height: 60px;
    width: 100%;
    transition: all 0.3s;
    z-index: 0;
    font-size: 1.5rem;
    text-transform: uppercase;
}

.allergenFilter {
    font-family: var(--Decima);
    width: 100%;
    min-height: 50px;
    backdrop-filter: contrast(0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    img {
        width: 40px;
    }
}

.categoryName {
    width: calc(100% / 3);
    overflow: hidden;
    white-space: wrap;
    font-size: 16px;
    text-align: center;
    line-height: 1rem;
}
</style>
