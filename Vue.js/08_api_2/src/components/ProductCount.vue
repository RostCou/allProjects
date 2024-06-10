<template>
    <div>
        <button type="button" aria-label="Убрать один товар" @click="changeCount(productCount - 1)">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" v-model.number="productCount" name="count" @input="changeCount(productCount)">

        <button type="button" aria-label="Добавить один товар" @click="changeCount(productCount + 1)">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: ["value"],
    data() {
        return {
            productCount: this.value
        }
    },
    methods: {
        changeCount(value) {
            this.productCount = value;
            this.$emit('update:value', value);
        }
    }
}
</script>