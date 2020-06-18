<template>
  <q-page>
    <div>
      <div class="text-center text-h6 q-pb-sm">Multiple Choice | U7</div>
      <div class="q-pt-sm">
        <span>รหัสลำดับ</span>
        <div>
          <q-input
            outlined
            ref="orderId"
            type="number"
            v-model.number="orderId"
            dense
            :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ']"
          />
        </div>
      </div>
      <div class="q-pb-sm">
        <span>คำถาม</span>
        <div>
          <q-editor
            :content-class="!isQuestion? 'brx' : null "
            @input="checkEditor('question')"
            :toolbar="[
          ['bold', 'italic', 'underline'],
          ]"
            v-model="question"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="row q-py-sm" style="width:360px">
        <div class="col-4">
          <q-radio
            style="margin: -10px;"
            color="blue-grey-10"
            v-model="activeType"
            val="messenger"
            label="ข้อความ"
          />
        </div>

        <div class="col-4">
          <q-radio
            style="margin: -10px;"
            color="blue-grey-10"
            v-model="activeType"
            val="image"
            label="มีรูปภาพ"
          />
        </div>
        <div class="col-4">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model="activeType"
            val="sound"
            label="มีเสียง"
          />
        </div>
      </div>

      <div class="q-py-sm">
        <span>รูปภาพตัวเลือก</span>
        <div class="row q-py-sm" style="width:360px">
          <div class="col-6">
            <q-checkbox
              style="margin: -10px;"
              v-model="isAnswerSound"
              val="teal"
              label="แบบมีเสียง"
              color="black"
            />
          </div>
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #1</span>
        <div>
          <q-editor
            :content-class="!isChoice1? 'brx' : null "
            @input="checkEditor('choices1')"
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="choices[0]"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #2</span>
        <div>
          <q-editor
            :content-class="!isChoice2? 'brx' : null "
            @input="checkEditor('choices2')"
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="choices[1]"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #3</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="choices[2]"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือก #4</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="choices[3]"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="q-py-sm">
        <span>ตัวเลือกที่ถูกต้อง</span>
        <div class="row q-py-sm">
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-sm">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10"
              v-model.number="correctAnswer"
              :val="1"
              label="1"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-sm">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10"
              v-model.number="correctAnswer"
              :val="2"
              label="2"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-md">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10"
              v-model.number="correctAnswer"
              :val="3"
              label="3"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-md">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10 "
              v-model.number="correctAnswer"
              :val="4"
              label="4"
            />
          </div>
        </div>
      </div>
      <div class="q-pb-lg">
        <span>คำอธิบาย *ต้องใช้ตัวหนาสำหรับตัวเลือกที่ถูกต้อง</span>
        <div>
          <q-editor
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="explain"
            min-height="5rem"
          />
        </div>
      </div>
      <div align="center">
        <div class="row wrap" style="max-width:340px;width:100%">
          <div class="col text-left">
            <q-btn
              dense
              style="width:150px"
              color="white"
              outline
              text-color="black"
              label="ยกเลิก"
            />
          </div>
          <div class="col text-right">
            <q-btn @click="addBtn()" dense style="width:150px" color="black" label="บันทึก" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      question: "",
      explain: "",
      activeType: "messenger",
      correctAnswer: 1,
      isAnswerSound: false,
      choices: ["", "", "", ""],

      //   เช็คช่องคำถามข้อมูล & ตัวเลือก
      isQuestion: true,
      isChoice1: true,
      isChoice2: true
    };
  },
  methods: {
    addBtn() {
      console.log(this.choices);
      let hasChoices = this.choices.filter(x => x != "");
      console.log(hasChoices);
      this.$refs.orderId.validate();
      if (this.$refs.orderId.hasError) {
      }
      if (this.question == "") {
        this.isQuestion = false;
      }
      if (hasChoices.length < 2) {
        let index = this.choices.findIndex(x => x == "");
        if (index == 0) {
          this.isChoice1 = false;
        } else if (index == 1) {
          this.isChoice2 = false;
        }
      }
      this.isChoice1 = true;
      this.isChoice2 = true;
      //   //   this.choices.map(x => x == "");

      //   console.log(this.choices.findIndex(x => x == ""));
    },
    checkEditor(type) {
      if (type == "question") {
        if (this.question.length) {
          this.isQuestion = true;
        } else {
          this.isQuestion = false;
        }
      } else if (type == "choices1") {
        if (this.choices[0].length) {
          this.isChoice1 = true;
        } else {
          this.isChoice1 = false;
        }
      } else if (type == "choices2") {
        if (this.choices[1].length) {
          this.isChoice2 = true;
        } else {
          this.isChoice2 = false;
        }
      }
    }
  }
};
</script>
<style  scoped>
</style>