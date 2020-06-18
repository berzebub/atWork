<template>
  <q-page align="center">
    <div class="container">
      <div class="row">
        <div class="col-sm-11 col-xs-12 relative-position">
          <div class="q-my-md">
            <b>พนักงานร้านอาหาร</b>
          </div>
          <!-- รหัสลำดับ -->
          <div>
            <div align="left">รหัสลำดับ</div>
            <div>
              <q-input outlined v-model="order" type="number" />
            </div>
          </div>
        </div>
        <div class="col-sm-1 col-xs-12 self-center"></div>
      </div>
      <div class="row" v-for="(i) in boxCount+1" :key="i">
        <div class="col-sm-11 col-xs-12 relative-position">
          <q-card class="q-my-lg text-black">
            <q-card-section class="bg-blue-grey-10 text-white">
              <div align="left" class="q-ml-sm">ประโยคที่ #{{i}}</div>
            </q-card-section>
            <!-- radio button -->
            <q-card-section>
              <div align="left" class="row">
                <q-radio
                  color="blue-grey-10"
                  class="col-6"
                  v-model="speaker"
                  val="customer"
                  label="ลูกค้า"
                />
                <q-radio
                  color="blue-grey-10"
                  class="col-6"
                  v-model="speaker"
                  val="employee"
                  label="พนักงาน"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-pl-md" align="left">ประโยคภาษาอังกฤษ</div>

              <div class="q-pa-md">
                <q-input outlined v-model="sentence[i-1].sentenceEng" />
              </div>
              <div class="q-pl-md" align="left">ประโยคภาษาไทย</div>

              <div class="q-pa-md">
                <q-input outlined v-model="sentence[i-1].sentenceTh" />
              </div>
              <q-separator v-if=" i != 1"></q-separator>
            </q-card-section>
            <!-- ถังขยะ -->
            <q-card-actions v-if="i != 1" align="right" class="q-px-lg">
              <q-btn
                @click="opendialogDeleteCard(i-1)"
                flat
                class="cursor-pointer"
                icon="far fa-trash-alt"
                style="color:blue-grey-10; font-size: 1em; position:relative; top:-10px"
              />
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-sm-1 col-xs-12 self-center" align="right">
          <!-- บวก -->
          <div class>
            <q-btn
              class="q-my-md"
              v-if="i == boxCount+1 && i < 4 "
              @click="boxCount++"
              round
              icon="fas fa-plus"
            />
          </div>
        </div>
      </div>
      <div class="row" style="width:360px; margin:auto">
        <div class="q-ma-md col">
          <q-btn
            to="/expressionMain"
            label="ยกเลิก"
            dense
            style="width:150px"
            outline
            color="blue-grey-10"
          />
        </div>
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
      <q-dialog v-model="dialogdeleteCard">
        <q-card>
          <q-card-section></q-card-section>

          <q-card-section align="center" class="q-pt-none">คุณต้องการลบ "ประโยคที่ #{{getIndex}}"</q-card-section>

          <q-card-actions style="width:323px" align="center">
            <q-btn class="q-mx-md" outline label="ยกเลิก" color="blue-grey-10" v-close-popup />
            <q-btn @click="confirmDeleteCard()" label="ตกลง" color="blue-grey-10" />
          </q-card-actions>
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
      getIndex: "",
      dialogdeleteCard: false,
      speaker: "customer",
      unit: 1,
      jobId: "ant123",
      boxCount: 1,
      order: "",
      sentence: [
        {
          sentenceEng: "",
          sentenceTh: ""
        },
        {
          sentenceEng: "",
          sentenceTh: ""
        },
        {
          sentenceEng: "",
          sentenceTh: ""
        },
        {
          sentenceEng: "",
          sentenceTh: ""
        }
      ]
    };
  },
  methods: {
    editMode() {
      this.unit = this.$route.params.unit;
      this.jobId = this.$route.params.jobId;
      let getSentence = this.$route.params.expression;
      this.boxCount = this.$route.params.expression.length - 1;
      let loop = 4 - this.$route.params.expression.length;
      console.log();
      for (let i = 0; i < loop; i++) {
        getSentence.push({
          sentenceEng: "",
          sentenceTh: ""
        });
      }
      this.sentence = getSentence;
    },
    saveData() {
      if (this.$route.name == "expressionInput") {
        let filterData = this.sentence.filter(
          x => x.sentenceEng != "" && x.sentenceTh != ""
        );
        console.log(filterData);
        db.collection("expression")
          .add({
            unit: this.unit,
            jobId: this.jobId,
            expression: filterData,
            order: this.order
          })
          .then(() => {
            this.sentence = [
              {
                sentenceEng: "",
                sentenceTh: ""
              },
              {
                sentenceEng: "",
                sentenceTh: ""
              },
              {
                sentenceEng: "",
                sentenceTh: ""
              },
              {
                sentenceEng: "",
                sentenceTh: ""
              }
            ];
            this.$router.push("/expressionMain");
          });
      } else {
        this.editData();
      }
    },
    editData() {
      let filterData = this.sentence.filter(
        x => x.sentenceEng != "" && x.sentenceTh != ""
      );
      db.collection("expression")
        .doc(this.$route.params.id)
        .update({
          unit: this.unit,
          jobId: this.jobId,
          order: this.order,
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
