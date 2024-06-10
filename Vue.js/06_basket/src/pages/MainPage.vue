<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
                152 товара
            </span>
        </div>

        <div class="content__catalog">
            <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                :category-id.sync="filterCategoryId" :color.sync="filterColor" />
            <section class="catalog">
                <ProductList :products="products" />
                <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage" />
            </section>
        </div>
    </main>
</template>

<script>
import products from "@/data/products.js";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";

export default {
    components: { ProductList, BasePagination, ProductFilter },
    data() {
        return {
            filterPriceFrom: 0,
            filterPriceTo: 0,
            filterCategoryId: 0,
            page: 1,
            productPerPage: 3,
            filterColor: ""
        }
    },
    computed: {
        filteredProducts() {
            let filteradProducts = products;

            if (this.filterPriceFrom > 0) {
                filteradProducts = filteradProducts.filter(product => product.price > this.filterPriceFrom)
            }

            if (this.filterPriceTo > 0) {
                filteradProducts = filteradProducts.filter(product => product.price < this.filterPriceTo)
            }

            if (this.filterCategoryId > 0) {
                filteradProducts = filteradProducts.filter(product => product.categoryId === this.filterCategoryId)
            }

            if (this.filterColor != "") {
                filteradProducts = filteradProducts.filter(product => product.colors.includes(this.filterColor))
            }

            return filteradProducts;
        },
        products() {
            const offset = (this.page - 1) * this.productPerPage;
            return this.filteredProducts.slice(offset, offset + this.productPerPage);
        },
        countProducts() {
            return this.filteredProducts.length;
        }
    }
}
</script>