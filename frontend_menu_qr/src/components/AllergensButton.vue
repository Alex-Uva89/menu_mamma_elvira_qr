<template>
    <span>
        <button class="pill-button" @click="toggleShowAllergens" style="color: var(--white); font-size: 14.5px;">Allergeni</button>
        <div v-if="showAllergens" class="allergens-modal" :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <ul>
                <li v-for="allergen in allergens" :key="allergen.id">
                    <img :src="allergen.icon" alt="">
                </li>
            </ul>
            <div class="nb">NB. comunicare sempre alergeni allo staff</div>
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
            allergens: []
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
        }
    },
    
}
</script>


<style lang="scss" scoped>
.allergens-modal {
    position: absolute;
    width: 100%;
    height: calc(100vh - 140px);
    top: 139px;
    right: 0;
    color: var(--black);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: start;
        img{
            fill: var(--black);
        }
    }
    .nb {
        position: fixed;
        bottom: 50px;
        font-size: .9rem;
        text-align: center;
        width: 100%;
    }
}
</style>