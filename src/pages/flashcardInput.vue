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
              :rules="[val => val]"
              outlined
              type="number"
              v-model.number="order"
            />
          </div>
          <!-- ไฟล์รูปภาพ -->
          <div>
            <div class="row items-center">
              <div class="text-h6">ไฟล์รูปภาพ</div>
              <div class="q-mx-md text-subtitle1 text-blue-grey-4">
                ไฟล์ jpg ขนาด 400x300 px เท่านั้น
              </div>
            </div>
            <div class="brg2" style="width:600px;height:80px; margin:auto">
              <q-input
                @input="
                  val => {
                    files = val;
                  }
                "
                type="file"
              >
              </q-input>
            </div>
          </div>
          <!-- ไฟล์รูปภาพ -->
          <div class="q-mt-lg">
            <div class="row items-center">
              <div class="text-h6">ไฟล์เสียง</div>
              <div class="q-mx-md text-subtitle1 text-blue-grey-4">
                ไฟล์ mp3 เท่านั้น
              </div>
            </div>
            <div class="brg2" style="width:600px;height:80px; margin:auto">
              <q-input
                @input="
                  val => {
                    files = val;
                  }
                "
                type="file"
              >
              </q-input>
            </div>
          </div>
          <!-- คำศัพท์ -->
          <div class="q-mt-md">
            <div>
              <div class="text-h6" align="left">คำศัพท์</div>
            </div>
            <q-input
              ref="order"
              :rules="[val => val]"
              outlined
              type="number"
              v-model.number="order"
            />
          </div>
        </div>
      </div>
      <div class=" row" style="width:360px; margin-left:21%">
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
      <!-- ยืนยันการลบ -->
      <q-dialog v-model="dialogdeleteCard" persistent>
        <q-card style="min-width: 350px; height:170px">
          <q-card-section></q-card-section>

          <q-card-section align="center" class="q-pt-md text-h6"
            >คุณต้องการลบ "ประโยคที่ {{ getIndex }}"</q-card-section
          >

          <q-card-actions align="center">
            <q-btn
              style="width:120px"
              outline
              label="ยกเลิก"
              color="blue-grey-10"
              v-close-popup
            />
            <q-btn
              @click="confirmDeleteCard()"
              style="width:120px"
              label="ตกลง"
              color="blue-grey-10"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import { db } from "../router";
export default {
  data() {
    return {
      practiceId: "",
      levelId: this.$route.params.levelId,
      successData: false,
      getIndex: "",
      dialogdeleteCard: false,
      unitId: this.$route.params.unitId,
      boxCount: 1,
      order: "",
      errorSentenceEng1: false,
      sentence: [
        {
          sentenceEng: "",
          sentenceTh: "",
          speaker: "customer",
          errorEng: false,
          errorTh: false
        },
        {
          sentenceEng: "",
          sentenceTh: "",
          speaker: "customer",
          errorEng: false,
          errorTh: false
        },
        {
          sentenceEng: "",
          sentenceTh: "",
          speaker: "customer",
          errorEng: false,
          errorTh: false
        },
        {
          sentenceEng: "",
          sentenceTh: "",
          speaker: "customer",
          errorEng: false,
          errorTh: false
        }
      ]
    };
  },
  methods: {
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
      for (let i = 0; i < this.boxCount + 1; i++) {
        this.sentence[i].errorEng = false;
        this.sentence[i].errorTh = false;
      }
      for (let i = 0; i < this.boxCount + 1; i++) {
        if (!this.sentence[i].sentenceEng.length) {
          this.sentence[i].errorEng = true;
        }
        if (!this.sentence[i].sentenceTh.length) {
          this.sentence[i].errorTh = true;
        }
      }
      let filter = this.sentence.filter(
        x => x.errorEng == true || x.errorTh == true
      );
      if (filter.length > 0) {
        this.$q.notify({
          message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
          color: "red",
          position: "top"
        });
        return;
      }
      this.$refs.order.validate();
      if (this.$refs.order.hasError) {
        this.$q.notify({
          message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
          color: "red",
          position: "top"
        });
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
    },
    opendialogDeleteCard(index) {
      this.getIndex = index + 1;
      if (
        this.sentence[index].sentenceEng.length > 0 ||
        this.sentence[index].sentenceTh.length > 0
      ) {
        this.dialogdeleteCard = true;
      } else {
        this.moveData(index);
      }
    },
    moveData() {
      this.sentence.splice(this.getIndex - 1, 1);
      this.sentence.push({ sentenceEng: "", sentenceTh: "" });
      this.boxCount--;
    },
    confirmDeleteCard() {
      this.dialogdeleteCard = false;
      this.moveData();
    }
  },
  mounted() {
    if (this.$route.name == "expressionEdit") this.editMode();
  }
};
</script>

<style lang="scss" scoped></style>
