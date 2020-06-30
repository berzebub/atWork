<template>
  <q-page>
    <div class="container" align="center">
      <!-- box เซิร์ฟเวอร์  -->
      <div class="row justify-between">
        <div class="col text-left">
          <div class="row boxServer">
            <!-- แบบร่าง -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadDraft()"
                v-model="status"
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <!-- เซิร์ฟเวอร์ -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadServer()"
                v-model="status"
                val="server"
                label="เซิร์ฟเวอร์"
              />
            </div>
          </div>
        </div>
        <div class="desktop-only">
          <div class="text-right">
            <q-btn round color="blue-grey-10" icon="fas fa-print" to="/multiplePrint" />
          </div>
        </div>
      </div>
      <div class="text-h6">
        <div class="q-pt-md">อาหารและเครื่องดื่ม</div>
        <div>1. จองโต๊ะ</div>
      </div>
      <!-- box คำสั่ง -->
      <div class="box text-left q-my-md">
        <div class="bg-blue-grey-10 text-white q-py-sm q-px-md boxQuestion row justify-between">
          <div class="row text-subtitle1 items-center">คำสั่ง</div>
          <div>
            <q-btn @click="editQuestion()" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="q-pa-md">
          <span>{{instrunction.eng}}</span>
          <q-separator class="q-my-md" />
          <span>{{instrunction.th}}</span>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <!-- ปุ่ม เพิ่มคำถาม -->
      <div>
        <q-btn
          @click="addQuestion()"
          style="width:190px"
          dense
          color="blue-grey-10"
          label="เพิ่มคำถาม"
        />
      </div>
      <!-- โชว์ DATA -->

      <div v-for="(item,index) in data" :key="index" class="box text-left q-my-md">
        <div class="boxQuestion bg-blue-grey-10 text-white q-py-xs q-px-md row justify-between">
          <div class="col row items-center">รหัสลำดับ {{item.order}}</div>
          <div class="q-px-xs">
            <q-btn
              @click="deleteData(item.key, item.order,index)"
              size="sm"
              round
              icon="far fa-trash-alt"
            />
          </div>
          <div>
            <q-btn @click="editData(item.key)" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="text-center q-pt-md" v-if="item.imageURL">
          <img style="height:300px;width:400px " :src="item.imageURL" alt />
        </div>
        <div class="q-pa-md">
          <span v-if="item.audioURL">
            <q-btn size="sm" @click="playAudio(item.audioURL)" round flat icon="fas fa-volume-up" />
          </span>
          <span v-html=" item.question "></span>
        </div>
        <div class="q-px-md">
          <div v-if="item.choices[0]">
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 1}"
              v-if="item.choices[0].choice"
            >
              <span v-if="item.choices[0].soundURL && item.choices[0].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[0].soundURL)"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              1)
              <span v-html="item.choices[0].choice"></span>
            </span>
          </div>
          <div v-if="item.choices[1]">
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 2}"
              v-if="item.choices[1].choice"
            >
              <span v-if="item.choices[1].soundURL && item.choices[1].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[1].soundURL)"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              2)
              <span v-html="item.choices[1].choice"></span>
            </span>
          </div>
          <div v-if="item.choices[2]">
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 3}"
              v-if="item.choices[2].choice"
            >
              <span v-if="item.choices[2].soundURL && item.choices[2].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[2].soundURL)"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              3)
              <span v-html="item.choices[2].choice"></span>
            </span>
          </div>
          <div v-if="item.choices[3]">
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 4}"
              v-if="item.choices[3].choice"
            >
              <span v-if="item.choices[3].soundURL && item.choices[3].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[3].soundURL)"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              4)
              <span v-html="item.choices[3].choice"></span>
            </span>
          </div>
        </div>
        <!-- <div class="q-px-md">
          <div>
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 1}"
              v-if="item.choices[0].choice"
            >
              <span v-if="item.choices[0] && item.choices[0].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[0])"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              1)
              <span v-html="item.choices[0].choice"></span>
            </span>
          </div>
          <div>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 2}"
              v-if="item.choices[1].choice"
            >
              <span v-if="item.choices[1] && item.choices[1].choice.length > 0">
                <q-btn
                  size="sm"
                  @click="playAudio(item.choices[1])"
                  round
                  flat
                  icon="fas fa-volume-up"
                />
              </span>
              2)
              <span v-html=" item.choices[1].choice"></span>
            </span>
          </div>
          <div>
            <span v-if="item.choices[2] && item.choices[2].choice.length > 0">
              <q-btn
                size="sm"
                @click="playAudio(item.choices[2])"
                round
                flat
                icon="fas fa-volume-up"
              />
            </span>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 3}"
              v-if="item.choices[2].choice"
            >
              3)
              <span v-html="item.choices[2].choice"></span>
            </span>
          </div>
          <div>
            <span v-if="item.choices[3] && item.choices[3].choice.length > 0">
              <q-btn
                size="sm"
                @click="playAudio(item.choices[3])"
                round
                flat
                icon="fas fa-volume-up"
              />
            </span>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 4}"
              v-if="item.choices[3].choice"
            >
              4)
              <span v-html="item.choices[3].choice"></span>
            </span>
          </div>
        </div>-->
        <div class="q-pa-md">
          <span v-html="item.description "></span>
        </div>
      </div>
      <!-- dialog แก่ไข คำสั่ง -->
      <q-dialog v-model="questionDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">แก้ไขคำสั่ง</div>
          <div class="q-px-md">
            <div class="q-py-xs">
              <q-input
                autogrow
                dense
                :rules="[ val => !!val || 'กรุณาใสคำสั่งภาษาอังกฤษ']"
                ref="instrunctionEng"
                outlined
                v-model="instrunctionEng"
                label="คำสั่งภาษาอังกฤษ"
              />
            </div>
            <div class="q-py-xs">
              <q-input
                autogrow
                dense
                :rules="[ val => !!val || 'กรุณาใสคำสั่งภาษาไทย']"
                ref="instrunctionTh"
                outlined
                v-model="instrunctionTh"
                label="คำสั่งภาษาไทย"
              />
            </div>
          </div>
          <div>
            <div class="row reverse-wrap justify-center q-px-md">
              <div class="q-px-md q-pb-md">
                <q-btn
                  v-close-popup
                  dense
                  style="width:150px"
                  color="white"
                  outline
                  text-color="black"
                  label="ยกเลิก"
                />
              </div>
              <div class="q-px-md q-pb-md">
                <q-btn @click="saveBtn()" dense style="width:150px" color="black" label="บันทึก" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <!-- delete -->
      <q-dialog v-model="deleteDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div>ต้องการลบข้อมูล</div>
            <div>“รหัสลำดับ {{orderId}}” หรือไม่</div>
          </div>
          <div>
            <div class="row reverse-wrap justify-center q-px-md">
              <div class="q-px-md q-pb-md">
                <q-btn
                  v-close-popup
                  dense
                  style="width:150px"
                  color="white"
                  outline
                  text-color="black"
                  label="ยกเลิก"
                />
              </div>
              <div class="q-px-md q-pb-md">
                <q-btn @click="deleteBtn()" dense style="width:150px" color="black" label="บันทึก" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
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
      instrunction: { eng: "ยังไม่ระบุ", th: "ยังไม่ระบุ" },
      orderId: "",
      instrunctionTh: "",
      instrunctionEng: "",
      status: "draft",
      questionDialog: false,
      deleteDialog: false,
      finishDialog: false,
      text: "",
      imageURL: "",
      audioURL: "",
      data: [],
      dataDraft: [],
      indexKey: "",
      deleteKey: "",
      pathFile:
        "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/"
    };
  },
  methods: {
    // โหลดข้อมูลเข้ามาเก็บไว้ทั้งหมด
    loadDataAll() {
      this.dataDraft = [];
      db.collection("practice_draft")
        .where("practiceId", "==", "m")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let getSound = "";
            let getImage = "";
            let getChoiceSound = element.data().choices;
            if (element.data().isImage) {
              getImage = this.pathFile + "image/" + element.id + ".jpg";
            }
            if (element.data().isSound) {
              getSound = this.pathFile + "audio/" + element.id + ".mp3";
            }
            if (element.data().isAnswerSound) {
              getChoiceSound = element.data().choices.map((x, index) => {
                let newChoice = {};
                return (newChoice = {
                  soundURL:
                    this.pathFile +
                    "audio/" +
                    element.id +
                    "-" +
                    (index + 1) +
                    ".mp3",
                  choice: x.choice
                });
              });
            }
            let dataKey = {
              key: element.id,
              imageURL: getImage,
              audioURL: getSound,
              choices: getChoiceSound
            };
            let final = {
              ...element.data(),
              ...dataKey
            };
            this.dataDraft.push(final);
          });
        });
      this.loadDraft();
    },

    // โหลด แบบร่าง
    loadDraft() {
      this.data = [];
      this.data = this.dataDraft;
      this.finishDialog = false;
    },
    // โหลด เซิร์ฟเวอร์
    loadServer() {
      this.data = [];
    },
    // กดไปหน้าเพิ่มข้อมูล
    addQuestion() {
      this.$router.push("/multipleInputAdd");
    },
    // กดไปหน้าแก้ไขข้อมูล
    editQuestion() {
      this.questionDialog = true;
    },
    // บันทึกข้อมูล
    saveBtn() {
      this.$refs.instrunctionTh.validate();
      this.$refs.instrunctionEng.validate();
      if (
        this.$refs.instrunctionTh.hasError ||
        this.$refs.instrunctionEng.hasError
      ) {
        return;
      }
      this.instrunction.eng = this.instrunctionEng;
      this.instrunction.th = this.instrunctionTh;
      this.instrunctionEng = "";
      this.instrunctionTh = "";
      this.text = "บันทึกข้อมูลเรียบร้อย";
      this.questionDialog = false;
      this.finishDialog = true;
      setTimeout(() => {
        this.finishDialog = false;
      }, 1000);
    },
    // ลบข้อมูล
    deleteBtn() {
      db.collection("practice_draft")
        .doc(this.deleteKey)
        .delete()
        .then(() => {
          if (this.dataDraft[this.indexKey].isImage) {
            st.child("/practice/image/" + this.deleteKey + ".jpg").delete();
          }
          if (this.dataDraft[this.indexKey].isSound) {
            st.child("/practice/audio/" + this.deleteKey + ".mp3").delete();
          }
          if (this.dataDraft[this.indexKey].isAnswerSound) {
            this.dataDraft[this.indexKey].choices.map((x, index) => {
              st.child(
                "/practice/audio/" + this.deleteKey + "-" + (index + 1) + ".mp3"
              ).delete();
            });
          }
          this.deleteDialog = true;
          setTimeout(() => {
            this.deleteDialog = false;
            this.loadDataAll();
          }, 1000);
        });
    },
    // กดปุ่ม ICON ลบ เพื่องเก็บ KEY
    deleteData(key, id, index) {
      this.deleteDialog = true;
      this.orderId = id;
      this.deleteKey = key;
      this.indexKey = index;
    },
    // กดปุ่ม ICON แก้ไข เพื่องเก็บ KEY ส่งไปหน้า แก้ไขข้อมูล
    editData(key) {
      this.$router.push("/multipleInputEdit" + "/" + key);
    },
    // เล่นเสียง
    playAudio(sound) {
      let audio = new Audio(sound);
      audio.play();
    }
  },
  mounted() {
    this.loadDataAll();
  }
};
</script>
<style  scoped>
.box {
  border: 1px solid #263238;
  border-radius: 10px;
}
.boxQuestion {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.boxServer {
  max-width: 330px;
  width: 100%;
  border: 1px solid #263238;
}
.answer {
  color: white;
}
</style>