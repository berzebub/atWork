<template>
  <q-page>
    <div class="text-subtitle1">ชื่อตำแหน่ง</div>
    <div>
      <q-input
        ref="namePosition"
        dense
        outlined
        v-model="dataPosition.name"
        :error="errorNamePosition"
        :error-message="errorNamePositionMessage"
        @keyup="errorNamePosition=false"
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
      savedDataDialog: false,
      errorNamePosition: false,
      nameOld: "",
      errorNamePositionMessage: ""
    };
  },
  methods: {
    cancelNamePosition() {
      this.$router.push("/lessonMainList");
    },
    async saveNamePosition() {
      if (this.dataPosition.name == "") {
        this.errorNamePosition = true;
        return;
      }
      if (this.nameOld != this.dataPosition.name) {
        let checkName = false;
        checkName = await this.isCheckName(this.dataPosition.name);
        this.errorNamePosition = false;
        this.errorNamePositionMessage = "ชื่อนี้มีตำแหน่งแล้ว";

        if (checkName) {
          this.errorNamePosition = true;
          return;
        }
      }
      this.loadingShow();
      if (this.$route.name == "lessonEdit") {
        console.log(this.$route.params.levelId);
        console.log(this.dataPosition.name);
        db.collection("level")
          .doc(this.$route.params.levelId)
          .update(this.dataPosition)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;
            setTimeout(() => {
              this.$router.push("/lessonMainList");
            }, 1000);
          });
      } else {
        db.collection("level")
          .add(this.dataPosition)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;
            setTimeout(() => {
              this.$router.push("/lessonMainList");
            }, 1000);
          });
      }
    },
    async isCheckName(val) {
      let doc = await db
        .collection("level")
        .where("name", "==", val)
        .get();
      return doc.size ? true : false;
    },

    loadNamePisition() {
      db.collection("level")
        .doc(this.$route.params.levelId)
        .get()
        .then(doc => {
          this.dataPosition.name = doc.data().name;
          this.nameOld = doc.data().name;
        });
    }
  },
  mounted() {
    if (this.$route.name == "lessonEdit") {
      this.loadNamePisition();
    }
  }
};
</script>

<style >
</style>