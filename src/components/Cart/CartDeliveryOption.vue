<template>
  <div>
    <h3 class='cart__title'>Доставка</h3>
    <ul class='cart__options options'>

      <li class='options__item'>
        <label class='options__label'>
          <input class='options__radio sr-only' type='radio' name='delivery' value='0' checked>
          <span class='options__value'>Самовывоз <b>бесплатно</b></span>
        </label>
      </li>

      <li class='options__item'>
        <label class='options__label'>
          <input class='options__radio sr-only' type='radio' name='delivery' value='500'>
          <span class='options__value'>Курьером <b>500 ₽</b></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CartDeliveryOption',
};
</script>
