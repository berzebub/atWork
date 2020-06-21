<template>
  <q-page>
    <div class="container">
      <div class="text-center text-h6 q-pb-sm">Multiple Choice | U7</div>
      <div class="q-pt-sm">
        <span>รหัสลำดับ</span>
        <div>
          <q-input
            bg-color="white"
            outlined
            ref="orderid"
            type="number"
            v-model.number="orderid"
            dense
            :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ']"
          />
        </div>
      </div>
      <div class="q-pb-sm">
        <span>คำถาม</span>
        <div>
          <q-editor
            square
            outlined
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
      <div class="row">
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดรูปภาพ</div>
          <q-file bg-color="white" class="q-pa-sm" outlined v-model="uploadImg">
            <template v-slot:append>
              <q-btn
                v-if="!uploadImg"
                @click.stop="uploadImg = null"
                style="width:100px"
                label="เลือกไฟล์"
                color="blue-grey-10"
              />
              <q-btn
                v-if="uploadImg"
                @click.stop="uploadImg = null"
                color="blue-grey-10"
                icon="far fa-trash-alt"
              />
            </template>
            <div
              style="width:1000px"
              class="text-subtitle1 text-grey-7 self-center"
              v-if="!uploadImg"
            >ลากแล้ววาง หรือ</div>
          </q-file>
        </div>
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดเสียง</div>
          <q-file bg-color="white" class="q-pa-sm" outlined v-model="uploadSound">
            <template v-slot:append>
              <q-btn
                v-if="!uploadSound"
                style="width:100px"
                label="เลือกไฟล์"
                color="blue-grey-10"
              />
              <q-btn
                v-if="uploadSound"
                @click.stop="uploadSound = null"
                color="blue-grey-10"
                icon="far fa-trash-alt"
              />
            </template>
            <div
              style="width:1000px"
              class="text-subtitle1 text-grey-7 self-center"
              v-if="!uploadSound"
            >ลากแล้ววาง หรือ</div>
          </q-file>
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
              color="blue-grey-10"
            />
          </div>
        </div>
      </div>
      <div v-if="isAnswerSound">
        <div class="q-py-sm">
          <span>ตัวเลือก #1</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice1? 'brx' : null "
              @input="checkEditor('choice1')"
              :definitions="{
          upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'อัปโหลดเสียง',
          handler: uploadIt
        }
      }"
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ['upload', 'save']
      ]"
              v-model="choice[0]"
              min-height="5rem"
            />
            <q-file bg-color="white" square outlined v-model="model" label="ยังไม่ใส่ไฟล์เสียง" />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #2</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice2? 'brx' : null "
              @input="checkEditor('choice2')"
              :definitions="{
          upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'อัปโหลดเสียง',
          handler: uploadIt
        }
      }"
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ['upload', 'save']
      ]"
              v-model="choice[1]"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #3</span>
          <div>
            <q-editor
              square
              outlined
              @input="checkEditor('choice3')"
              :definitions="{
          upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'อัปโหลดเสียง',
          handler: uploadIt
        }
      }"
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ['upload', 'save']
      ]"
              v-model="choice[2]"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #4</span>
          <div>
            <q-editor
              square
              outlined
              @input="checkEditor('choice4')"
              :definitions="{
          upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'อัปโหลดเสียง',
          handler: uploadIt
        }
      }"
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ['upload', 'save']
      ]"
              v-model="choice[3]"
              min-height="5rem"
            />
          </div>
        </div>
      </div>
      <div v-if="!isAnswerSound">
        <div class="q-py-sm">
          <span>ตัวเลือก #1</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice1? 'brx' : null "
              @input="checkEditor('choice1')"
              :toolbar="[
          ['bold', 'italic', 'underline'],
          ]"
              v-model="choice[0]"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #2</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice2? 'brx' : null "
              @input="checkEditor('choice2')"
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
              v-model="choice[1]"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #3</span>
          <div>
            <q-editor
              square
              outlined
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
              v-model="choice[2]"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #4</span>
          <div>
            <q-editor
              square
              outlined
              :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
              v-model="choice[3]"
              min-height="5rem"
            />
          </div>
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
            square
            outlined
            :toolbar="[
        ['bold', 'italic', 'underline'],
        ]"
            v-model="meaning"
            min-height="5rem"
          />
        </div>
      </div>
      <div align="center">
        <div class="row reverse-wrap justify-center" style="max-width:340px;width:100%">
          <div class="col-6 q-py-sm text-left">
            <q-btn
              to="/multipleMain"
              v-close-popup
              dense
              style="width:150px"
              color="white"
              outline
              text-color="blue-grey-10"
              label="ยกเลิก"
            />
          </div>
          <div class="col-6 q-py-sm text-right">
            <q-btn
              @click="saveBtn()"
              dense
              style="width:150px"
              color="blue-grey-10"
              label="บันทึก"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      file: null,
      uploadImg: null,
      uploadSound: null,
      orderid: "",
      question: "",
      meaning: "",
      activeType: "messenger",
      correctAnswer: 1,
      isAnswerSound: false,
      choice: ["", "", "", ""],

      //   เช็คช่องคำถามข้อมูล & ตัวเลือก
      isQuestion: true,
      isChoice1: true,
      isChoice2: true
    };
  },
  methods: {
    saveBtn() {
      let hasChoice = this.choice.filter(x => x != "");
      this.$refs.orderid.validate();
      if (this.$refs.orderid.hasError) {
      }
      if (this.question == "") {
        this.isQuestion = false;
      }
      if (hasChoice.length < 2) {
        let index = this.choice.findIndex(x => x == "");
        if (index == 0) {
          this.isChoice1 = false;
        } else if (index == 1) {
          this.isChoice2 = false;
        }
      }
      let data = {
        orderid: this.orderid,
        question: this.question,
        correctAnswer: this.correctAnswer,
        choice: this.choice,
        meaning: this.meaning
      };
      db.collection("multiple_draft").add(data);
      console.log(data);

      // this.isChoice1 = true;
      // this.isChoice2 = true;
      console.log("awd");
      //   //   this.choice.map(x => x == "");

      //   console.log(this.choice.findIndex(x => x == ""));
    },
    checkEditor(type) {
      if (type == "question") {
        if (this.question.length) {
          this.isQuestion = true;
        } else {
          this.isQuestion = false;
        }
      } else if (type == "choice1") {
        if (this.choice[0].length) {
          this.isChoice1 = true;
        } else {
          this.isChoice1 = false;
        }
      } else if (type == "choice2") {
        if (this.choice[1].length) {
          this.isChoice2 = true;
        } else {
          this.isChoice2 = false;
        }
      }
    },
    uploadIt() {
      console.log("5555");
    }
  },
  mounted() {}
};
</script>
<style  scoped>
</style>