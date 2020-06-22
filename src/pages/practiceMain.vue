<template>
  <q-page class="text-blue-grey-10">
    <practice-main></practice-main>
  </q-page>
</template>

<script>
import { db } from "../router";
import practiceMain from "../components/practiceMain.vue";
export default {
  components: {
    practiceMain
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>