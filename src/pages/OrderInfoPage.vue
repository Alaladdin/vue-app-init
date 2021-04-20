<template>
  <main class='content container'>
    <div class='alert alert--success' v-if='isLoading'>Загрузка заказа...</div>
    <div class='alert alert--error' v-else-if='error'>{{ error }}</div>
    <div v-else>
      <div class='content__top'>
        <BaseBreadcrumbs :pages='pages'/>
        <h1 class='content__title'>Заказ оформлен <span>№ {{ orderData.id }}</span></h1>
      </div>

      <section class='cart'>
        <form class='cart__form form' action='#' method='POST'>
          <div class='cart__field'>
            <p class='cart__message'>
              Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
              Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
            </p>

            <ul class='dictionary'>
              <BaseDictionaryItem title='Получатель' :value='orderData.name'/>
              <BaseDictionaryItem title='Адрес доставки' :value='orderData.address'/>
              <BaseDictionaryItem title='Телефон' :value='orderData.phone'/>
              <BaseDictionaryItem title='Email' :value='orderData.email'/>
              <BaseDictionaryItem title='Способ оплаты' value='картой при получении'/>
              <BaseDictionaryItem
                v-if='orderData.comment'
                title='Комментарий'
                :value='orderData.comment'/>
            </ul>
          </div>

          <div class='cart__block'>
            <CartOrders :products='orderData.basket.items'/>
            <CartTotal
              :total-price='orderData.totalPrice'
              :total-products='orderData.basket.items.length'
            />
          </div>

          <BaseAlert
            title='Статус заказа'
            :status='orderData.status.code'
            :body='orderData.status.title'
          />

        </form>
      </section>
    </div>
  </main>
</template>

<style lang='scss'>
@import '../../public/scss/index';
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import BaseDictionaryItem from '@/components/Base/BaseDictionaryItem.vue';
import BaseAlert from '@/components/Base/BaseAlert.vue';
import CartOrders from '@/components/Cart/CartOrders.vue';
import CartTotal from '@/components/Cart/CartTotal.vue';

export default {
  name: 'OrderInfoPage',
  data() {
    return {
      isLoading: true,
      error: false,
      orderData: null,
    };
  },
  components: {
    BaseBreadcrumbs,
    BaseDictionaryItem,
    BaseAlert,
    CartOrders,
    CartTotal,
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(orderId) {
        const { orderInfo } = this.$store.state;

        this.isLoading = true;
        this.error = false;

        if (!orderInfo || (orderInfo.id !== orderId)) {
          this.loadOrderData(orderId)
            .catch(console.error)
            .then(this.getOrderData);
        } else {
          this.getOrderData();
        }
      },
    },
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
    ...mapGetters(['orderInfo']),
    loadOrderData(orderId = this.$route.params.id) {
      return this.loadOrderInfo(orderId);
    },
    getOrderData() {
      const data = this.orderInfo();

      this.isLoading = false;

      if (!data) {
        this.error = 'Заказ не найден';
      } else {
        this.orderData = data;
      }
    },
  },
  computed: {
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
