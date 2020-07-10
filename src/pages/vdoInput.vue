<template>
  <q-page>
    <div class="container">
      <div class="text-h6 text-center">
        <div>{{practiceData.levelName}}</div>
        <div>{{ practiceData.unitOrder + ". " + practiceData.unitName}}</div>
      </div>
      <div class="q-pt-sm">
        <span>รหัสลำดับ</span>
        <span class="q-mx-md text-grey-5">ตัวเลข 3 หลัก</span>
        <div>
          <q-input
            mask="###"
            bg-color="white"
            outlined
            ref="orderid"
            v-model.number="data.order"
            dense
            :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ',checkOrderId]"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-md-3 col-sm-3 q-pb-md">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model="data.speaker"
            :val="'customer'"
            label="ลูกค้า"
          />
        </div>
        <div class="col-xs-6 col-md-3 col-sm-3 q-pb-md">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model="data.speaker"
            :val="'employee'"
            label="พนักงาน"
          />
        </div>
      </div>
      <div>
        <span>ประโยคภาษาอังกฤษ</span>
        <div>
          <q-input
            autogrow
            bg-color="white"
            outlined
            ref="eng"
            v-model="data.sentenceEng"
            dense
            :rules="[ val => !!val || 'กรุณาใส่ประโยคภาษาอังกฤษ']"
          />
        </div>
      </div>
      <div>
        <span>ประโยคภาษาไทย</span>
        <div>
          <q-input
            autogrow
            bg-color="white"
            outlined
            ref="th"
            v-model="data.sentenceTh"
            dense
            :rules="[ val => !!val || 'กรุณาใส่ประโยคภาษาไทย']"
          />
        </div>
      </div>
      <div>
        <div class="text-left">
          ไฟล์เสียง
          <span class="q-mx-md text-grey-5">ไฟล์ mp3 เท่านั้น</span>
        </div>
        <q-file accept="audio/*" bg-color="white" outlined v-model="uploadAudio">
          <template class="relative-position" v-slot:append>
            <div
              style="width:100px"
              class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
              @click.stop="uploadAudio = null"
              v-if="!uploadAudio && !isKeyAudio"
            >เลือกไฟล์</div>
            <div v-if="uploadAudio || isKeyAudio" class="text-body1 absolute-center">{{isKeyAudio}}</div>
            <div
              class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
              v-if="uploadAudio || isKeyAudio"
              @click="uploadAudio  = null ; isKeyAudio = ''"
            >
              <span style class="far fa-trash-alt q-px-xs"></span>
            </div>
          </template>
          <div
            style="width:1000px"
            class="text-subtitle1 text-grey-7 self-center"
            v-if="!uploadAudio && !isKeyAudio"
          >ลากแล้ววาง หรือ</div>
        </q-file>
      </div>
      <div align="center">
        <div class="row reverse-wrap justify-center q-pt-md" style="max-width:340px;width:100%">
          <div class="col-6 q-py-sm text-left">
            <q-btn
              v-close-popup
              @click="backBtn()"
              dense
              style="width:150px"
              color="white"
              outline
              text-color="blue-grey-10"
              label="ยกเลิก"
            />
          </div>
          <div class="col-6 q-py-sm text-right">
            <q-btn
              :disable="checkble"
              @click="saveBtn()"
              dense
              style="width:150px"
              color="blue-grey-10"
              label="บันทึก"
            />
          </div>
        </div>
      </div>
      <!-- finish -->
      <q-dialog v-model="finishDialog">
        <q-card style="max-width:323px;width:100%;height:200px">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div class="q-py-md q-mt-md">
              <q-icon
                v-if="iconTrueDialog"
                color="secondary"
                size="46px"
                name="far fa-check-circle"
              />
              <q-icon v-if="iconfailDialog" color="red" size="46px" name="far fa-times-circle" />
            </div>
            <div class="text-subtitle1">{{text}}</div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { db, st } from "../router";
export default {
  data() {
    return {
      checkble: false,
      uploadAudio: null,
      isKeyAudio: "",
      data: {
        order: "",
        practiceId: this.$route.params.practiceId,
        levelId: this.$route.params.levelId,
        unitId: this.$route.params.unitId,
        sentenceEng: "",
        sentenceTh: "",
        isSound: false,
        speaker: "customer",
        status: "notSync"
      },
      practiceData: {
        levelName: "",
        unitName: "",
        unitOrder: ""
      },

      orderOld: "",
      orderNew: "",
      iconTrueDialog: true,
      iconfailDialog: false,
      finishDialog: false,
      text: ""
    };
  },
  methods: {
    loadLevel() {
      let levelKey = this.$route.params.levelId;
      db.collection("level")
        .doc(levelKey)
        .get()
        .then(result => {
          if (result.exists) {
            this.practiceData.levelName = result.data().name;
            // โหลดข้อมูล Unit
            this.loadUnit();
          }
        });
    },
    loadUnit() {
      let unitKey = this.$route.params.unitId;
      db.collection("unit")
        .doc(unitKey)
        .get()
        .then(result => {
          if (result.exists) {
            this.practiceData.unitName = result.data().name;
            this.practiceData.unitOrder = result.data().order;
            // โหลดข้อมูล คำสั่ง
          }
        });
    },
    loadEdit() {
      db.collection("practice_draft")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          if (doc.data().isSound) {
            this.isKeyAudio = doc.id + ".mp3";
          }
          this.orderOld = doc.data().order;
          this.data = doc.data();
        });
    },
    async checkOrderId(val) {
      let getOrder = await db
        .collection("practice_draft")
        .where("order", "==", val)
        .where("practiceId", "==", this.data.practiceId)
        .get();

      if (this.orderOld != val) {
        return !getOrder.size || "รหัสลำดับนี้มีการใช้งานแล้ว";
      }
    },
    async saveBtn() {
      this.$refs.orderid.validate();
      this.$refs.eng.validate();
      this.$refs.th.validate();
      if (
        this.$refs.orderid.hasError ||
        this.$refs.eng.hasError ||
        this.$refs.th.hasError
      ) {
        return;
      }

      this.loadingShow();
      await this.updateSyncStatus(
        this.$route.params.practiceId,
        this.$route.params.unitId
      );
      this.checkble = true;
      if (this.$route.name == "vdoAdd") {
        if (this.uploadAudio) {
          this.data.isSound = true;
        }
        db.collection("practice_draft")
          .add(this.data)
          .then(async doc => {
            if (this.uploadAudio) {
              await st
                .child("/practice/audio/" + doc.id + ".mp3")
                .put(this.uploadAudio);
            }
            this.iconfailDialog = false;
            this.iconTrueDialog = true;
            this.finishDialog = true;
            this.text = "บันทึกข้อมูลเรียบร้อย";
            setTimeout(() => {
              this.loadingHide();
              this.$router.push(
                "/vdoMain/" +
                  this.data.levelId +
                  "/" +
                  this.data.unitId +
                  "/" +
                  this.data.practiceId
              );
            }, 1000);
          });
      } else {
        if (this.uploadAudio || this.isKeyAudio) {
          this.data.isSound = true;
        }
        db.collection("practice_draft")
          .doc(this.$route.params.id)
          .set(this.data)
          .then(() => {
            if (this.uploadAudio) {
              st.child("/practice/audio/" + this.$route.params.id + ".mp3").put(
                this.uploadAudio
              );
            }
            this.iconfailDialog = false;
            this.iconTrueDialog = true;
            this.finishDialog = true;
            this.text = "บันทึกข้อมูลเรียบร้อย";
            setTimeout(() => {
              this.loadingHide();
              this.$router.push(
                "/vdoMain/" +
                  this.data.levelId +
                  "/" +
                  this.data.unitId +
                  "/" +
                  this.data.practiceId
              );
            }, 1000);
          });
      }
    },
    backBtn() {
      this.$router.push(
        "/vdoMain/" +
          this.data.levelId +
          "/" +
          this.data.unitId +
          "/" +
          this.data.practiceId
      );
    }
  },
  mounted() {
    this.loadLevel();
    if (this.$route.name == "vdoEdit") {
      if (this.$route.params.id == undefined) {
        this.$router.go(-1);
        return;
      }
      this.loadEdit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>