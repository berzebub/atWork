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
            v-model.number="data.order"
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
            v-model="data.question"
            min-height="5rem"
          />
        </div>
      </div>
      <div class="row">
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดรูปภาพ</div>
          <q-file accept="image/*" bg-color="white" class="q-pa-sm" outlined v-model="uploadImg ">
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
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดเสียง</div>
          <q-file accept="audio/*" bg-color="white" class="q-pa-sm" outlined v-model="uploadSound">
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
      <div class="q-py-sm">
        <span>รูปภาพตัวเลือก</span>
        <div class="row q-py-sm" style="width:360px">
          <div class="col-6">
            <q-checkbox
              style="margin: -10px;"
              v-model="data.isAnswerSound"
              val="teal"
              label="แบบมีเสียง"
              color="blue-grey-10"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="q-py-sm">
          <span>ตัวเลือก #1</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice1? 'brx' : null "
              @input="checkEditor('choice1')"
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt1   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[0]"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile1">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile1">{{dataFile1}}</span>
              </div>
              <span v-if="dataFile1">
                <q-btn
                  @click="dataFile1 = null"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound1($event.target.files)"
            type="file"
            :id="'soundId1'"
            accept="audio/*"
            class="visually-hidden"
          />
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #2</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice2? 'brx' : null "
              @input="checkEditor('choice2')"
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt2   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[1]"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile2">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile2">{{dataFile2}}</span>
              </div>
              <span v-if="dataFile2">
                <q-btn
                  @click="dataFile2 = null"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound2($event.target.files)"
            type="file"
            :id="'soundId2'"
            accept="audio/*"
            class="visually-hidden"
          />
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #3</span>
          <div>
            <q-editor
              square
              outlined
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt3   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[2]"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile3">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile3">{{dataFile3}}</span>
              </div>
              <span v-if="dataFile3">
                <q-btn
                  @click="dataFile3 = null"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound3($event.target.files)"
            type="file"
            :id="'soundId3'"
            accept="audio/*"
            class="visually-hidden"
          />
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #4</span>
          <div>
            <q-editor
              square
              outlined
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt4   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[3]"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile4">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile4">{{dataFile4}}</span>
              </div>
              <span v-if="dataFile4">
                <q-btn
                  @click="dataFile4 = null"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound4($event.target.files)"
            type="file"
            :id="'soundId4'"
            accept="audio/*"
            class="visually-hidden"
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
              v-model.number="data.correctAnswer"
              :val="1"
              label="1"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-sm">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10"
              v-model.number="data.correctAnswer"
              :val="2"
              label="2"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-md">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10"
              v-model.number="data.correctAnswer"
              :val="3"
              label="3"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-md">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10 "
              v-model.number="data.correctAnswer"
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
            v-model="data.description"
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
      <!-- finish -->
      <q-dialog v-model="finishDialog">
        <q-card style="max-width:600px;width:100%;height:200px">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div class="q-py-md q-mt-md">
              <q-icon color="secondary" size="46px" name="far fa-check-circle" />
            </div>
            <div>{{text}}</div>
          </div>
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
      file: null,
      uploadImg: null,
      uploadSound: null,
      user: "",
      dataFile1: null,
      dataFile2: null,
      dataFile3: null,
      dataFile4: null,
      data: {
        key: "",
        order: "",
        question: "",
        description: "",
        correctAnswer: 1,
        choices: [
          { choice: "", soundUrl: "" },
          { choice: "", soundUrl: "" },
          { choice: "", soundUrl: "" },
          { choice: "", soundUrl: "" }
        ],
        imageUrl: "",
        soundUrl: "",
        isAnswerSound: false
      },
      choices: ["", "", "", ""],
      activeType: "messenger",
      //   เช็คช่องคำถามข้อมูล & ตัวเลือก
      isQuestion: true,
      isChoice1: true,
      isChoice2: true,
      finishDialog: false,
      text: ""
    };
  },
  methods: {
    loadDataEdit() {
      db.collection("multiple_draft")
        .doc(this.$route.params.key)
        .get()
        .then(doc => {
          this.choices = [];
          let change = doc.data().choices;
          for (let index = 0; index < change.length; index++) {
            this.choices.push(change[index].choice);
          }
          this.data = doc.data();
        });
    },
    saveBtn() {
      let hasChoice = this.choices.filter(x => x != "");
      this.$refs.orderid.validate();
      if (this.$refs.orderid.hasError) {
      }
      if (this.data.question == "") {
        this.isQuestion = false;
      }
      if (hasChoice.length < 2) {
        let index = this.choices.findIndex(x => x == "");
        console.log(index);
        if (index == 0) {
          this.isChoice1 = false;
        } else if (index == 1) {
          this.isChoice2 = false;
        }
        return;
      }
      if (this.$route.name == "multipleInputAdd") {
        let change = [
          { choice: this.choices[0] },
          { choice: this.choices[1] },
          { choice: this.choices[2] },
          { choice: this.choices[3] }
        ];
        this.data.choices = change;
        db.collection("multiple_draft")
          .add(this.data)
          .then(doc => {
            db.collection("multiple_draft")
              .doc(doc.id)
              .update({ key: doc.id });
            this.finishDialog = true;
            this.text = "บันทึกข้อมูลเรียบร้อย";
            // this.$router.push("/multipleMain");
          });
      } else {
        db.collection("multiple_draft")
          .doc(this.$route.params.key)
          .set(this.data)
          .then(doc => {
            this.$router.push("/multipleMain");
          });
      }
    },
    checkEditor(type) {
      if (type == "question") {
        if (this.data.question.length) {
          this.isQuestion = true;
        } else {
          this.isQuestion = false;
        }
      } else if (type == "choice1") {
        if (this.choices[0].length) {
          this.isChoice1 = true;
        } else {
          this.isChoice1 = false;
        }
      } else if (type == "choice2") {
        if (this.choices[1].length) {
          this.isChoice2 = true;
        } else {
          this.isChoice2 = false;
        }
      }
    },
    fileSound1(val) {
      this.dataFile1 = val[0].name;
    },
    fileSound2(val) {
      this.dataFile2 = val[0].name;
    },
    fileSound3(val) {
      this.dataFile3 = val[0].name;
    },
    fileSound4(val) {
      this.dataFile4 = val[0].name;
    },
    uploadIt1() {
      const elemClick = document.getElementById("soundId1");
      addEventListener("click", function clear() {
        if (elemClick) {
          elemClick.click();
        }
        event.currentTarget.removeEventListener(event.type, clear);
      });
    },
    uploadIt2() {
      const elemClick = document.getElementById("soundId2");
      addEventListener("click", function clear() {
        if (elemClick) {
          elemClick.click();
        }
        event.currentTarget.removeEventListener(event.type, clear);
      });
    },
    uploadIt3() {
      const elemClick = document.getElementById("soundId3");
      addEventListener("click", function clear() {
        if (elemClick) {
          elemClick.click();
        }
        event.currentTarget.removeEventListener(event.type, clear);
      });
    },
    uploadIt4() {
      const elemClick = document.getElementById("soundId4");
      addEventListener("click", function clear() {
        if (elemClick) {
          elemClick.click();
        }
        event.currentTarget.removeEventListener(event.type, clear);
      });
    }
  },
  mounted() {
    if (this.$route.name == "multipleInputEdit") {
      this.loadDataEdit();
    } else {
    }
  }
};
</script>
<style  scoped>
.box {
  border: 1px solid #d4d4d4;
  background-color: white;
}
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}
</style>