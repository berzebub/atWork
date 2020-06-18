<template>
  <q-page align="center">
    <div class="row">
      <div class="col-sm-11 col-xs-12 relative-position">
        <div>
          <div align="left">รหัสลำดับ</div>
          <div>
            <q-input outlined v-model="order" type="number" />
          </div>
        </div>
        <q-card class="text-black q-mt-md">
          <q-card-section>
            <div class="q-pl-md" align="left">ประโยคภาษาอังกฤษ #1</div>
            <div class="q-pa-md">
              <q-input outlined v-model="sentence[0].sentenceEng" label="ประโยคภาษาอังกฤษ" />
            </div>
            <div class="q-pl-md" align="left">ประโยคภาษาไทย #1</div>
            <div class="q-pa-md">
              <q-input outlined v-model="sentence[0].sentenceTh" label="ประโยคภาษาไทย" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-1 col-xs-12 self-center"></div>
    </div>
    <div class="row" v-for="i in boxCount">
      <div class="col-sm-11 col-xs-12 relative-position">
        <q-card class="q-my-lg text-black">
          <q-card-section>
            <div v-if="i == 1" class="q-pl-md" align="left">ประโยคภาษาอังกฤษ #2</div>
            <div v-if="i == 2" class="q-pl-md" align="left">ประโยคภาษาอังกฤษ #3</div>
            <div v-if="i == 3" class="q-pl-md" align="left">ประโยคภาษาอังกฤษ #4</div>
            <div class="q-pa-md">
              <q-input outlined v-model="sentence[i].sentenceEng" label="ประโยคภาษาอังกฤษ" />
            </div>
            <div v-if="i == 1" class="q-pl-md" align="left">ประโยคภาษาไทย #2</div>
            <div v-if="i == 2" class="q-pl-md" align="left">ประโยคภาษาไทย #3</div>
            <div v-if="i == 3" class="q-pl-md" align="left">ประโยคภาษาไทย #4</div>
            <div class="q-pa-md">
              <q-input outlined v-model="sentence[i].sentenceTh" label="ประโยคภาษาไทย" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-1 col-xs-12 self-center" align="right">
        <!-- บวก -->
        <div class>
          <q-btn
            class="q-my-md"
            v-if="i == boxCount && i < 3 "
            @click="boxCount++"
            round
            icon="fas fa-plus"
          />
          <q-btn
            class="q-ml-md"
            v-if="i > 1 && i == boxCount"
            @click="boxCount--"
            round
            icon="fas fa-minus"
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
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
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
    }
  },
  mounted() {
    if (this.$route.name == "expressionEdit") this.editMode();
  }
};
</script>

<style lang="scss" scoped>
</style>
