<template>
  <aside class='filter'>
    <h2 class='filter__title'>Фильтры</h2>

    <form class='filter__form form' action='#' method='get' @submit.prevent='updateFilters'>
      <fieldset class='form__block'>
        <legend class='form__legend'>Цена</legend>

        <!-- PriceFrom -->
        <label class='form__label form__label--price'>
          <input class='form__input'
                 type='number'
                 name='min-price'
                 min='0'
                 v-model.number='currentPriceFrom'>
          <span class='form__value'>От</span>
        </label>

        <!-- PriceTo -->
        <label class='form__label form__label--price'>
          <input class='form__input'
                 type='number'
                 name='max-price'
                 min='0'
                 v-model.number='currentPriceTo'>
          <span class='form__value'>До</span>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Категория</legend>
        <label class='form__label form__label--select'>
          <select class='form__select' name='category' v-model='currentCategoryId'>
            <option value='0'>Все категории</option>
            <option v-for='category in categories' :key='category.id' :value='category.id'>
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Цвет</legend>
        <BaseColorsToggler :colors='colors' :selectedColor.sync='currentColor'/>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Объем в ГБ</legend>
        <ul class='check-list'>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume' value='8'
                     checked=''>
              <span class='check-list__desc'>8<span>(313)</span></span>
            </label>
          </li>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume' value='16'>
              <span class='check-list__desc'>16<span>(461)</span></span>
            </label>
          </li>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume' value='32'>
              <span class='check-list__desc'>32<span>(313)</span></span>
            </label>
          </li>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume' value='64'>
              <span class='check-list__desc'>64<span>(313)</span></span>
            </label>
          </li>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume'
                     value='128'>
              <span class='check-list__desc'>128<span>(313)</span></span>
            </label>
          </li>
          <li class='check-list__item'>
            <label class='check-list__label'>
              <input class='check-list__check sr-only' type='checkbox' name='volume'
                     value='264'>
              <span class='check-list__desc'>264<span>(313)</span></span>
            </label>
          </li>
        </ul>
      </fieldset>
      <button class='filter__submit button button--primery' type='submit'>Применить</button>
      <button class='filter__reset button button--second'
              type='button' @click.prevent='resetFilters'>
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapActions } from 'vuex';
import BaseColorsToggler from '@/components/Base/BaseColorsToggler.vue';

export default {
  name: 'ProductFilter',
  components: {
    BaseColorsToggler,
  },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    selectedColor: Number,
  },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 0,
      categoriesData: null,
      colorsData: null,
    };
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    selectedColor(value) {
      this.currentColor = value;
    },
  },
  methods: {
    ...mapActions({
      loadProductCategories: 'loadProductCategories',
      loadProductColors: 'loadColors',
    }),
    updateFilters() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:selectedColor', this.currentColor);
    },
    resetFilters() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:selectedColor', 0);
    },
    loadCategories() {
      return this.loadProductCategories()
        .then((res) => {
          this.categoriesData = res.data;
        });
    },
    loadColors() {
      return this.loadProductColors()
        .then((res) => {
          this.colorsData = res.data;
        });
    },
  },
  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
  },
};
</script>
