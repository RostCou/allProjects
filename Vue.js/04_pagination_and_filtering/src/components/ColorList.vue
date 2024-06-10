<template>
    <ul>
        <li class="colors__item" v-for="color in massColors" :key="color">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" :value="color" :name="name" v-model="selectedColor">
                <span class="colors__value" :style="{ backgroundColor: color }">
                </span>
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["name", "massColors", "currentColorSelected"],
    data() {
        return {
            selectedColor: this.massColors[0]
        }
    },
    watch: {
        selectedColor(value) {
            this.$emit("update:currentColorSelected", value);
        },
        currentColorSelected() {
            if (this.currentColorSelected === "") {
                this.selectedColor = this.massColors[0]
            }
        }
    }
}
</script>