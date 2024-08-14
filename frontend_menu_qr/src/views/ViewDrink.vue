<template>
    <div class="view-drink">
        <div class="drink">
            <div class="drink-image">
                <img :src="drink.image" alt="drink" />
            </div>
            <div class="drink-info">
                <h2>{{ drink.name }}</h2>
                <p>{{ drink.description }}</p>
                <p>{{ drink.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ViewDrink',
    props: {
        drink: {
            type: Object,
            required: true
        },
        pairings: {
            type: Array,
            required: true
        }
    }
};
</script>