import BaseFormField from '@/components/Base/BaseFormField.vue';

export default {
  name: 'BaseFormTextarea',
  components: {
    BaseFormField,
  },
  props: {
    value: String || Number,
    title: String,
    name: String,
    placeholder: String,
    error: String,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
