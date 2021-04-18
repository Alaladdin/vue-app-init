<template>
  <ul class='colors'>
    <li class='colors__item' v-for='color in colors' :key='color.id' :title='color.title'>
      <label class='colors__label'>
        <input
          class='colors__radio sr-only'
          type='radio'
          :value='color.id'
          v-model='currentColor'
        >
        <span class='colors__value' :style='{ backgroundColor : color.code }'></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseColorsToggler',
  props: {
    selectedColor: Number,
    colors: {
      type: Array,
      required: true,
    },
  },
  watch: {
    currentColor(value) {
      this.$emit('update:selectedColor', value);
    },
  },
  data() {
    return {
      currentColor: this.selectedColor,
    };
  },
};
</script>
