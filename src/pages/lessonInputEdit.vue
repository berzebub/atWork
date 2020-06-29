<template>
  <q-page>
    <div class="text-subtitle1">ชื่อตำแหน่ง</div>
    <div>
      <q-input
        ref="namePosition"
        dense
        outlined
        v-model="dataPosition.name"
        :rules="[val => !!val 
          ,isCheckEmail]"
      ></q-input>
      <div class="row q-pt-lg">
        <div class="col-6 q-pr-sm" align="right">
          <q-btn dense style="width:150px" @click="cancelNamePosition()" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm" align="left">
          <q-btn
            @click="saveNamePosition()"
            dense
            color="blue-grey-10"
            style="width:150px"
            label="บันทึก"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- dialog บันทึกสำเร็จ -->
    <q-dialog v-model="savedDataDialog">
      <div
        class="bg-white row justify-center items-center"
        style="width:320px;height:200px"
        align="center"
      >
        <div>
          <q-icon name="far fa-check-circle" class="text-secondary" size="40px" />
          <div class="text-subtitle1 q-pt-md">บันทึกข้อมูลเรียบร้อยแล้ว</div>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, axios } from "../router";
export default {
  data() {
    return {
      dataPosition: { name: "", status: false },
      savedDataDialog: false
    };
  },
  methods: {
    cancelNamePosition() {
      this.$router.push("lessonMain");
    },
    saveNamePosition() {
      this.$refs.namePosition.validate();
      if (this.$refs.namePosition.hasError) {
        console.log("ยังไม่กรอกข้อมูล");
        return;
      }
      this.loadingShow();
      db.collection("level")
        .add(this.dataPosition)
        .then(() => {
          this.loadingHide();
          this.savedDataDialog = true;
          setTimeout(() => {
            this.$router.push("lessonMain");
          }, 1000);
        });
    },
    async isCheckEmail(val) {
      if (this.$route.name != "lessonEdit") {
        let doc = await db
          .collection("level")
          .where("namePosition", "==", val)
          .get();
        return !doc.size || "ชื่อนี้ถูกใช้งานแล้ว";
      }
    }
  }
};
</script>

<style >
</style>