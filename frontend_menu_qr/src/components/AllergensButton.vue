<template>
    <span>
        <button class="allergens-button" @click="toggleShowAllergens">Allergeni</button>
        <div v-if="showAllergens" class="allergens">
            <ul>
                <li v-for="allergen in allergens" :key="allergen.id">
                    {{ allergen.name }}
                </li>
            </ul>
        </div>
    </span>
</template>

<script>
export default {
    name: 'AllergensButton',
    props: {
        allergens: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showAllergens: false
        };
    },
    methods: {
        toggleShowAllergens() {
            this.showAllergens = !this.showAllergens;
        }
    }
}
</script>

<style>

.allergens-button {
    background-color: var(--nav-venue);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
</style>