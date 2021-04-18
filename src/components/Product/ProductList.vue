<template>
  <ul class='catalog__list'>
    <ProductsItem v-for='product in products' :key='product.id' :product='product'/>
  </ul>
</template>

<script>
import ProductsItem from '@/components/Product/ProductsItem.vue';

export default {
  name: 'ProductList',
  props: {
    products: Array,
  },
  components: { ProductsItem },
};
</script>
