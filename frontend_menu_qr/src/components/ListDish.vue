<template>
    <ul>
        <li :style="{ borderBottom: `1px solid var(--nav-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div class="dish-list-container">
                <div class="dish-list-item">
                    <div class="dish-list-item-details">
                        <h3 class="title-dish">{{ dish.name }}</h3>
                        <p>{{ dish.description }}</p>
                    </div>
                    <div class="dish-list-item-price">
                        € {{ dish.price }}
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>    
export default {
    name: 'ListDish',
    props: {
        dish: {
            type: Object,
            required: true
        },
        venuePath: {
            type: String,
            required: true
        }
    }
}
</script>
