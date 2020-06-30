<template>
  <div class="container brx">
    <div align="center">
      <div class="text-subtitle1">แก้ไข ชื่อ สกุล</div>
      <div class="q-mt-lg">
        <div align="left" class="text-body2">ชื่อ นามสกุล</div>
        <div>
          <q-input outlined v-model="name"></q-input>
        </div>
      </div>
      <div class="row justify-center q-ma-lg">
        <q-btn class="q-mx-md" label="ยกเลิก" style="width:190px" outline color="blue-grey-10" />
        <q-btn
          class="q-mx-md bg-blue-grey-10 text-white"
          label="บันทึก"
          style="width:190px"
          outline
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>