<template>
        <div :style="{ background: `var(--header-${venuePath.replace(/\s+/g, '-').replace(/,/g, '').replace(/'/g, '')})` }">
            <div class="backgroundNav">
                <div class="logo">
                    <img src="../../../public/assets/mammaelvira_2024.svg" alt="">
                </div>
                <span>
                    {{ categoryName }}
                </span>
                <AllergensButton :venuePath="venuePath" />
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

.logo{
    width: 60px;
    height: 40px;
}

</style>
