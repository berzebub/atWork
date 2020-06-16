<template>
  <div>
    Lesson Main
    <!-- หน้าแสดงข้อมูล -->
    <div>
      <div>
        <q-btn round color="primary" icon="fas fa-plus" />
      </div>
    </div>

    <!-- เพิ่ม Lesson -->
    <div class="q-pt-md">
      <span>ชื่อบทเรียน</span>
      <q-input outlined v-model="text" />
    </div>
    <div class="q-pt-md">
      <span>ชื่อบทเรียน</span>
      <q-select outlined v-model="model" :options="options" />
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