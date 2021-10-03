<template>
  <main class='content container alert alert--info' v-if='productLoading'>Загрузка товара...</main>
  <main class='content container alert alert--error' v-else-if='!productData'>
    Ошибка загрузки...
  </main>
  <main class='content container' v-else>
    <div class='content__top'>
      <BaseBreadcrumbs :pages='pages'/>
    </div>

    <section class='item'>
      <div class='item__pics pics'>
        <div class='pics__wrapper'>
          <img width='570' height='570' :src='product.image' :alt='product.title'>
        </div>
      </div>

      <div class='item__info'>
        <span class='item__code'>Артикул: {{ product.id }}</span>
        <h2 class='item__title'>{{ product.title }}</h2>
        <div class='item__form'>
          <form class='form' action='#' method='POST' @submit.prevent='addToCart'>
            <b class='item__price'>{{ product.price }} ₽</b>

            <fieldset class='form__block'>
              <legend class='form__legend'>Цвет:</legend>
              <BaseColorsToggler :colors='colors' v-model:selectedColor='selectedColor'/>
            </fieldset>

            <fieldset class='form__block'>
              <legend class='form__legend'>Объем в ГБ:</legend>

              <ul class='sizes sizes--primery'>
                <li class='sizes__item'>
                  <label class='sizes__label'>
                    <input class='sizes__radio sr-only' type='radio' name='sizes-item' value='32'>
                    <span class='sizes__value'>32gb</span>
                  </label>
                </li>
                <li class='sizes__item'>
                  <label class='sizes__label'>
                    <input class='sizes__radio sr-only' type='radio' name='sizes-item' value='64'>
                    <span class='sizes__value'>64gb</span>
                  </label>
                </li>
                <li class='sizes__item'>
                  <label class='sizes__label'>
                    <input class='sizes__radio sr-only' type='radio' name='sizes-item' value='128'
                           checked=''>
                    <span class='sizes__value'>128gb</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class='item__row'>
              <BaseCounter :min='1'
                           :max='100'
                           v-model:count='productAmount'
                           v-model:productAmount.number='productAmount'
              />

              <button
                class='button button--primery'
                type='submit'
                :disabled='productAddSending'>В корзину
              </button>
            </div>
            <div class='alert alert--success' v-show='productAdded'>Товар добавлен в корзину</div>
            <div class='alert alert--info' v-show='productAddSending'>
              Добавляем товар в корзину...
            </div>
          </form>
        </div>
      </div>

      <div class='item__desc'>
        <ul class='tabs'>
          <li class='tabs__item'>
            <a class='tabs__link tabs__link--current'>Описание</a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'>Характеристики</a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'>Гарантия</a>
          </li>
          <li class='tabs__item'>
            <a class='tabs__link' href='#'>Оплата и доставка</a>
          </li>
        </ul>

        <div class='item__content'>
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href='#'>Все характеристики</a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
            отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения
            сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
            черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<!-- style -->
<style lang='scss'>
@import '../../public/scss/index';

.item__row {
  margin-bottom: 20px;
}
</style>

<!-- script -->
<script>
import { mapActions } from 'vuex';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import BaseCounter from '@/components/Base/BaseCounter.vue';
import BaseColorsToggler from '@/components/Base/BaseColorsToggler.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductPage',
  components: {
    BaseBreadcrumbs,
    BaseCounter,
    BaseColorsToggler,
  },
  watch: {
    selectedColor(value) {
      this.selectedColor = value;
    },
    productAmount(value) {
      this.productAmount = value;
    },
    productData(value) {
      this.selectedColor = value.colors[0].id;
    },
    '$route.params.id': {
      immediate: true,
      handler(productId) {
        this.productLoading = true;
        this.loadProduct({ productId })
          .then((res) => {
            if (res.status !== 200) throw new Error('Not found');
            this.productData = res.data;
          })
          .catch((err) => {
            this.$router.push('/404');
            console.error(err);
          })
          .then(() => {
            this.productLoading = false;
          });
      },
    },
  },
  data() {
    return {
      selectedColor: 0,
      productAmount: 1,
      productData: null,
      productLoading: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  methods: {
    ...mapActions([
      'addProductToCart',
      'loadProduct',
    ]),

    numberFormat,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
        // colorId: this.selectedColor,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
  },
  computed: {
    product() {
      return { ...this.productData, image: this.productData.image.file.url };
    },
    category() {
      return this.productData.category;
    },
    colors() {
      return this.productData.colors;
    },
    pages() {
      return [
        {
          name: 'main',
          title: this.category.title,
        },
        {
          name: 'product',
          title: this.product.title,
          params: {
            id: this.product.id,
          },
        },
      ];
    },
  },
};
</script>
