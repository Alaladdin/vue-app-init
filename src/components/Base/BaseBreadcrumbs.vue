<template>
  <ul class='breadcrumbs'>
    <li class='breadcrumbs__item'>
      <router-link class='breadcrumbs__link' :to='{ name: "main" }'>Каталог</router-link>
    </li>
    <li class='breadcrumbs__item' v-for='page in pages' :key='page.name'>
      <router-link class='breadcrumbs__link' :to='{ name: page.name, params: page.params }'>
        {{ page.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',
  props: {
    pages: Array,
  },
};
</script>
