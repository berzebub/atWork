<template>
  <div>
    practiceList
    <!-- show content -->
    <div>
      <div class="col-6-md col-12-sm">
        <q-select outlined v-model="model" :options="options" />
      </div>
      <div class="col-6-md col-12-sm">
        <q-select outlined v-model="model" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      model: 1,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>