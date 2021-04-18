<template>
  <main class='content container'>
    <div class='content__top'>
      <BaseBreadcrumbs :pages='pages'/>
      <h1 class='content__title'>Корзина</h1>
      <span class='content__info'>
        {{ totalProducts }}
        {{ declinationFormat(totalProducts, ['товар', 'товара', 'товаров']) }}
      </span>
    </div>

    <section class='cart'>
      <form class='cart__form form' @submit.prevent='order'>
        <div class='cart__field'>
          <div class='cart__data'>
            <BaseFormInput
              v-model='formData.name'
              title='ФИО'
              name='name'
              placeholder='Введите ваше полное имя'
              :error='formError.name'
            />

            <BaseFormInput
              v-model='formData.address'
              title='Адрес доставки'
              name='address'
              placeholder='Введите ваш адрес'
              :error='formError.address'
            />

            <BaseFormInput
              v-model='formData.phone'
              type='tel'
              title='Телефон'
              name='phone'
              placeholder='Введите ваш телефон'
              :error='formError.phone'
            />

            <BaseFormInput
              v-model='formData.email'
              type='email'
              title='Email'
              name='email'
              placeholder='Введите ваш Email'
              :error='formError.email'
            />

            <BaseFormTextarea
              v-model='formData.comment'
              title='Комментарий к заказу'
              :error='formError.comment'
              placeholder='Ваши пожелания'
              name='comment'
            />
          </div>

          <div class='cart__options'>
            <CartDeliveryOption/>
            <CartPaymentOption/>
          </div>
        </div>

        <div class='cart__block'>

          <CartOrders :products='cartDetailProducts'/>

          <CartTotal :total-products='cartDetailProducts.length' :total-price='cartTotalPrice'/>

          <button class='cart__button button button--primery' type='submit' :disabled='isOrdering'>
            Оформить заказ
          </button>
        </div>
        <CartError :message='formErrorMessage' v-if='formErrorMessage'/>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import BaseFormInput from '@/components/Base/BaseFormInput.vue';
import BaseFormTextarea from '@/components/Base/BaseFormTextarea.vue';
import CartError from '@/components/Cart/CartError.vue';
import CartOrders from '@/components/Cart/CartOrders.vue';
import CartTotal from '@/components/Cart/CartTotal.vue';
import CartDeliveryOption from '@/components/Cart/CartDeliveryOption.vue';
import CartPaymentOption from '@/components/Cart/CartPaymentOption.vue';
import declinationFormat from '@/helpers/declinationFormat';

export default {
  name: 'OrderPage',
  components: {
    BaseBreadcrumbs,
    BaseFormInput,
    BaseFormTextarea,
    CartError,
    CartOrders,
    CartTotal,
    CartDeliveryOption,
    CartPaymentOption,
  },
  data() {
    return {
      formData: {
        name: 'name',
        address: 'address',
        phone: '+79211629674',
        email: 'safel48952@whipjoy.com',
        comment: 'comment',
      },
      formError: {},
      formErrorMessage: '',
      isOrdering: false,
    };
  },
  methods: {
    ...mapActions({ doOrder: 'order' }),
    declinationFormat,
    order() {
      this.isOrdering = true;
      this.formError = {};
      this.formErrorMessage = '';

      return this.doOrder({ formData: this.formData })
        .then((data) => {
          this.$router.push({ name: 'orderInfo', params: { id: data.id } });
        })
        .catch((err) => {
          this.formError = err.response.data.error.request || {};
          this.formErrorMessage = err.response.data.error.message || '';
        })
        .then(() => {
          this.isOrdering = false;
        });
    },
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),
    totalProducts() {
      return this.cartDetailProducts.length;
    },
    pages() {
      return [
        {
          name: 'cart',
          title: 'Корзина',
        },
        {
          name: 'order',
          title: 'Оформление заказа',
        },
      ];
    },
  },
};
</script>
