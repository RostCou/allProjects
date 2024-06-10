<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link :to="{ name: 'main' }" class="breadcrumbs__link" href="#">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link :to="{ name: 'cart' }" class="breadcrumbs__link" href="#">
                        Корзина
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Оформление заказа
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                Товаров: {{ products.length }}
            </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
                <div class="cart__field">
                    <div class="cart__data">

                        <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО"
                            placeholder="Введите ваше полное имя" />

                        <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки"
                            placeholder="Введите ваш адрес" />

                        <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон"
                            placeholder="Введите ваш телефон" />

                        <BaseFormText v-model="formData.email" :error="formError.email" title="Email"
                            placeholder="Введи ваш Email" />

                        <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment" :error="formError.comment"
                            placeholder="Ваши пожелания" />

                    </div>

                    <div class="cart__options">
                        <h3 class="cart__title">Доставка</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                                    <span class="options__value">
                                        Самовывоз <b>бесплатно</b>
                                    </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                                    <span class="options__value">
                                        Курьером <b>500 ₽</b>
                                    </span>
                                </label>
                            </li>
                        </ul>

                        <h3 class="cart__title">Оплата</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                                    <span class="options__value">
                                        Картой при получении
                                    </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                                    <span class="options__value">
                                        Наличными при получении
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <li class="cart__order" v-for="item of products" :key="item.productId">
                            <h3>{{ item.product.title }}</h3>
                            <b>{{ item.product.price | numberFormat }} ₽</b>
                            <span>Артикул: {{ item.productId }}</span>
                        </li>
                    </ul>

                    <div class="cart__total">
                        <p>Итого товаров: <b>{{ products.length }}</b> на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
                    </div>

                    <button class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </button>
                </div>
                <div class="cart__error form__error-block" v-if="formErrorMassage">
                    <h4>Заявка не отправлена!</h4>
                    <p>
                        {{ formErrorMassage }}
                    </p>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';

export default {
    components: { BaseFormText, BaseFormTextarea },
    filters: { numberFormat },
    data() {
        return {
            formData: {},
            formError: {},
            formErrorMassage: ""
        }
    },
    methods: {
        order() {
            this.formError = {};
            this.formErrorMassage = "";

            axios
                .post(API_BASE_URL + "/api/orders", {
                    ...this.formData
                }, {
                    params: {
                        userAccessKey: this.$store.state.userAccessKey
                    }
                })
                .then(response => {
                    this.$store.commit("resetCart");
                    this.$store.commit("updateOrderInfo", response.data);
                    this.$router.push({ name: "orderInfo", params: { id: response.data.id } });
                })
                .catch(error => {
                    this.formError = error.response.data.error.request || {};
                    this.formErrorMassage = error.response.data.error.message;
                })
        }
    },
    computed: {
        ...mapGetters({ products: "cartDetailProducts", totalPrice: "cartTotalPrice" })
    }
}
</script>