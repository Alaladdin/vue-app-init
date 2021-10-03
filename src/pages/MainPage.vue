<template>
  <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>Каталог</h1>
      <span class='content__info'>
        {{ productsCount }}
        {{ declinationFormat(productsCount, ['товар', 'товара', 'товаров']) }}
      </span>
    </div>

    <div class='content__catalog'>
      <ProductFilter
        v-model:selectedColor='filter.selectedColor'
        v-model:priceFrom='filter.priceFrom'
        v-model:priceTo='filter.priceTo'
        v-model:categoryId='filter.categoryId'
      />

      <section class='catalog'>
        <div v-if='productsLoading'>Загрузка товаров...</div>
        <div v-if='productsLoadingFailed'>Ошибка загрузки товаров
          <button @click.prevent='loadProducts()'>Попробовать еще раз</button>
        </div>
        <ProductList :products='products'/>
        <BasePagination v-model='page' :count='productsCount' :per-page='productsPerPage'/>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import { productsPerPage } from '@/config';
import ProductFilter from '@/components/Product/ProductFilter.vue';
import ProductList from '@/components/Product/ProductList.vue';
import BasePagination from '@/components/Base/BasePagination.vue';
import declinationFormat from '@/helpers/declinationFormat';

export default {
  name: 'MainPage',
  components: {
    ProductFilter,
    ProductList,
    BasePagination,
  },
  data() {
    return {
      filter: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        selectedColor: 0,
      },
      page: 1,
      productsPerPage: productsPerPage || 6,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    ...mapActions(['loadAllProducts']),
    declinationFormat,
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        this.loadAllProducts({
          categoryId: this.filter.categoryId,
          colorId: this.filter.selectedColor,
          limit: this.productsPerPage,
          minPrice: this.filter.priceFrom,
          maxPrice: this.filter.priceTo,
          page: this.page,
        })
          .then((res) => {
            this.productsData = res.data;
          })
          .catch((err) => {
            console.error(err);
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filter: {
      immediate: true,
      deep: true,
      handler() {
        this.loadProducts();
      },
    },
  },
  computed: {
    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
  },
};
</script>
