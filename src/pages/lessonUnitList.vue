<template>
  <q-page>
    <div class="text-subtitle1">ชื่อตำแหน่ง</div>
    <div>
      <q-input dense outlined readonly></q-input>
    </div>
    <div align="center" class="q-pt-md text-subtitle1">
      <q-btn
        dense
        color="blue-grey-10"
        style="width:190px"
        label="เพิ่มบทเรียน"
        @click="addLesson()"
      ></q-btn>
    </div>
    <!-- dialog เพิ่มบทเรียน -->
    <q-dialog v-model="dialogLesson">
      <div class="bg-white row q-pa-md" style="width:330px">
        <div class="text-subtitle1 col-12" align="letf">รหัสลำดับ</div>
        <div style="width:300px">
          <q-input ref="order" dense outlined v-model="dataLesson.order" :rules="[val => !!val]"></q-input>
        </div>
        <span ref="name" class="text-subtitle1 q-pt-sm">ชื่อบทเรียน</span>
        <div style="width:300px">
          <q-input dense outlined v-model="dataLesson.nameLesson" :rules="[val => !!val]"></q-input>
        </div>
        <div class="col-12 q-pt-md">
          <span class="text-black text-subtitle1">การใช้งานบทเรียน</span>

          <q-toggle v-model="dataLesson.status" color="secondary" />
        </div>
        <div class="col-6 q-pr-sm q-pt-md" align="right">
          <q-btn @click="cancelAddLesson()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-pt-md">
          <q-btn
            @click="saveLesson()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      dataLesson: { order: "", nameLesson: "", status: false },
      dialogLesson: false
    };
  },
  methods: {
    cancelAddLesson() {
      this.dialogLesson = false;
    },
    saveLesson() {
      this.$refs.name.validate();
      this.$refs.order.validate();
      if (this.$refs.name.hasError || this.$refs.order.hasError) {
        console.log("ยังไม่กรอกข้อมูล");
        return;
      }
      // this.loadingShow();
      // db.collection("unit")
      //   .add(this.dataLesson)
      //   .then(() => {});
    },
    addLesson() {
      this.dialogLesson = true;
    }
  }
};
</script>

<style >
</style>