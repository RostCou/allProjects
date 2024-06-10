<template>
    <li>
        <router-link class="catalog__pic" href="#" :to="{ name: 'product', params: { id: product.id } }">
            <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
            <router-link href="#" :to="{ name: 'product', params: { id: product.id } }">
                {{ product.title }}
            </router-link>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat }}
        </span>

        <ColorList class="colors colors--black" :mass-colors="product.colors" :name="'product_' + product.id" />
    </li>
</template>

<script>
import ColorList from '@/components/ColorList.vue';
import numberFormat from '@/helpers/numberFormat.js';

export default {
    components: { ColorList },
    props: ["product"],
    filters: {
        numberFormat
    }
}
</script>