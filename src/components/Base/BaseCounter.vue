<template>
  <div class='form__counter'>
    <button type='button' aria-label='Убрать один товар'
            @click.prevent='updateCounter(currentCount - 1)'>
      <svg width='10' height='10' fill='currentColor'>
        <use xlink:href='#icon-minus'></use>
      </svg>
    </button>
    <input type='number' :min='min' :max='max' name='count' v-model.number='currentCount'>
    <button type='button' aria-label='Добавить один товар'
            @click.prevent='updateCounter(currentCount + 1)'>
      <svg width='10' height='10' fill='currentColor'>
        <use xlink:href='#icon-plus'></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseCounter',
  props: {
    max: Number,
    count: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentCount: this.count,
    };
  },
  watch: {
    currentCount(value) {
      // keep out of bounds
      if (this.min && value < this.min) this.currentCount = this.min;
      if (this.max && value > this.max) this.currentCount = this.max;
      this.$emit('update:count', parseInt(value, 10));
    },
  },
  methods: {
    updateCounter(value) {
      this.currentCount = value;
    },
  },
};
</script>
