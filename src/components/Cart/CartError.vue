<template>
  <div class='cart__error form__error-block'>
    <h4>{{ title }}</h4>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'CartError',
  props: {
    title: {
      type: String,
      default: 'Заявка не отправлена!',
    },
    message: {
      type: String,
      default: 'Похоже, произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.',
    },
  },
};
</script>
