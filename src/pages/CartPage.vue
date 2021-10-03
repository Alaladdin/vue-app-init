<template>
  <main class='content container'>
    <div class='content__top'>
      <BaseBreadcrumbs :pages='pages'/>
      <h1 class='content__title'>Корзина</h1>
      <span class='content__info'>
        {{ cartTotalProducts }}
        {{ declinationFormat(cartTotalProducts, ['товар', 'товара', 'товаров']) }}
      </span>
    </div>

    <section class='cart'>
      <form class='cart__form form' action='#' method='POST'>
        <div class='cart__field'>
          <ul class='cart__list'>
            <CartItem
              v-for='item in cartDetailProducts'
              :item='item'
              :key='item.productId'
              :colors='item.product.colors'
            />
          </ul>
        </div>

        <div class='cart__block'>
          <p class='cart__desc'>Мы посчитаем стоимость доставки на следующем этапе</p>
          <p class='cart__price'>Итого: <span>{{ cartTotalPrice }} ₽</span></p>
          <router-link
            v-if='cartTotalProducts'
            class='cart__button button button--primery' tag='button' :to='{ name: "order" }'>
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import declinationFormat from '@/helpers/declinationFormat';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import CartItem from '@/components/Cart/CartItem.vue';

export default {
  name: 'CartPage',
  components: {
    BaseBreadcrumbs,
    CartItem,
  },
  filters: {
    numberFormat,
  },
  methods: {
    declinationFormat,
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),

    cartTotalProducts() {
      return this.cartDetailProducts.length;
    },
    pages() {
      return [
        {
          name: 'cart',
          title: 'Корзина',
        },
      ];
    },
  },
};
</script>
