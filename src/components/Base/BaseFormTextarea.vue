<template>
  <BaseFormField :title='title' :error='error'>
    <textarea class='form__input form__input--area' :name='name'
              :placeholder='placeholder' v-model='dataValue'></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormTextarea',
  mixins: [formFieldMixin],
};
</script>
