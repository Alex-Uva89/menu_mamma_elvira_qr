<template>
        <div :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div class="backgroundNav">
                <div class="logo">
                    <img src="../../../public/assets/mammaelvira_2024.svg" alt="">
                </div>
                <span class="categoryName">
                    {{ categoryName }}
                </span>
                <AllergensButton :venuePath="venuePath" @filter-allergen="handleFilterAllergen" />
            </div>
            <div v-if="selectedAllergens.length > 0" class="allergenFilter">
                Filtri attivi:
                <div>
                    <img v-for="allergen in selectedAllergens" :key="allergen.id":src="allergen.icon" alt="">
                </div>
            </div>
        </div>
</template>

<script>
import AllergensButton from '../../components/AllergensButton.vue'


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
        }
    },
    components: {
        AllergensButton
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
        }
    },
}

</script>

<style lang="scss" scoped>

.backgroundNav{
    font-family: var(--Decima);
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 0 5px;
    height: 60px;
    width: 100%;
    transition: all 0.3s;
    z-index: 0;
    font-size: 1.5rem;
    text-transform: uppercase;
}
.allergenFilter{
    font-family: var(--Decima);
    width: 100%;
    min-height: 50px;
    backdrop-filter: contrast(0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    img{
        width: 40px;
    }
}

.categoryName{
    letter-spacing: -2px;
}

.logo{
    width: 60px;
    height: 40px;
}

</style>
