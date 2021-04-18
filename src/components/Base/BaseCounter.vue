<template>
  <div class='form__counter'>
    <button type='button' aria-label='Убрать один товар'
            @click.prevent='updateCounter(currentCount - 1)'>
      <svg width='10' height='10' fill='currentColor'>
        <use xlink:href='#icon-minus'></use>
      </svg>
    </button>
    <input type='number' min='1' name='count' v-model.number='currentCount'>
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
    count: {
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
      this.$emit('update:count', value);
    },
  },
  methods: {
    updateCounter(value) {
      if (value <= 0) return;
      this.currentCount = value;
    },
  },
};
</script>
