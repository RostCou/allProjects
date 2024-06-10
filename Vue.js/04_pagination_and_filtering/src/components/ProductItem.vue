<template>
    <li>
        <a class="catalog__pic" href="#">
            <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
            <a href="#">
                {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price }}
        </span>

        <ColorList class="colors colors--black" :mass-colors="product.colors" :name="'product_' + product.id" />
    </li>
</template>

<script>
import ColorList from '@/components/ColorList.vue';

export default {
    components: { ColorList },
    props: ["product"]
}
</script>