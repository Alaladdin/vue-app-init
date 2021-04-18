<template>
  <div class='alert alert-message' :class='`alert--${this.status}`'>
    <div v-if='title'>
      <b>{{ title }}</b>
    </div>
    {{ body }}
  </div>
</template>

<style lang='scss'>
@import '../../../public/scss/index';
</style>

<script>
export default {
  name: 'BaseAlert',
  props: {
    title: String,
    status: {
      type: String,
      default: 'error',
    },
    body: {
      type: String,
      default: 'Возникла непредвиденная ошибка',
    },
  },
};
</script>
