<template>
  <div>
    <!-- หน้าแสดงข้อมูล -->
    <div>
      <div class="q-pa-md" align="center">
        <q-btn @click="addPractice()" style="width:190px" dense color="blue-grey-10" label="เพิ่ม" />
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