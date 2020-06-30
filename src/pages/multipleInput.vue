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
          <div class="q-pt-xs text-red text-body2">{{isTextQuestion}}</div>
        </div>
      </div>
      <div class="row">
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดรูปภาพ</div>
          <q-file accept="image/*" bg-color="white" class="q-pa-sm" outlined v-model="uploadImg">
            <template v-slot:append>
              <div
                style="width:100px"
                class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                @click.stop="uploadImg = null"
                v-if="!uploadImg && !isKeyImage"
              >เลือกไฟล์</div>
              <span v-if="uploadImg || isKeyImage" class="text-body1 q-pr-md">{{isKeyImage}}</span>
              <div
                class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                v-if="uploadImg || isKeyImage"
                @click.stop="uploadImg  = null"
                @click="isKeyImage  = ''"
              >
                <span style class="far fa-trash-alt q-px-xs"></span>
              </div>
            </template>
            <div
              style="width:1000px"
              class="text-subtitle1 text-grey-7 self-center"
              v-if="!uploadImg && !isKeyImage"
            >ลากแล้ววาง หรือ</div>
          </q-file>
        </div>
        <div class="q-py-md col-md-6 col-sm-6 col-xs-12">
          <div>อัปโหลดเสียง</div>
          <q-file accept="audio/*" bg-color="white" class="q-pa-sm" outlined v-model="uploadAudio">
            <template v-slot:append>
              <div
                style="width:100px;"
                class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                @click.stop="uploadAudio = null"
                v-if="!uploadAudio && !isKeySound"
              >เลือกไฟล์</div>
              <span v-if="uploadAudio || isKeySound" class="text-body1 q-pr-md">{{isKeySound}}</span>
              <div
                class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                v-if="uploadAudio || isKeySound"
                @click.stop="uploadAudio = null"
                @click="isKeySound = ''"
              >
                <span style class="far fa-trash-alt q-px-xs"></span>
              </div>
            </template>
            <div
              style="width:1000px"
              class="text-subtitle1 text-grey-7 self-center"
              v-if="!uploadAudio && !isKeySound"
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
              v-model="choices[0].choice"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile1 && !isAudio1">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile1 ">{{dataFile1.name}}</span>
                <span v-if="isAudio1 ">{{isAudio1}}</span>
              </div>
              <span v-if="dataFile1 || isAudio1">
                <q-btn
                  @click.stop="dataFile1 = null"
                  @click="isAudio1 = ''"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound($event.target.files,1)"
            type="file"
            :id="'soundId1'"
            accept="audio/*"
            class="visually-hidden"
          />
          <div class="q-pt-xs text-red text-body2">{{isTextChoice1}}</div>
          <div class="q-pt-xs text-red text-body2">{{isText1}}</div>
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
              v-model="choices[1].choice"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile2 &&  !isAudio2">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile2">{{dataFile2.name}}</span>
                <span v-if="isAudio2 ">{{isAudio2}}</span>
              </div>
              <span v-if="dataFile2 || isAudio2">
                <q-btn
                  @click.stop="dataFile2 = null"
                  @click="isAudio2 = ''"
                  dense
                  icon="far fa-trash-alt"
                  color="blue-grey-10"
                />
              </span>
            </div>
          </div>
          <input
            @change="fileSound($event.target.files,2)"
            type="file"
            :id="'soundId2'"
            accept="audio/*"
            class="visually-hidden"
          />
          <div class="q-pt-xs text-red text-body2">{{isTextChoice2}}</div>
          <div class="q-pt-xs text-red text-body2">{{isText2}}</div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #3</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice3? 'brx' : null "
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt3   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[2].choice"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile3 && !isAudio3">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile3">{{dataFile3.name}}</span>
                <span v-if="isAudio3 ">{{isAudio3}}</span>
              </div>
              <span v-if="dataFile3 || isAudio3">
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
            @change="fileSound($event.target.files,3)"
            type="file"
            :id="'soundId3'"
            accept="audio/*"
            class="visually-hidden"
          />
          <div class="q-pt-xs text-red text-body2">{{isTextChoice3}}</div>
        </div>
        <div class="q-py-sm">
          <span>ตัวเลือก #4</span>
          <div>
            <q-editor
              square
              outlined
              :content-class="!isChoice4? 'brx' : null "
              :definitions="data.isAnswerSound ?  {
               upload: {icon: 'cloud_upload',label: 'อัปโหลดเสียง',handler: uploadIt4   }} : null "
              :toolbar="[['bold', 'italic', 'underline'],['upload', 'save']]"
              v-model="choices[3].choice"
              min-height="5rem"
            />
            <div v-if="data.isAnswerSound" class="q-pa-md box row">
              <div class="col row justify-center self-center">
                <span v-if="!dataFile4 && !isAudio4">ยังไม่ใส่ไฟล์เสียง</span>
                <span v-if="dataFile4">{{dataFile4.name}}</span>
                <span v-if="isAudio4 ">{{isAudio4}}</span>
              </div>
              <span v-if="dataFile4 ||isAudio4">
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
            @change="fileSound($event.target.files,4)"
            type="file"
            :id="'soundId4'"
            accept="audio/*"
            class="visually-hidden"
          />
          <div class="q-pt-xs text-red text-body2">{{isTextChoice4}}</div>
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
              :disable="choices[0].choice.length > 0 && !choices[2].choice.length "
              v-model.number="data.correctAnswer"
              :val="3"
              label="3"
            />
          </div>
          <div class="col-xs-6 col-md-3 col-sm-3 q-py-md">
            <q-radio
              style="margin:-10px"
              color="blue-grey-10 "
              :disable="choices[0].choice.length > 0  && !choices[3].choice.length "
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
              :disable="checkble"
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
              <q-icon
                v-if="iconTrueDialog"
                color="secondary"
                size="46px"
                name="far fa-check-circle"
              />
              <q-icon v-if="iconfailDialog" color="red" size="46px" name="far fa-times-circle" />
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
      checkble: false,
      file: null,
      uploadImg: null,
      uploadAudio: null,
      dataFile1: null,
      dataFile2: null,
      dataFile3: null,
      dataFile4: null,
      // ข้อมูล
      data: {
        isImage: false,
        isSound: false,
        practiceId: "m",
        levelId: "aa",
        unitId: "bb",
        order: "",
        question: "",
        description: "",
        correctAnswer: 1,
        choices: [],
        isAnswerSound: false,
        status: "notSync"
      },
      choices: [{ choice: "" }, { choice: "" }, { choice: "" }, { choice: "" }],
      //   เช็คช่องคำถามข้อมูล & ตัวเลือก
      isQuestion: true,
      isChoice1: true,
      isChoice2: true,
      isChoice3: true,
      isChoice4: true,
      finishDialog: false,
      text: "",
      isAudio1: "",
      isAudio2: "",
      isAudio3: "",
      isAudio4: "",
      isKeyImage: "",
      isKeySound: "",
      isTextQuestion: "",
      isText1: "",
      isText2: "",
      isTextChoice1: "",
      isTextChoice2: "",
      isTextChoice3: "",
      isTextChoice4: "",
      iconTrueDialog: true,
      iconfailDialog: false
    };
  },
  methods: {
    // โหลด ข้อมูล หน้าแก้ไข
    loadDataEdit() {
      db.collection("practice_draft")
        .doc(this.$route.params.key)
        .get()
        .then(doc => {
          if (doc.data().isImage) {
            this.isKeyImage = doc.id + ".jpg";
          }
          if (doc.data().isSound) {
            this.isKeySound = doc.id + ".mp3";
          }
          let getChoiceSound = "";
          if (doc.data().isAnswerSound) {
            if (doc.data().choices[0]) {
              this.isAudio1 = doc.id + "-1.mp3";
            }
            if (doc.data().choices[1]) {
              this.isAudio2 = doc.id + "-2.mp3";
            }
            if (doc.data().choices[2]) {
              this.isAudio3 = doc.id + "-3.mp3";
            }
            if (doc.data().choices[3]) {
              this.isAudio4 = doc.id + "-4.mp3";
            }
          }
          let choices1 = "";
          let choices2 = "";
          let choices3 = "";
          let choices4 = "";
          if (doc.data().choices[0]) {
            choices1 = doc.data().choices[0].choice;
          }
          if (doc.data().choices[1]) {
            choices2 = doc.data().choices[1].choice;
          }
          if (doc.data().choices[2]) {
            choices3 = doc.data().choices[2].choice;
          }
          if (doc.data().choices[3]) {
            choices4 = doc.data().choices[0].choice;
          }
          this.choices = [
            { choice: choices1 },
            { choice: choices2 },
            { choice: choices3 },
            { choice: choices4 }
          ];
          this.data = doc.data();
        });
    },
    // บันทึก
    saveBtn() {
      // เช็คช่องกรอกข้อมูล ก่อนบันทึก ว่ากรอกข้อมูลรึยัง ข้อมูลที่จำเป็นต้องกรอก
      let hasChoice = this.choices.filter(x => x.choice != "");
      this.$refs.orderid.validate();
      if (this.$refs.orderid.hasError) {
        return;
      }
      if (this.data.question == "") {
        this.isTextQuestion = "กรุณาใส่คำถาม";
        this.isQuestion = false;
        return;
      }
      if (hasChoice.length < 2) {
        // การเช็คตัวเลือก 1&2 ถ้าข้อความน้อยก่ว่า 0 ให้ มีกรอบสีแดง
        let index = this.choices.findIndex(x => x.choice == "");
        if (index == 0) {
          this.isChoice1 = false;
          this.isText1 = "กรุณาใส่ตัวเลือก#1 และตัวเลือก#2";
        } else if (index == 1) {
          this.isChoice2 = false;
          this.isText2 = "กรุณาใส่ตัวเลือก#1 และตัวเลือก#2";
        }
        return;
      }
      this.data.choices = hasChoice;
      if (this.uploadImg) {
        this.data.isImage = true;
      }
      if (this.uploadAudio) {
        this.data.isSound = true;
      }
      if (this.data.isAnswerSound) {
        if (this.choices[0].choice.length > 0 && !this.dataFile1) {
          this.isChoice1 = false;
          this.isTextChoice1 = "กรุณาอัปโหลดเสียงตัวเลือก#1";
          return;
        } else if (this.choices[1].choice.length > 0 && !this.dataFile2) {
          this.isChoice2 = false;
          this.isTextChoice2 = "กรุณาอัปโหลดเสียงตัวเลือก#2";
          return;
        } else if (this.choices[2].choice.length > 0 && !this.dataFile3) {
          this.isChoice3 = false;
          this.isTextChoice3 = "กรุณาอัปโหลดเสียงตัวเลือก#3";
          return;
        } else if (this.choices[3].choice.length > 0 && !this.dataFile4) {
          this.isChoice4 = false;
          this.isTextChoice4 = "กรุณาอัปโหลดเสียงตัวเลือก#4";
          return;
        }
      }
      //  หน้า เพิ่มข้อมูล
      if (this.$route.name == "multipleInputAdd") {
        this.checkble = true;
        db.collection("practice_draft")
          .where("order", "==", this.data.order)
          .get()
          .then(doc => {
            // เช็ครหัสลำดับ ถ้า มากกว่า 0 คือมีแล้ว แต่ถ้าไม่ บันทึกเพิ่มได้เลย
            if (doc.size > 0) {
              this.finishDialog = true;
              this.iconTrueDialog = false;
              this.iconfailDialog = true;
              this.text = "รหัสลำดับนี้มีการใช้งานแล้ว";
              setTimeout(() => {
                this.finishDialog = false;
              }, 1000);
              return;
            } else {
              db.collection("practice_draft")
                .add(this.data)
                .then(async doc => {
                  this.finishDialog = true;
                  this.iconfailDialog = false;
                  this.iconTrueDialog = true;
                  this.text = "บันทึกข้อมูลเรียบร้อย";
                  // เช็คขูอมูลภาพและเสียง
                  if (this.uploadImg) {
                    await st
                      .child("/practice/image/" + doc.id + ".jpg")
                      .put(this.uploadImg);
                  }
                  if (this.uploadAudio) {
                    await st
                      .child("/practice/audio/" + doc.id + ".mp3")
                      .put(this.uploadAudio);
                  }
                  // แบบมีเสียง เพิ่ม
                  if (this.data.isAnswerSound == true) {
                    if (this.dataFile1) {
                      await st
                        .child("/practice/audio/" + doc.id + "-1.mp3")
                        .put(this.dataFile1);
                    }
                    if (this.dataFile2) {
                      await st
                        .child("/practice/audio/" + doc.id + "-2.mp3")
                        .put(this.dataFile2);
                    }
                    if (this.dataFile3) {
                      await st
                        .child("/practice/audio/" + doc.id + "-3.mp3")
                        .put(this.dataFile3);
                    }
                    if (this.dataFile4) {
                      await st
                        .child("/practice/audio/" + doc.id + "-4.mp3")
                        .put(this.dataFile4);
                    }
                  }
                  setTimeout(() => {
                    this.checkble = false;
                    this.finishDialog = false;
                    this.$router.push("/multipleMain");
                  }, 1000);
                });
            }
          });
      }

      // หน้า แก้ไข
      else {
        this.checkble = true;
        db.collection("practice_draft")
          .doc(this.$route.params.key)
          .set(this.data)
          .then(async doc => {
            this.finishDialog = true;
            this.text = "บันทึกข้อมูลเรียบร้อย";
            // เช็คขูอมูลภาพและเสียง
            if (this.uploadImg) {
              await st
                .child("/practice/image/" + this.$route.params.key + ".jpg")
                .put(this.uploadImg);
            }
            if (this.uploadAudio) {
              await st
                .child("/practice/audio/" + this.$route.params.key + ".mp3")
                .put(this.uploadAudio);
            }
            // แบบมีเสียง Edit
            if (this.data.isAnswerSound == true) {
              if (this.dataFile1) {
                await st
                  .child("/practice/audio/" + this.$route.params.key + "1.mp3")
                  .put(this.dataFile1);
              }
              if (this.dataFile2) {
                await st
                  .child("/practice/audio/" + this.$route.params.key + "2.mp3")
                  .put(this.dataFile2);
              }
              if (this.dataFile3) {
                await st
                  .child("/practice/audio/" + this.$route.params.key + "3.mp3")
                  .put(this.dataFile3);
              }
              if (this.dataFile4) {
                await st
                  .child("/practice/audio/" + this.$route.params.key + "4.mp3")
                  .put(this.dataFile4);
              }
              db.collection("practice_draft")
                .doc(this.$route.params.key)
                .update({ choices: this.data.choices });
            }
            setTimeout(() => {
              this.checkble = false;
              this.finishDialog = false;
              this.$router.push("/multipleMain");
            }, 1000);
          });
      }
    },
    checkEditor(type) {
      if (type == "question") {
        if (this.data.question.length) {
          this.isQuestion = true;
          this.isTextQuestion = "";
        } else {
          this.isQuestion = false;
        }
      } else if (type == "choice1") {
        if (this.choices[0].choice.length) {
          this.isText1 = "";
          this.isChoice1 = true;
        } else {
          this.isChoice1 = false;
        }
      } else if (type == "choice2") {
        if (this.choices[1].choice.length) {
          this.isChoice2 = true;
          this.isText2 = "";
        } else {
          this.isChoice2 = false;
        }
      }
    },
    // การบันทึก ข้อมูลเสียงเข้าตัวแปล
    fileSound(val, type) {
      if (type == 1) {
        this.isTextChoice1 = "";
        this.isChoice1 = true;
        this.dataFile1 = val[0];
      }
      if (type == 2) {
        this.isTextChoice2 = "";
        this.isChoice2 = true;
        this.dataFile2 = val[0];
      }
      if (type == 3) {
        this.isTextChoice3 = "";
        this.isChoice3 = true;
        this.dataFile3 = val[0];
      }
      if (type == 4) {
        this.isTextChoice4 = "";
        this.isChoice4 = true;
        this.dataFile4 = val[0];
      }
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