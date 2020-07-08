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
            <div class="row items-center">
              <div class="text-subtitle1" align="left">รหัสลำดับ</div>
              <div
                class="q-ml-md text-body2 text-blue-grey-7"
                style="margin-top:0.7%          "
              >ตัวเลข 3 หลัก</div>
            </div>
            <q-input
              ref="order"
              :rules="[val => val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
              outlined
              mask="###"
              v-model.number="data.order"
            />
          </div>
          <!-- ไฟล์รูปภาพ -->
          <div v-if="isAddMode">
            <div>
              <div class="row items-center">
                <div align="left" class="text-subtitle1">ไฟล์รูปภาพ</div>
                <div
                  class="q-ml-md text-blue-grey-7 text-body2"
                  style="margin-top:0.7%"
                >ไฟล์ jpg ขนาด 300x300 px เท่านั้น</div>
              </div>
              <div>
                <q-file accept="image/*" bg-color="white" outlined v-model="uploadImg">
                  <template v-slot:append>
                    <!-- ปุ่มเลือกไฟล์ -->
                    <div
                      style="width:100px"
                      class="text-body2 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                      @click.stop="uploadImg = null"
                      v-if="!uploadImg "
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
                    v-if="data.isImage == true"
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                  >{{uploadImg}}</div>
                  <div
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                    v-if="!uploadImg"
                  >ลากแล้ววาง หรือ</div>
                </q-file>
              </div>
            </div>
          </div>
          <div v-if="!isAddMode">
            <div>
              <div class="row items-center">
                <div align="left" class="text-subtitle1">ไฟล์รูปภาพ</div>
                <div
                  class="q-ml-md text-blue-grey-7 text-body2"
                  style="margin-top:0.7%"
                >ไฟล์ jpg ขนาด 300x300 px เท่านั้น</div>
              </div>
              <div>
                <q-file accept="image/*" bg-color="white" outlined v-model="uploadImg">
                  <template v-slot:append>
                    <!-- ปุ่มเลือกไฟล์ -->
                    <div
                      style="width:100px"
                      class="text-body2 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                      @click.stop="uploadImg = null"
                      v-if="!data.isImage"
                    >เลือกไฟล์</div>
                    <div
                      class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                      v-if="data.isImage "
                      @click.stop="uploadImg  = null"
                    >
                      <span style class="far fa-trash-alt q-px-xs"></span>
                    </div>
                  </template>
                  <div
                    v-if="data.isImage == true"
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                  >
                    <span v-if="uploadImg == null">{{practiceKey + ".jpg"}}</span>
                  </div>
                  <div
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                    v-if="!data.isImage"
                  >ลากแล้ววาง หรือ</div>
                </q-file>
              </div>
            </div>
          </div>

          <!-- ไฟล์เสียง -->
          <div v-if="isAddMode">
            <div>
              <div class="row items-center">
                <div align="left" class="text-subtitle1">ไฟล์เสียง</div>
                <div
                  class="q-ml-md text-blue-grey-7 text-body2"
                  style="margin-top:0.7%"
                >ไฟล์ mp3 เท่านั้น</div>
              </div>
              <div>
                <q-file accept=".mp3" bg-color="white" outlined v-model="uploadSound">
                  <template v-slot:append>
                    <!-- ปุ่มเลือกไฟล์ -->
                    <div
                      style="width:100px;"
                      class="text-body2 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                      @click.stop="uploadSound = null"
                      v-if="!uploadSound"
                    >เลือกไฟล์</div>
                    <!-- ปุ่มลบไฟล์ -->
                    <div
                      class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                      v-if="uploadSound"
                      @click.stop="uploadSound = null"
                    >
                      <span style class="far fa-trash-alt q-px-xs"></span>
                    </div>
                  </template>
                  <div
                    v-if="data.isSound == true"
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                  >{{uploadSound}}</div>
                  <div
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                    v-if="!uploadSound"
                  >ลากแล้ววาง หรือ</div>
                </q-file>
              </div>
            </div>
          </div>
          <div v-if="!isAddMode">
            <div>
              <div class="row items-center">
                <div align="left" class="text-subtitle1">ไฟล์เสียง</div>
                <div class="q-ml-md text-blue-grey-7" style="margin-top:0.7%">ไฟล์ mp3 เท่านั้น</div>
              </div>
              <div>
                <q-file accept=".mp3" bg-color="white" outlined v-model="uploadSound">
                  <template v-slot:append>
                    <!-- ปุ่มเลือกไฟล์ -->
                    <div
                      style="width:100px;"
                      class="text-body2 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                      @click.stop="uploadSound = null"
                      v-if="!data.isSound"
                    >เลือกไฟล์</div>
                    <!-- ปุ่มลบไฟล์ -->
                    <div
                      class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                      v-if="data.isSound"
                      @click.stop="uploadSound = null"
                    >
                      <span style class="far fa-trash-alt q-px-xs"></span>
                    </div>
                  </template>
                  <div
                    v-if="data.isSound == true"
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                  >
                    <span v-if="uploadSound == null">{{practiceKey + ".jpg"}}</span>
                  </div>
                  <div
                    style="width:1000px"
                    class="text-body2 text-grey-7 self-center"
                    v-if="!data.isSound"
                  >ลากแล้ววาง หรือ</div>
                </q-file>
              </div>
            </div>
          </div>

          <!-- คำศัพท์ -->
          <div class="q-mt-md">
            <div>
              <div class="text-subtitle1" align="left">คำศัพท์</div>
            </div>
            <q-input
              ref="vocabulary"
              v-model="data.vocabulary"
              outlined
              :rules="[val => !!val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
            />
          </div>
          <!-- คำอ่าน -->
          <div>
            <div class="text-subtitle1" align="left">คำอ่าน</div>
            <div align="left">
              <q-editor
                @input="checkRead()"
                :class="this.checkValidate == true?'error-border': null "
                ref="read"
                v-model="data.read"
                min-height="5rem"
                :toolbar="[
              ['bold', 'italic', 'underline']
              ]"
              />
            </div>
            <div
              align="left"
              :style="this.checkValidate == false?'visibility:hidden': null"
              class="error-text q-ml-md font"
            >กรุณากรอกข้อมูลให้ถูกต้อง</div>
          </div>
          <!-- คำแปล -->
          <div class="q-mt-md">
            <div>
              <div class="text-subtitle1" align="left">คำแปล</div>
            </div>
            <q-input
              type="textarea"
              ref="meaning"
              v-model="data.meaning"
              outlined
              :rules="[val => !!val || 'กรุณากรอกข้อมูลให้ถูกต้อง']"
            />
          </div>
        </div>
      </div>
      <div class="row" :style="$q.platform.is.desktop?'width:360px; margin-left:21%':null">
        <!-- ยกเลิก -->
        <div class="q-mt-md col">
          <q-btn
            :to="'/flashcardMain/' + data.levelId + '/'+ data.unitId + '/'+ data.practiceId "
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
        <q-card style="min-width: 350px; height:200px">
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
      isClick: false,
      isAddMode: true,
      data: {
        order: "",
        vocabulary: "",
        read: "",
        meaning: "",
        levelId: this.$route.params.levelId,
        unitId: this.$route.params.unitId,
        status: "notSync",
        practiceId: this.$route.params.practiceId,
        isImage: false,
        isSound: false
      },
      practiceKey: this.$route.params.id
    };
  },
  methods: {
    checkRead() {
      if (this.data.read == "") {
        this.checkValidate = true;
      } else {
        this.checkValidate = false;
      }
    },
    editMode() {
      this.isAddMode = false;
      if (this.$route.params.levelId == undefined) {
        this.$router.push(
          "/flashcardMain/" +
            this.data.levelId +
            "/" +
            this.data.unitId +
            "/" +
            this.data.practiceId
        );
      }
      this.data = this.$route.params.data;
    },
    saveData() {
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
      if (this.data.read == "") {
        this.checkValidate = true;
        return;
      }
      this.isClick = true;
      if (this.$route.name == "flashcardInput") {
        if (this.uploadImg != null) {
          this.data.isImage = true;
        }
        if (this.uploadSound != null) {
          this.data.isSound = true;
        }
        db.collection("practice_draft")
          .add(this.data)
          .then(getId => {
            if (this.data.isImage == true) {
              st.child("practice/image/" + getId.id + ".jpg").put(
                this.uploadImg
              );
            }
            if (this.data.isSound == true) {
              st.child("practice/audio/" + getId.id + ".mp3").put(
                this.uploadSound
              );
            }
            this.successData = true;
            setTimeout(() => {
              this.successData = false;
              this.$router.push(
                "/flashcardMain/" +
                  this.data.levelId +
                  "/" +
                  this.data.unitId +
                  "/" +
                  this.data.practiceId
              );
            }, 2500);
          });
      } else {
        this.editData();
      }
    },

    editData() {
      db.collection("practice_draft")
        .doc(this.$route.params.id)
        .update(this.data)
        .then(() => {
          if (this.uploadImg) {
            st.child("practice/image/" + this.practiceKey + ".jpg").put(
              this.uploadImg
            );
          }
          if (this.uploadSound) {
            st.child("practice/audio/" + this.practiceKey + ".mp3").put(
              this.uploadSound
            );
          }
          this.successData = true;
          setTimeout(() => {
            this.successData = false;
            this.$router.push(
              "/flashcardMain/" +
                this.data.levelId +
                "/" +
                this.data.unitId +
                "/" +
                this.data.practiceId
            );
          }, 2500);
        });
    }
  },
  mounted() {
    if (this.$route.name == "flashcardEdit") this.editMode();
  }
};
</script>

<style lang="scss" scoped>
.font {
  font-size: 12px;
}
</style>
