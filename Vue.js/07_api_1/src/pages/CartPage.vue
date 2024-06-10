<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Корзина
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                Всего товаров: {{ products.length }}
            </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <ul class="cart__list">
                        <CardItem v-for="item in products" :key="item.productId" :item="item" />
                    </ul>
                </div>

                <div class="cart__block">
                    <p class="cart__desc">
                        Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
                    </p>
                    <p class="cart__price">
                        Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
                    </p>

                    <button class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </button>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import CardItem from '@/components/CardItem';
import numberFormat from '@/helpers/numberFormat';
import products from '@/data/products';
import { mapGetters } from 'vuex';

export default {
    components: { CardItem },
    data() {
        return {
            productAmount: 1
        }
    },
    filters: { numberFormat },
    computed: {
        ...mapGetters({ products: "cartDetailProducts", totalPrice: "cartTotalPrice" })
    }
}
</script>