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
    <q-card class="q-my-md text-black">
      <q-card-section>
        <div class="q-pa-md" style="min-width:320px; width:100%">
          <q-input outlined v-model="sentence[1].sentenceEng" label="ประโยคภาษาอังกฤษ" />
        </div>
        <div class="q-pa-md" style="min-width:320px; width:100%">
          <q-input outlined v-model="sentence[1].sentenceTh" label="ประโยคภาษาไทย" />
        </div>
      </q-card-section>
    </q-card>

    <div class="q-ma-md">
      <q-btn
        @click="login()"
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
export default {
  data() {
    return {
      sentence: [
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
  }
};
</script>

<style lang="scss" scoped>
</style>