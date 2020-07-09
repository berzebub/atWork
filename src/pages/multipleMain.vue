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
        <div>
          <div class="mobile-only q-ml-md">
            <q-btn
              :disable="mode == 'server'"
              round
              push
              color="blue-grey-10"
              icon="fas fa-sync"
              @click="sync($route.params.practiceId)"
            />
          </div>
          <div class="text-right desktop-only">
            <q-btn
              v-if="mode == 'draft'"
              round
              push
              color="blue-grey-10"
              class="q-mx-md"
              icon="fas fa-sync"
              @click="sync($route.params.practiceId)"
            />
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
            <span class="text-subtitle1" v-if="instrunctionEng">{{ instrunctionEng }}</span>
            <span v-else>ยังไม่ระบุ</span>
          </div>
          <q-separator class="q-my-xs" />
          <div class="col-12 self-center q-py-sm">
            <span class="text-subtitle1" v-if="instrunctionTh">{{ instrunctionTh }}</span>
            <span v-else>ยังไม่ระบุ</span>
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
          :disable="mode == 'server'"
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
          class="absolute-top-left q-pa-sm mobile-only"
          v-if="item.status == 'waitForDelete'"
          style="z-index:30"
        >
          <a
            class="text-white cursor-pointer"
            @click="cancelDelete(item.id)"
            style="text-decoration:underline;"
          >ยกเลิกการลบ</a>
        </div>
        <q-btn
          dense
          style="z-index:30;width:190px;"
          class="absolute-center text-blue-grey-10 desktop-only"
          v-if="item.status  == 'waitForDelete'"
          color="white"
          label="ยกเลิกการลบ"
          @click="cancelDelete(item.id)"
        ></q-btn>
        <div v-if="item.status == 'waitForDelete'" class="absolute-center backDrop"></div>

        <div class="boxQuestion bg-blue-grey-10 text-white q-py-xs q-px-sm row">
          <div class="col self-center">
            <span class="desktop-only">รหัสลำดับ {{ item.order }}</span>
            <span
              class="mobile-only"
              v-if="item.status != 'waitForDelete'"
            >รหัสลำดับ {{ item.order }}</span>
          </div>
          <div class="col self-center desktop-only" align="right">
            <q-btn
              v-if="mode == 'draft'"
              @click="deleteData(item.id, item.order, index)"
              size="sm"
              class="q-mr-sm"
              round
              flat
              icon="far fa-trash-alt"
            />
            <q-btn
              v-if="mode == 'draft'"
              @click="editData(item)"
              size="sm"
              flat
              round
              icon="far fa-edit"
            />
          </div>
          <q-btn class="mobile-only" size="13px" icon="fas fa-ellipsis-v" round dense flat>
            <q-menu anchor="top right" self="top right" :offset="[7,-37]">
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="editData(item)">แก้ไขข้อมูล</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="deleteData(item.id,item.order,index)">ลบ</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="text-center q-pa-sm q-mt-sm" v-if="item.imageURL">
          <img style="max-width:400px;width:100%;" :src="item.imageURL" alt />
        </div>
        <div class="q-pa-md">
          <div class>
            <span class>{{index + 1 + "."}}</span>
            <span
              v-if="item.audioURL"
              @click="playAudio(item.audioURL)"
              class="fas fa-volume-up q-mx-xs cursor-pointer"
            ></span>
            <span class="q-mx-xs q-pr-sm" v-html="item.question"></span>
          </div>
        </div>
        <div class="q-px-md q-pb-md">
          <div v-for="(items, index2) in item.choices" :key="index2">
            <div v-if="item.isAnswerSound && items.choice">
              <span
                class="q-pr-sm q-pl-xs"
                :class="
                  item.correctAnswer == index2 + 1
                    ? 'bg-secondary text-white '
                    : ''
                "
              >
                <span
                  class
                  :class="
                  items.isSound ? 'fas fa-volume-up cursor-pointer' : 'fas fa-volume-mute no-pointer-events text-grey-6'
                "
                  @click="playAudio(items.soundURL)"
                ></span>
                {{ index2 + 1 + ") " + items.choice }}
              </span>
            </div>
            <div v-if="!item.isAnswerSound">
              <span
                v-if="items.choice"
                class="q-pr-sm"
                :class="
                  item.correctAnswer == index2 + 1
                    ? 'bg-secondary text-white '
                    : ''
                "
              >{{ index2 + 1 + ") " + items.choice }}</span>
            </div>
          </div>
        </div>
        <div class="q-px-md q-pb-md" v-if="item.description">
          <q-separator class="q-mb-sm"></q-separator>
          <span v-html="item.description"></span>
        </div>
      </div>

      <!-- dialog แก่ไข คำสั่ง -->
      <q-dialog v-model="isQuestionDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">แก้ไขคำสั่ง</div>
          <div class="q-px-md">
            <div>
              <span>คำสั่งภาษาอังกฤษ</span>
              <q-input
                dense
                :rules="[val => !!val]"
                ref="instrunctionEng"
                outlined
                v-model="instrunctionEng"
              />
            </div>
            <div>
              <span>คำสั่งภาษาไทย</span>
              <q-input
                dense
                :rules="[val => !!val]"
                ref="instrunctionTh"
                outlined
                v-model="instrunctionTh"
              />
            </div>
          </div>
          <div class="row q-px-md q-pb-md">
            <div class="col" align="center">
              <q-btn
                v-close-popup
                dense
                style="width:120px"
                color="white"
                outline
                text-color="black"
                label="ยกเลิก"
              />
            </div>
            <div class="col" align="center">
              <q-btn @click="saveBtn()" dense style="width:120px" color="black" label="บันทึก" />
            </div>
          </div>
        </q-card>
      </q-dialog>

      <!-- delete -->
      <q-dialog v-model="isDeleteDialog" persistent>
        <q-card style="max-width:330px;width:100%">
          <div class="text-subtitle1 text-center q-pt-xl q-pb-lg">
            <div>ต้องการลบข้อมูล</div>
            <div>“รหัสลำดับ {{ orderId }}”</div>
          </div>
          <div>
            <div class="row q-pa-md">
              <div class="col" align="right">
                <q-btn
                  v-close-popup
                  dense
                  style="width:120px"
                  color="white"
                  class="q-mx-sm"
                  outline
                  text-color="black"
                  label="ยกเลิก"
                />
              </div>
              <div class="col" align="left">
                <q-btn
                  @click="deleteBtn()"
                  dense
                  style="width:120px"
                  class="q-mx-sm"
                  color="black"
                  label="ตกลง"
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

      <dialog-setting
        :type="4"
        v-if="isDeleteDialogSuccess"
        @autoClose="isDeleteDialogSuccess = false"
      ></dialog-setting>
    </div>
  </q-page>
</template>

<script>
import { db, st } from "../router";
import dialogSetting from "../components/dialogSetting";
export default {
  components: {
    dialogSetting
  },
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

      isDeleteDialogSuccess: false,

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
      db.collection("practice_list")
        .doc(practiceId)
        .get()
        .then(result => {
          if (result.exists) {
            if (result.data().instrunctionEng) {
              this.instrunctionEng = result.data().instrunctionEng;
            } else {
              this.instrunctionEng = "";
            }

            if (result.data().instrunctionTh) {
              this.instrunctionTh = result.data().instrunctionTh;
            } else {
              this.instrunctionTh = "";
            }
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
              id: element.id,
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
        "/multipleAdd/" +
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
      this.isDeleteDialog = false;

      db.collection("practice_draft")
        .doc(this.deleteKey)
        .update({
          status: "waitForDelete"
        })
        .then(() => {
          this.isDeleteDialogSuccess = true;
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
      db.collection("practice_draft")
        .doc(key)
        .update({
          status: "notSync"
        });
    },
    // กดปุ่ม ICON แก้ไข เพื่องเก็บ KEY ส่งไปหน้า แก้ไขข้อมูล
    editData(item) {
      this.$router.push({
        name: "multipleEdit",
        params: {
          id: item.id
        }
      });
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
