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
                @input="loadPracticeData()"
                color="blue-grey-10"
                v-model="mode"
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <!-- เซิร์ฟเวอร์ -->
            <div class="col">
              <q-radio
                @input="loadPracticeData()"
                color="blue-grey-10"
                v-model="mode"
                val="server"
                label="เซิร์ฟเวอร์"
              />
            </div>
          </div>
        </div>
        <div class="desktop-only">
          <div class="text-right">
            <q-btn
              v-if="mode == 'draft'"
              round
              color="blue-grey-10"
              icon="fas fa-print"
              to="/multiplePrint"
            />
          </div>
        </div>
      </div>
      <div class="text-h6">
        <div class="q-pt-md">{{ practiceData.levelName }}</div>
        <div>{{ practiceData.unitOrder + ". " + practiceData.unitName }}</div>
      </div>
      <!-- box คำสั่ง -->
      <div class="box text-left q-my-md">
        <div class="bg-blue-grey-10 text-white boxQuestion row q-px-sm">
          <div class="col self-center">คำสั่ง</div>
          <div class="col self-center" align="right">
            <q-btn
              v-if="mode == 'draft'"
              @click="editQuestion()"
              size="sm"
              round
              flat
              icon="far fa-edit"
            />
          </div>
        </div>
        <div class="row q-px-md q-py-sm" style="height:120px;">
          <div class="col-12 self-center q-py-sm">
            <span class="text-subtitle1">{{ instrunctionEng }}</span>
          </div>
          <q-separator class="q-my-xs" />
          <div class="col-12 self-center q-py-sm">
            <span class="text-subtitle1">{{ instrunctionTh }}</span>
          </div>
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

      <div
        v-for="(item, index) in practiceDataList"
        :key="index"
        class="box text-left q-my-md relative-position"
      >
        <div
          class="absolute-top-left q-pa-sm"
          v-if="item.status == 'waitForDelete'"
          style="z-index:30"
        >
          <a
            class="text-white cursor-pointer"
            @click="cancelDelete(item.key)"
            style="text-decoration:underline;"
          >ยกเลิกการลบ</a>
        </div>
        <div v-if="item.status == 'waitForDelete'" class="absolute-center backDrop"></div>

        <div class="boxQuestion bg-blue-grey-10 text-white q-py-xs q-px-sm row">
          <div class="col self-center">
            <span v-if="item.status != 'waitForDelete'">รหัสลำดับ {{ item.order }}</span>
          </div>
          <div class="col self-center" align="right">
            <q-btn
              v-if="item.status != 'waitForDelete' && mode == 'draft'"
              @click="deleteData(item.key, item.order, index)"
              size="sm"
              class="q-mr-sm"
              round
              flat
              icon="far fa-trash-alt"
            />
            <q-btn
              v-if="item.status != 'waitForDelete' && mode == 'draft'"
              @click="editData(item.key)"
              size="sm"
              flat
              round
              icon="far fa-edit"
            />
          </div>
        </div>
        <div class="text-center q-pt-md" v-if="item.imageURL">
          <img style="height:300px;width:400px" :src="item.imageURL" alt />
        </div>
        <div class="q-pa-md">
          <q-btn
            v-if="item.audioURL"
            size="sm"
            @click="playAudio(item.audioURL)"
            round
            flat
            icon="fas fa-volume-up"
          />
          <span class="q-mx-xs q-pr-sm q-pl-xs" v-html="item.question"></span>
        </div>
        <div class="q-px-md q-mt-md">
          <div v-for="(items, index2) in item.choices" :key="index2">
            <div v-if="item.isAnswerSound && items.choice" class="q-mt-xs">
              <q-btn
                round
                flat
                size="sm"
                :icon="
                  items.isSound ? 'fas fa-volume-up' : 'fas fa-volume-mute'
                "
                :class="!items.isSound ? 'no-pointer-events' : ''"
                @click="playAudio(items.soundURL)"
              ></q-btn>
              <span
                class="q-mx-xs q-pr-sm q-pl-xs"
                :class="
                  item.correctAnswer == index2 + 1
                    ? 'bg-secondary text-white '
                    : ''
                "
              >{{ index2 + 1 + ") " + items.choice }}</span>
            </div>
            <div v-else>
              <span
                class="q-mx-xs q-pr-sm q-pl-xs"
                :class="
                  item.correctAnswer == index2 + 1
                    ? 'bg-secondary text-white '
                    : ''
                "
              >{{ items.choice }}</span>
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <span v-html="item.description"></span>
        </div>
      </div>

      <!-- dialog แก่ไข คำสั่ง -->
      <q-dialog v-model="isQuestionDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">แก้ไขคำสั่ง</div>
          <div class="q-px-md">
            <div class="q-py-xs">
              <q-input
                autogrow
                dense
                :rules="[val => !!val || 'กรุณาใสคำสั่งภาษาอังกฤษ']"
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
                :rules="[val => !!val || 'กรุณาใสคำสั่งภาษาไทย']"
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
      <q-dialog v-model="isDeleteDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div>ต้องการลบข้อมูล</div>
            <div>“รหัสลำดับ {{ orderId }}” หรือไม่</div>
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
                <q-btn
                  @click="deleteBtn(), (isDeleteDialog = false)"
                  dense
                  style="width:150px"
                  color="black"
                  label="บันทึก"
                />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <!-- finish -->

      <q-dialog v-model="isSaveComplete">
        <q-card style="max-width:600px;width:100%;height:200px">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div class="q-py-md q-mt-md">
              <q-icon color="secondary" size="46px" name="far fa-check-circle" />
            </div>
            <div>บันทึกข้อมูลเรียบร้อย</div>
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
      mode: "draft",

      practiceData: {
        levelName: "",
        unitName: "",
        unitOrder: ""
      },

      practiceDataList: [],
      orderId: "",
      instrunctionTh: "",
      instrunctionEng: "",

      indexKey: "",
      deleteKey: "",
      questionAdd: false,
      questionKey: "",
      pathFile:
        "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/",
      playSoundURL: "",

      isSaveComplete: false,
      isQuestionDialog: false,
      isDeleteDialog: false,

      syncData: ""
    };
  },
  methods: {
    loadLevel() {
      this.loadingShow();

      let levelKey = this.$route.params.levelId;

      db.collection("level")
        .doc(levelKey)
        .get()
        .then(result => {
          if (result.exists) {
            this.practiceData.levelName = result.data().name;

            // โหลดข้อมูล Unit
            this.loadUnit();
          }
        });
    },
    loadUnit() {
      let unitKey = this.$route.params.unitId;

      db.collection("unit")
        .doc(unitKey)
        .get()
        .then(result => {
          if (result.exists) {
            this.practiceData.unitName = result.data().name;
            this.practiceData.unitOrder = result.data().order;

            // โหลดข้อมูล คำสั่ง
            this.loadInstrunction();
          }
        });
    },
    loadInstrunction() {
      let practiceId = this.$route.params.practiceId;
console.log(practiceId);
      db.collection("practice_list")
        .doc(practiceId)
        .get()
        .then(result => {
          if (result.exists) {
            this.instrunctionEng = result.data().instrunctionEng;
            this.instrunctionTh = result.data().instrunctionTh;
          } else {
            this.instrunctionEng = "ยังไม่ระบุ";
            this.instrunctionTh = "ยังไม่ระบุ";
          }

          this.loadPracticeData();
        });
    },
    // โหลดข้อมูลเข้ามาเก็บไว้ทั้งหมด
    loadPracticeData() {
      this.loadingShow();

      let practiceId = this.$route.params.practiceId;

      let dbData;
      if (typeof this.syncData == "function") {
        this.syncData();
      }

      if (this.mode == "draft") {
        dbData = db.collection("practice_draft");
      } else {
        dbData = db.collection("practice_server");
      }

      this.syncData = dbData
        .where("practiceId", "==", practiceId)
        .onSnapshot(doc => {
          let temp = [];

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
              getChoiceSound.map(async (x, index) => {
                if (x.isSound) {
                  getChoiceSound[index].soundURL =
                    this.pathFile +
                    "audio/" +
                    element.id +
                    "-" +
                    (index + 1) +
                    ".mp3";
                }
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

            temp.push(final);
          });

          temp.sort((a, b) => a.order - b.order);

          this.practiceDataList = temp;

          this.loadingHide();
        });
    },
    // กดไปหน้าเพิ่มข้อมูล
    addQuestion() {
      this.$router.push(
        "/multipleInputAdd/" +
          this.$route.params.levelId +
          "/" +
          this.$route.params.unitId +
          "/" +
          this.$route.params.practiceId
      );
    },
    // กดไปหน้าแก้ไขข้อมูล
    editQuestion() {
      this.isQuestionDialog = true;
    },
    // บันทึกข้อมูลคำสั่ง
    saveBtn() {
      this.$refs.instrunctionTh.validate();
      this.$refs.instrunctionEng.validate();

      if (
        this.$refs.instrunctionTh.hasError ||
        this.$refs.instrunctionEng.hasError
      ) {
        return;
      }

      this.isQuestionDialog = false;

      let practiceId = this.$route.params.practiceId;

      db.collection("practice_list")
        .doc(practiceId)
        .update({
          instrunctionTh: this.instrunctionTh,
          instrunctionEng: this.instrunctionEng
        });

      this.isSaveComplete = true;

      setTimeout(() => {
        this.isSaveComplete = false;
      }, 1000);
    },
    // ลบข้อมูล
    deleteBtn() {
      db.collection("practice_draft")
        .doc(this.deleteKey)
        .update({
          status: "waitForDelete"
        });
    },
    // กดปุ่ม ICON ลบ เพื่องเก็บ KEY
    deleteData(key, id, index) {
      this.isDeleteDialog = true;
      this.orderId = id;
      this.deleteKey = key;
      this.indexKey = index;
    },
    cancelDelete(key) {
      this.$q
        .dialog({
          title: "ยกเลิกการลบข้อมูล",
          ok: "ตกลง",
          cancel: "ยกเลิก"
        })
        .onOk(() => {
          db.collection("practice_draft")
            .doc(key)
            .update({
              status: "notSync"
            });
        });
    },
    // กดปุ่ม ICON แก้ไข เพื่องเก็บ KEY ส่งไปหน้า แก้ไขข้อมูล
    editData(key) {
      this.$router.push("/multipleInputEdit" + "/" + key);
    },
    // เล่นเสียง
    playAudio(sound) {
      if (this.playSoundURL != "") {
        this.playSoundURL.pause();
      }

      this.playSoundURL = new Audio(sound);

      this.playSoundURL.play();
    }
  },
  mounted() {
    this.loadLevel();
  },
  beforeDestroy() {
    if (typeof this.syncData == "function") {
      this.syncData();
    }
  }
};
</script>
<style scoped>
.box {
  border: 1px solid #263238;
  border-radius: 10px;
}
.boxQuestion {
  height: 40px;
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
