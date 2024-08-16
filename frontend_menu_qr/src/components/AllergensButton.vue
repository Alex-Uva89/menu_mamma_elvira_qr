<template>
    <span>
        <button class="pill-button" @click="toggleShowAllergens" style="color: var(--white); font-size: 14.5px; padding: 9px 5px; width: 90px">
            {{ showAllergens ? 'applica' : 'allergeni' }}
        </button>
        <div v-if="showAllergens" class="allergens-modal" :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div>
                <ul>
                    <li v-for="allergen in allergens" :key="allergen.id" :id="allergen.id" :class="{'allergen': true, 'selected': isSelected(allergen)}" @click="filterAllergen(allergen)">
                        <img :src="allergen.icon" alt="">
                        {{ allergen.name }}
                    </li>
                </ul>
                <div class="allergenReset">
                    <button @click="resetAllergens">
                        deseleziona tutti gli allergeni
                    </button>
                </div>
            </div>
            <div class="nb">NB. comunicare sempre allergeni allo staff</div>
        </div>
    </span>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AllergensButton',
    props: {
        venuePath: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showAllergens: false,
            allergens: [],
            selectedAllergens: []
        };
    },
    mounted() {
        this.fetchAllergens();
    },
    methods: {
        toggleShowAllergens() {
            this.showAllergens = !this.showAllergens;
        },
        fetchAllergens() {
            axios.get(`${process.env.VUE_APP_API_URL}/api/allergens`)
                .then(response => {
                    this.allergens = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        filterAllergen(allergen) {
            const index = this.selectedAllergens.findIndex(a => a.id === allergen.id);
            if (index === -1) {
                this.selectedAllergens.push(allergen);
            } else {
                this.selectedAllergens.splice(index, 1);
            }
            this.$emit('filter-allergen', this.selectedAllergens)
        },
        isSelected(allergen) {
            return this.selectedAllergens.some(a => a.id === allergen.id);
        },
        resetAllergens(){
            this.selectedAllergens = [];
            this.$emit('filter-allergen', this.selectedAllergens);
        }
    },
    
}
</script>


<style lang="scss" scoped>
.allergens-modal {
    position: absolute;
    width: 100%;
    top: 139px;
    right: 0;
    color: var(--black);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    height: calc(100vh - 160px);
    ul{
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: start;
        width: 95%;
        font-size: 1rem;
        .allergen{
            filter: contrast(.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            word-wrap: break-word;
            text-align: center;
            width: calc(100% / 4);
            &.selected{
                filter: contrast(1.5);
            }
            img{
                width: 40px;
            }
        }
    }
    .nb {
        color: var(--text-color);
        font-size: .9rem;
        text-align: center;
        width: 100%;
    }
}

.allergenReset{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button{
        color: var(--white);
        padding: 5px 10px;
        border: 2px solid var(--white);
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        text-transform: uppercase;
    }
}
</style>