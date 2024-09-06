<template>
    <span>
        <button class="pill-button" @click="toggleShowAllergens" style="color: var(--white); font-size: 14.5px; padding: 9px 5px; width: 90px">
            {{ allergenText }}
        </button>
        <div v-if="showAllergens" class="allergens-modal" :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <ul>
                    <li v-for="allergen in allergens" :key="allergen.id" :id="allergen.id" >
                        <span :class="{'allergen': true, 'selected': isSelected(allergen)}" @click="filterAllergen(allergen)">
                            <img :src="allergen.icon" alt="">
                        </span>
                        <span>
                            {{ language === 'it' ? allergen.name : allergen.name_en }}
                        </span>
                    </li>
                </ul>
                <div class="allergenReset">
                    <button @click="resetAllergens">
                        {{ language === 'it' ? 'deseleziona tutti gli allergeni' : 'deselect all allergens' }}
                    </button>
                    <div class="nb">{{ language === 'it'? 'NB. comunicare sempre allergeni allo staff' : 'NB. always communicate allergens to the staff' }}</div>
                </div>
            </div>
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
        },
        language: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showAllergens: false,
            allergens: [],
            selectedAllergens: [],
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
    computed: {
        allergenText() {
            switch (this.language) {
                case 'it':
                return this.showAllergens ? 'applica' : 'allergeni';
                default:
                return this.showAllergens ? 'apply' : 'allergens';
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.allergens-modal {
    position: absolute;
    width: 100%;
    top: 139px;
    right: 0;
    color: var(--black);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px;
    height: calc(100vh - 140px);
    ul{
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
        li{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc(100% / 3);
            margin: 5px 0;
            span{
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }
    }
    .nb {
        color: var(--text-color);
        font-size: .7rem;
        text-align: center;
        width: 100%;
    }
}

.allergenReset{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5px;
    button{
        width: 80%;
        margin: auto;
        color: var(--white);
        padding: 5px 5px;
        border: 2px solid var(--white);
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
}
</style>