<template>
    <ul>
        <li class="colors__item" v-for="color in massColors" :key="color.id">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" :value="color.code" :name="name" v-model="selectedColor">
                <span class="colors__value" :style="{ backgroundColor: color.code }">
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
            selectedColor: this.massColors[0].code
        }
    },
    watch: {
        selectedColor(value) {
            this.$emit("update:currentColorSelected", value);
        },
        currentColorSelected() {
            if (this.currentColorSelected === "") {
                this.selectedColor = this.massColors[0].code;
            }
        }
    }
}
</script>