<template>
  <div>
    <h3 class='cart__title'>Оплата</h3>
    <ul class='cart__options options'>

      <li class='options__item'>
        <label class='options__label'>
          <input class='options__radio sr-only' type='radio' name='pay' value='card'>
          <span class='options__value'>Картой при получении</span>
        </label>
      </li>

      <li class='options__item'>
        <label class='options__label'>
          <input class='options__radio sr-only' type='radio' name='pay' value='cash'>
          <span class='options__value'>Наличными при получении</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CartPaymentOption',
};
</script>
