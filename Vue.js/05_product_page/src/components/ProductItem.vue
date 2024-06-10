<template>
    <li>
        <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
            <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
            <a href="#" @click.prevent="gotoPage('product', {id: product.id})">
                {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat }}
        </span>

        <ColorList class="colors colors--black" :mass-colors="product.colors" :name="'product_' + product.id" />
    </li>
</template>

<script>
import ColorList from '@/components/ColorList.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat.js';

export default {
    components: { ColorList },
    props: ["product"],
    filters: {
        numberFormat
    },
    methods: {
        gotoPage
    }
}
</script>