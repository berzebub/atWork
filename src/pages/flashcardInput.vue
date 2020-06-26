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
            <div>
              <q-file accept="image/*" bg-color="white" outlined v-model="uploadImg ">
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
            <div>
              <q-file accept=".mp3" bg-color="white" outlined v-model="uploadSound">
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
            <div
              :style="this.checkValidate == false?'visibility:hidden': null"
              align="left"
              class="error-text"
            >กรุณากรอกข้อมูลให้ถูกต้อง</div>
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
            :to="'/flashcardMain/' + levelId + '/'+ unitId "
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
            :disable="isClick"
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
      <!-- เพิ่มข้อมูลสำเร็จ -->
      <q-dialog v-model="successData">
        <q-card style="min-width: 350px; height:170px">
          <q-card-section class="absolute-center" align="center">
            <div>
              <q-icon color="secondary" size="lg" name="far fa-check-circle" />
            </div>
            <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
          </q-card-section>
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
      successData: false,
      uploadSound: null,
      uploadImg: null,
      checkValidate: false,
      practiceId: "",
      levelId: this.$route.params.levelId,
      unitId: this.$route.params.unitId,
      order: "",
      vocabulary: "",
      read: "",
      meaning: "",
      isClick: false
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
        this.$router.push("/flashcardMain");
      }
      this.levelId = this.$route.params.levelId;
      this.practiceId = this.$route.params.practiceId;
      this.order = this.$route.params.order;
      this.unitId = this.$route.params.unitId;
    },
    saveData() {
      st.child("practice/image/")
        .put()
        .then(getImg => {
          console.log(getImg);
        });
      return;
      this.$refs.order.validate();
      this.$refs.vocabulary.validate();
      this.$refs.meaning.validate();
      if (
        this.$refs.order.hasError ||
        this.$refs.vocabulary.hasError ||
        this.$refs.meaning.hasError
      ) {
        return;
      }
      if (this.read == "") {
        this.checkValidate = true;
        return;
      }
      this.isClick = true;
      if (this.$route.name == "flashcardInput") {
        db.collection("practice_draft")
          .add({
            unitId: this.unitId,
            levelId: this.levelId,
            practiceId: this.practiceId,
            order: this.order,
            vocabulary: this.vocabulary,
            read: this.read,
            meaning: this.meaning,
            status: "notSync"
          })
          .then(() => {
            this.successData = true;
            setTimeout(() => {
              this.successData = false;
              this.$router.push(
                "/flashcardMain/" + this.levelId + "/" + this.unitId
              );
            }, 700);
          });
      } else {
        this.editData();
      }
    },

    editData() {
      db.collection("practice_draft")
        .doc(this.$route.params.id)
        .update({
          unitId: this.unitId,
          levelId: this.levelId,
          practiceId: this.practiceId,
          order: this.order,
          vocabulary: this.vocabulary,
          read: this.read,
          meaning: this.meaning,
          uploadImg: this.uploadImg,
          uploadSound: this.uploadSound,
          status: "notSync"
        })
        .then(() => {
          this.$router.push(
            "/flashcardMain/" + this.levelId + "/" + this.unitId
          );
        });
    }
  },
  mounted() {
    if (this.$route.name == "flashcardEdit") this.editMode();
  }
};
</script>

<style lang="scss" scoped></style>
