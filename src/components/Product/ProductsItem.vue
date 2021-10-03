<template>
  <li class='catalog__item'>
    <router-link class='catalog__pic' :to='{ name : "product", params: { id : product.id } }'>
      <img :src='product.image' :alt='product.title'>
    </router-link>

    <h3 class='catalog__title'>
      <router-link :to='{ name : "product", params: { id : product.id } }'>
        {{ product.title }}
      </router-link>
    </h3>

    <span class='catalog__price'>{{ product.price }} ₽</span>

    <BaseColorsToggler
      class='colors--black'
      :colors='product.colors'
      v-model:selectedColor='selectedColor'
    />
  </li>
</template>

<script>
import BaseColorsToggler from '@/components/Base/BaseColorsToggler.vue';

export default {
  name: 'ProductItem',
  components: {
    BaseColorsToggler,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      selectedColor: 0,
    };
  },
  watch: {
    selectedColor(value) {
      this.selectedColor = value;
    },
  },
  created() {
    this.selectedColor = this.product.colors[0].id;
  },
};
</script>
