<template>
  <div>
    <BaseHeader/>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import BaseHeader from '@/components/Base/BaseHeader.vue';
import BaseFooter from '@/components/Base/BaseFooter.vue';

export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) this.updateUserAccessKey(userAccessKey);

    this.loadCart();
  },
};
</script>
