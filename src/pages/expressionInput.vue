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
          <!-- ปุ่มเพิ่ม -->
          <div align="center">
            <q-btn
              @click="boxCount++"
              v-if="boxCount+2 && boxCount < 3 "
              style="width:190px"
              class="bg-blue-grey-10"
              to="/expressionInput"
              color="white"
            >เพิ่มประโยคที่ {{boxCount+2}}</q-btn>
          </div>
          <!-- รหัสลำดับ -->
          <div>
            <div class="text-h6" align="left">รหัสลำดับ</div>
          </div>
          <q-input
            ref="order"
            :rules="[ val => val]"
            outlined
            type="number"
            v-model.number="order"
          />
        </div>
      </div>
      <div class="row" v-for="(i) in boxCount+1" :key="i">
        <div class="col-sm-11 col-xs-12 relative-position">
          <q-card class="q-my-lg text-black">
            <q-card-section class="row items-center justify-between bg-blue-grey-10 text-white">
              <div align="left" class="q-ml-sm text-h6">ประโยคที่ {{i}}</div>
              <!-- ถังขยะ -->
              <div>
                <q-btn
                  v-if="i != 1"
                  align="right"
                  @click="opendialogDeleteCard(i-1)"
                  flat
                  class="cursor-pointer"
                  icon="far fa-trash-alt"
                  style="color:blue-grey-10; font-size: 1em;"
                />
              </div>
            </q-card-section>
            <!-- radio button -->
            <q-card-section>
              <div align="left" class="row">
                <q-radio
                  color="blue-grey-10"
                  class="col-6"
                  v-model="sentence[i-1].speaker"
                  val="customer"
                  label="ลูกค้า"
                />
                <q-radio
                  color="blue-grey-10"
                  class="col-6"
                  v-model="sentence[i-1].speaker"
                  val="employee"
                  label="พนักงาน"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-pl-md" align="left">ประโยคภาษาอังกฤษ</div>
              <div class="q-pa-md">
                <q-input
                  :ref="'sentenceEng'+i"
                  :error="sentence[i-1].errorEng"
                  outlined
                  v-model="sentence[i-1].sentenceEng"
                />
              </div>
              <div class="q-pl-md" align="left">ประโยคภาษาไทย</div>
              <div class="q-pa-md">
                <q-input
                  :error="sentence[i-1].errorTh"
                  :ref="'sentenceTh'+i"
                  outlined
                  v-model="sentence[i-1].sentenceTh"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row" style="width:360px; margin:auto">
        <!-- ยกเลิก -->
        <div class="q-ma-md col">
          <q-btn
            :to="'/expressionMain/'+ levelId+'/'+unitId"
            label="ยกเลิก"
            dense
            style="width:150px"
            outline
            color="blue-grey-10"
          />
        </div>
        <!-- บันทึกข้อมูล -->
        <div class="q-ma-md col">
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

          <q-card-section
            align="center"
            class="q-pt-md text-h6"
          >คุณต้องการลบ "ประโยคที่ {{getIndex}}"</q-card-section>

          <q-card-actions align="center">
            <q-btn style="width:120px" outline label="ยกเลิก" color="blue-grey-10" v-close-popup />
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

<style lang="scss" scoped>
</style>
