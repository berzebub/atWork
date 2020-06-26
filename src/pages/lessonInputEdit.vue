<template>
  <q-page>
    <div class="text-subtitle1">ชื่อตำแหน่ง</div>
    <div>
      <q-input dense outlined v-model="nameLevel"></q-input>
      <div class="row q-pt-md">
        <div class="col-6">
          <q-btn dense style="width:150px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6" align="right">
          <q-btn dense color="blue-grey-10" style="width:150px" label="บันทึก"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      nameLevel: ""
    };
  }
};
</script>

<style >
</style>