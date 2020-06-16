<template>
  <q-page align="center">
    <q-card class="text-black q-mt-md">
      <q-card-section>
        <div class="q-pa-md" style="min-width:320px; width:100%">
          <q-input outlined v-model="sentence[0].sentenceEng" label="ประโยคภาษาอังกฤษ" />
        </div>
        <div class="q-pa-md" style="min-width:320px; width:100%">
          <q-input outlined v-model="sentence[0].sentenceTh" label="ประโยคภาษาไทย" />
        </div>
      </q-card-section>
    </q-card>
    <div class="row">
      <div v-for="i in test" class="col-12 relative-position">
        <q-card class="q-my-lg text-black">
          <q-card-section>
            <div class="q-pa-md" style="min-width:320px; width:100%">
              <q-input outlined v-model="sentence[i].sentenceEng" label="ประโยคภาษาอังกฤษ" />
            </div>
            <div class="q-pa-md" style="min-width:320px; width:100%">
              <q-input outlined v-model="sentence[i].sentenceTh" label="ประโยคภาษาไทย" />
            </div>
          </q-card-section>
        </q-card>
        <!-- บวก -->
        <div
          v-if="i == test && i < 3 "
          class="absolute-right"
          :style=" i == 1 ? 'top:45%; right:-8%' : 'top:30%; right:-8%'"
        >
          <q-btn @click="test++" round color="primary" icon="fas fa-plus" />
        </div>
        <!-- ลบ -->
        <div
          v-if="i > 1 && i == test"
          class="absolute-right"
          :style=" i == 3 ?'top:45%; right:-8%' : 'top:65%; right:-8%'"
        >
          <q-btn @click="test--" round color="primary" icon="fas fa-minus" />
        </div>
      </div>
    </div>

    <div class="q-ma-md">
      <q-btn
        @click="saveData()"
        label="บันทึก"
        class="q-ma-md"
        style="width:120px"
        outline
        color="red"
      />
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
      test: 1,
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
    saveData() {
      let filterData = this.sentence.filter(
        x => x.sentenceEng != "" && x.sentenceTh != ""
      );
      console.log(filterData);
      db.collection("expression")
        .add({
          unit: this.unit,
          jobId: this.jobId,
          expression: filterData
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
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>