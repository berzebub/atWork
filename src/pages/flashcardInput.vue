<template>
  <q-page align="center">
    <div class="container">
      <div class="row">
        <div class="col-sm-11 col-xs-12 relative-position">
          <!-- หัวข้อ -->
          <div class="q-ma-lg text-h6" align="center">
            <div>พนักงานร้านอาหาร</div>
            <div>1. รับออเดอร์</div>
          </div>
          <!-- รหัสลำดับ -->
          <div>
            <div>
              <div class="text-h6" align="left">รหัสลำดับ</div>
            </div>
            <q-input
              ref="order"
              :rules="[val => val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
              outlined
              type="number"
              v-model.number="order"
            />
          </div>
          <!-- ไฟล์รูปภาพ -->
          <div>
            <div class="row items-center">
              <div align="left" class="text-h6">ไฟล์รูปภาพ</div>
              <div class="q-ml-md text-blue-grey-4">ไฟล์ jpg ขนาด 400x300 px เท่านั้น</div>
            </div>
            <div class="q-px-lg">
              <q-file
                accept="image/*"
                bg-color="white"
                class="q-pa-sm"
                outlined
                v-model="uploadImg "
              >
                <template v-slot:append>
                  <div
                    style="width:100px"
                    class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                    @click.stop="uploadImg = null"
                    v-if="!uploadImg"
                  >เลือกไฟล์</div>
                  <div
                    class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                    v-if="uploadImg "
                    @click.stop="uploadImg  = null"
                  >
                    <span style class="far fa-trash-alt q-px-xs"></span>
                  </div>
                </template>
                <div
                  style="width:1000px"
                  class="text-subtitle1 text-grey-7 self-center"
                  v-if="!uploadImg"
                >ลากแล้ววาง หรือ</div>
              </q-file>
            </div>
          </div>
          <!-- ไฟล์เสียง -->
          <div>
            <div class="row items-center">
              <div align="left" class="text-h6">ไฟล์เสียง</div>
              <div class="q-ml-md text-blue-grey-4">ไฟล์ mp3 เท่านั้น</div>
            </div>
            <div class="q-px-lg">
              <q-file
                accept="audio/*"
                bg-color="white"
                class="q-pa-sm"
                outlined
                v-model="uploadSound"
              >
                <template v-slot:append>
                  <div
                    style="width:100px;"
                    class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                    @click.stop="uploadSound = null"
                    v-if="!uploadSound"
                  >เลือกไฟล์</div>
                  <div
                    class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                    v-if="uploadSound"
                    @click.stop="uploadSound = null"
                  >
                    <span style class="far fa-trash-alt q-px-xs"></span>
                  </div>
                </template>
                <div
                  style="width:1000px"
                  class="text-subtitle1 text-grey-7 self-center"
                  v-if="!uploadSound"
                >ลากแล้ววาง หรือ</div>
              </q-file>
            </div>
          </div>
          <!-- คำศัพท์ -->
          <div class="q-mt-md">
            <div>
              <div class="text-h6" align="left">คำศัพท์</div>
            </div>
            <q-input
              ref="vocabulary"
              v-model="vocabulary"
              outlined
              :rules="[val => !!val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
            />
          </div>
          <!-- คำอ่าน -->
          <div>
            <div class="text-h6" align="left">คำอ่าน</div>
            <div>
              <q-editor
                @input="checkRead()"
                :class="this.checkValidate == true?'error-border': null  "
                ref="read"
                v-model="read"
                min-height="5rem"
                :toolbar="[
        ['bold', 'italic', 'underline']
      ]"
              />
            </div>
          </div>
          <!-- คำแปล -->
          <div class="q-mt-md">
            <div>
              <div class="text-h6" align="left">คำแปล</div>
            </div>
            <q-input
              ref="meaning"
              v-model="meaning"
              outlined
              :rules="[val => !!val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
            />
          </div>
        </div>
      </div>
      <div class="row" style="width:360px; margin-left:21%">
        <!-- ยกเลิก -->
        <div class="q-mt-md col">
          <q-btn
            :to="'/flashcardMain'"
            label="ยกเลิก"
            dense
            style="width:150px"
            outline
            color="blue-grey-10"
          />
        </div>
        <!-- บันทึกข้อมูล -->
        <div class="q-mt-md col">
          <q-btn
            @click="saveData()"
            label="บันทึก"
            dense
            style="width:150px"
            outline
            color="white"
            class="bg-blue-grey-10"
          />
        </div>
      </div>
      <!-- --------------------------------------dialog--------------------------------------- -->
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      checkValidate: false,
      practiceId: "",
      levelId: this.$route.params.levelId,
      unitId: this.$route.params.unitId,
      order: "",
      vocabulary: "",
      read: "",
      meaning: ""
    };
  },
  methods: {
    checkRead() {
      if (this.read == "") {
        this.checkValidate = true;
      } else {
        this.checkValidate = false;
      }
    },
    editMode() {
      if (this.$route.params.levelId == undefined) {
        this.$router.push("/expressionMain");
      }
      this.levelId = this.$route.params.levelId;
      this.practiceId = this.$route.params.practiceId;
      this.order = this.$route.params.order;
      this.unitId = this.$route.params.unitId;
      let getSentence = this.$route.params.expression;
      this.boxCount = this.$route.params.expression.length - 1;
      let loop = 4 - this.$route.params.expression.length;
      for (let i = 0; i < loop; i++) {
        getSentence.push({
          sentenceEng: "",
          sentenceTh: "",
          speaker: ""
        });
      }
      this.sentence = getSentence;
    },
    saveData() {
      this.$refs.order.validate();
      this.$refs.vocabulary.validate();
      this.$refs.meaning.validate();
      if (this.read == "") {
        this.checkValidate = true;
        return;
      }
      if (this.$route.name == "expressionInput") {
        let filterData = this.sentence.filter(
          x => x.sentenceEng != "" && x.sentenceTh != ""
        );
        filterData.forEach(element => {
          delete element.errorEng;
          delete element.errorTh;
        });
        db.collection("practice_draft")
          .add({
            unitId: this.unitId,
            levelId: this.levelId,
            practiceId: this.practiceId,
            expression: filterData,
            order: this.order,
            status: "notSync"
          })
          .then(() => {
            this.sentence = [
              {
                sentenceEng: "",
                sentenceTh: "",
                speaker: "customer"
              },
              {
                sentenceEng: "",
                sentenceTh: "",
                speaker: "customer"
              },
              {
                sentenceEng: "",
                sentenceTh: "",
                speaker: "customer"
              },
              {
                sentenceEng: "",
                sentenceTh: "",
                speaker: "customer"
              }
            ];
            this.successData = true;
            setTimeout(() => {
              this.successData = false;
              this.$router.push(
                "/expressionMain/" + this.levelId + "/" + this.unitId
              );
            }, 700);
          });
      } else {
        this.editData();
      }
    },

    editData() {
      let filterData = this.sentence.filter(
        x => x.sentenceEng != "" && x.sentenceTh != ""
      );
      db.collection("practice_draft")
        .doc(this.$route.params.id)
        .update({
          levelId: this.levelId,
          unitId: this.unitId,
          order: this.order,
          status: "notSync",
          expression: filterData
        })
        .then(() => {
          this.$router.push("expressionMain");
        });
    }
  },
  mounted() {
    if (this.$route.name == "expressionEdit") this.editMode();
  }
};
</script>

<style lang="scss" scoped></style>
