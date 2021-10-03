<template>
  <li class='cart__item product'>
    <div class='product__pic'>
      <img :src='item.product.image' width='120' height='120' :alt='item.title'>
    </div>
    <h3 class='product__title'>{{ item.product.title }}</h3>
    <p class='product__info product__info--color'>
      Цвет: <span><i :style='{ backgroundColor: colors[0].code }'>
      </i>Нежно-голубой</span>
    </p>
    <span class='product__code'>Артикул: {{ item.productId }}</span>

    <BaseCounter class='product__counter' v-model:count='amount'/>

    <b class='product__price'>{{ numberFormat(item.product.price * item.amount) }} ₽</b>

    <button class='product__del button-del' type='button' aria-label='Удалить товар из корзины'
            @click.prevent='deleteCartProduct(item.productId)'>
      <svg width='20' height='20' fill='currentColor'>
        <use xlink:href='#icon-close'></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseCounter from '@/components/Base/BaseCounter.vue';

export default {
  name: 'CartItem',
  components: { BaseCounter },
  props: {
    item: Object,
    colors: Array,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),

    numberFormat,
  },
};
</script>
