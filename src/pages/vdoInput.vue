<template>
  <q-page>
    <div class="container">
      <div class="text-h6 text-center">
        <div>อาหารและเครื่องดื่ม</div>
        <div>1. จองโต๊ะ</div>
      </div>
      <div class="q-pt-sm">
        <span>รหัสลำดับ</span>
        <div>
          <q-input
            bg-color="white"
            outlined
            ref="orderid"
            type="number"
            v-model.number="data.order"
            dense
            :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ']"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-md-3 col-sm-3 q-pb-md">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model.number="data.customer"
            :val="1"
            label="ลูกค้า"
          />
        </div>
        <div class="col-xs-6 col-md-3 col-sm-3 q-pb-md">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model.number="data.customer"
            :val="2"
            label="พนักงาน"
          />
        </div>
      </div>
      <div>
        <span>ประโยคภาษาอังกฤษ</span>
        <div>
          <q-input
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
        <div class="text-left">ไฟล์เสียง</div>
        <q-file
          accept="audio/*"
          bg-color="white"
          style="max-width:328px"
          outlined
          v-model="uploadAudio"
        >
          <template v-slot:append>
            <div
              style="width:100px"
              class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
              @click.stop="uploadAudio = null"
              v-if="!uploadAudio && !isKeyAudio"
            >เลือกไฟล์</div>
            <span v-if="uploadAudio || isKeyAudio" class="text-body1 q-pr-md">{{isKeyAudio}}</span>
            <div
              class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
              v-if="uploadAudio || isKeyAudio"
              @click.stop="uploadAudio  = null"
              @click="isKeyAudio  = ''"
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
              to="/vdoMain"
              v-close-popup
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
        practiceType: "vdo",
        practiceId: "m",
        levelId: "aa",
        unitId: "bb",
        sentenceEng: "",
        sentenceTh: "",
        isSound: false,
        customer: 1,
        status: "notSync"
      }
    };
  },
  methods: {
    saveBtn() {
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
      if (this.uploadAudio) {
        this.data.isSound = true;
      }
      if (this.$route.name == "vdoInputAdd") {
        db.collection("practice_draft")
          .add(this.data)
          .then(async doc => {
            if (this.uploadAudio) {
              await st
                .child("/practice/audio/" + doc.id + ".mp3")
                .put(this.uploadAudio);
            }
            doc.id;
          });
      } else {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>