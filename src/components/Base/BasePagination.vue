<template>
  <ul class='catalog__pagination pagination'>
    <li class='pagination__item'>
      <a class='pagination__link pagination__link--arrow'
         :class='{ "pagination__link--disabled" : page === 1 }'
         aria-label='Предыдущая страница' href='#' @click.prevent='paginate(page - 1)'>
        <svg width='8' height='14' fill='currentColor'>
          <use xlink:href='#icon-arrow-left'></use>
        </svg>
      </a>
    </li>

    <li class='pagination__item' v-for='pageNumber in pages' :key='pageNumber'>
      <a class='pagination__link' href='#'
         :class='{ "pagination__link--current" : pageNumber === page }'
         @click.prevent='paginate(pageNumber)'>{{ pageNumber }}</a>
    </li>

    <li class='pagination__item'>
      <a class='pagination__link pagination__link--arrow'
         :class='{ "pagination__link--disabled" : page === pages}'
         href='#' aria-label='Следующая страница'
         @click.prevent='paginate(page + 1)'>
        <svg width='8' height='14' fill='currentColor'>
          <use xlink:href='#icon-arrow-right'></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },
  methods: {
    paginate(page) {
      const pagesBorders = [1, this.pages];

      // disallow to exit out of range
      if (page < pagesBorders[0] || pagesBorders[1] < page) return false;

      return this.$emit('paginate', page);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
