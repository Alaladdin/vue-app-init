<template>
  <ul class='cart__orders'>
    <li class='cart__order' v-for='product in products' :key='product.product.id'>
      <h3>{{ product.product.title }}</h3>
      <b>{{ numberFormat(product.product.price * product.amount)  }} ₽</b>
      <span>Артикул: {{ product.product.id }}</span>
    </li>
  </ul>
</template>

<style scoped>
.cart__orders {
  max-height: 500px;
  overflow: hidden auto;
}
</style>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartOrders',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    numberFormat,
  },
};
</script>
