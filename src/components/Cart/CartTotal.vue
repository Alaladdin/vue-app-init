<template>
  <div class='cart__total'>
    <p>Доставка: <b>{{ deliveryPrice | numberFormat }} ₽</b></p>
    <p>
      Итого: <b>{{ totalProducts }}</b>
      {{ declinationFormat(totalProducts, ['товар', 'товара', 'товаров']) }} на сумму
      <b>{{ totalPrice | numberFormat }} ₽</b>
    </p>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declinationFormat from '@/helpers/declinationFormat';

export default {
  name: 'CartTotal',
  props: {
    deliveryPrice: {
      type: [Number, String],
      default: 500,
    },
    totalProducts: {
      type: [Number, String],
      required: true,
    },
    totalPrice: {
      type: [Number, String],
      required: true,
    },
  },
  filters: {
    numberFormat,
  },
  methods: {
    declinationFormat,
  },
};
</script>
