<template>
  <BaseFormField :title='title' :error='error'>
    <input class='form__input' :type='type' :name='name' :placeholder='placeholder'
           v-model='dataValue'>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormInput',
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>
