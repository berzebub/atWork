<template>
  <q-page class="text-blue-grey-10">
    <div class="container">
      <div style="max-width:700px" class="row justify-between">
        <div class="col text-left">
          <div class="row boxServer">
            <!-- แบบร่าง -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadDarft()"
                v-model="mode "
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <!-- เซิร์ฟเวอร์ -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadServer()"
                v-model="mode "
                val="server"
                label="เซิร์ฟเวอร์"
              />
            </div>
          </div>
        </div>
        <div class="desktop-only">
          <div class="text-right">
            <q-btn
              v-if="mode =='draft'"
              round
              color="blue-grey-10"
              icon="fas fa-print"
              to="/multiplePrint"
            />
          </div>
        </div>
      </div>
      <div class="text-h6 text-center q-pt-md">
        <div>อาหารและเครื่องดื่ม</div>
        <div>1. จองโต๊ะ</div>
      </div>
      <div class="q-my-md boxCard text-left">
        <div
          style="border-top-left-radius: 6px;border-top-right-radius: 6px "
          class="bg-blue-grey-10 text-white q-py-sm q-pr-xs q-pl-md text-subtitle1 row justify-between"
        >
          <div class="self-center">วิดีโอสนทนา</div>
          <div>
            <q-btn
              v-if="mode  == 'draft'"
              @click="editBtn()"
              size="sm"
              icon="far fa-edit"
              round
              flat
            ></q-btn>
          </div>
        </div>

        <div class="q-px-md q-py-sm">
          <div v-if="dataVdo.isVdo" align="center">
            <div class="q-my-md">
              <q-video
                style="max-width:500px;height:278px"
                :src="'https://www.youtube.com/embed/'+ linkVdo"
              />
            </div>
          </div>
          <div class="text-subtitle1">ลิงก์วิดีโอ</div>
          <div>
            <q-input outlined v-model="fileVdo" dense readonly />
          </div>
          <div class="text-center q-py-md">
            <router-link @click.native="remove" to="/remove">
              <span
                class="text-blue-grey-10 text-center text-body2"
              >ขั้นตอนการตั้งค่าอัพโหลดไฟล์บน Youtube</span>
            </router-link>
          </div>
        </div>
      </div>
      <q-separator />
      <div class="q-pt-md">
        <div class="text-center">
          <q-btn
            @click="addBtn()"
            style="max-width :190px;width:100%"
            class="bg-blue-grey-10 text-white text-subtitle1"
            label="เพิ่มประโยค"
          />
        </div>
        <div class="text-center">
          <div
            v-for="item,index in data"
            :key="index"
            class="q-mt-md boxCard text-left relative-position"
          >
            <q-btn
              dense
              style="z-index:30;width:190px;"
              class="absolute-center q-pa-sm text-blue-grey-10"
              v-if="item.status  == 'waitForDelete'"
              color="white"
              label="ยกเลิกการลบ"
              @click="cancelDelete(item.key)"
            ></q-btn>
            <div v-if="item.status  == 'waitForDelete'" class="absolute-center backDrop"></div>
            <div
              style="border-top-left-radius: 6px;border-top-right-radius: 6px "
              class="bg-blue-grey-10 text-white q-py-sm q-pr-xs q-pl-md text-subtitle1 row justify-between"
            >
              <div class="self-center">รหัสลำดับ {{item.order}}</div>
              <div>
                <q-btn class="mobile-only" size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu>
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="editBtn(item.key)">แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="deleteBtn(item.key,item.order)">ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
                <div class="col self-center desktop-only" align="right">
                  <q-btn
                    v-if="item.status  != 'waitForDelete' && mode == 'draft'"
                    @click="deleteBtn(item.key,item.order)"
                    size="sm"
                    class="q-mr-sm"
                    round
                    flat
                    icon="far fa-trash-alt"
                  />
                  <q-btn
                    v-if="item.status  != 'waitForDelete' && mode == 'draft'"
                    @click="editBtn(item.key)"
                    size="sm"
                    flat
                    round
                    icon="far fa-edit"
                  />
                </div>
              </div>
            </div>
            <div class="q-px-md q-py-sm">
              <div class="row">
                <div v-if="item.customer == 1 ">ลูกค้า:</div>
                <div v-if="item.customer == 2 ">พนักงาน:</div>
                <div class="q-px-sm">
                  <q-btn
                    size="sm"
                    @click="playAudio(item.soundURL)"
                    round
                    flat
                    icon="fas fa-volume-up"
                  />
                </div>
                <div class="col">
                  <span class="text-subtitle1">{{item.sentenceEng}}</span>
                </div>
              </div>
              <div class="text-blue-grey-7 text-subtitle2">{{item.sentenceTh}}</div>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="editVdoDialog">
        <q-card style="max-width:328px;width:100%;height:200px">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div>
              <div class="text-h6">แก้ไขวิดีโอ</div>
              <div class="text-subtitle1 text-left q-px-md">ลิงก์วิดีโอ</div>
              <div class="q-px-md">
                <q-input
                  autogrow
                  outlined
                  v-model="dataVdo.linkVdo"
                  dense
                  ref="link"
                  :rules="[ val => !!val || 'กรุณาใส่ลิงก์วิดีโอ']"
                />
              </div>
            </div>
            <div align="center" class="q-px-md">
              <div class="row reverse-wrap justify-center" style="max-width:300px;width:100%">
                <div class="col-6 q-py-sm text-center">
                  <q-btn
                    dense
                    style="width:120px"
                    color="white"
                    outline
                    v-close-popup
                    text-color="blue-grey-10"
                    label="ยกเลิก"
                  />
                </div>
                <div class="col-6 q-py-sm text-center">
                  <q-btn
                    :disable="checkble"
                    @click="saveVdo()"
                    dense
                    style="width:120px"
                    color="blue-grey-10"
                    label="บันทึก"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <!-- delete -->
      <q-dialog v-model="isDeleteDialog" persistent>
        <q-card class="row justify-center" style="max-width:328px;width:100%;height:200px">
          <div class="text-subtitle1 text-center q-pt-xl q-pb-sm">
            <div>ต้องการลบข้อมูล</div>
            <div>“รหัสลำดับ {{ orderId }}” หรือไม่</div>
          </div>
          <div>
            <div class="row reverse-wrap justify-center q-px-md">
              <div class="q-px-sm q-pb-md">
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
              <div class="q-px-sm q-pb-md">
                <q-btn @click="deleteData()" dense style="width:120px" color="black" label="ตกลง" />
              </div>
            </div>
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
      isDeleteDialog: false,
      orderId: "",
      isDeleteKey: "",
      mode: "draft",
      checkble: false,
      editVdoDialog: false,
      text: "",
      fileVdo: "",
      isKeyVdio: "",
      isKeyImage: "",
      tab: "sentence",
      linkVdo: "",
      dataVdo: {
        isVdo: false,
        linkVdo: "",
        practiceType: "vdoconverse"
      },
      data: [],
      dataDraft: [],
      dataServer: [],
      idVdo: "",
      pathFile:
        "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/"
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
    loadDataAll() {
      db.collection("practice_list")
        .where("practiceType", "==", "vdoconverse")
        .get()
        .then(doc => {
          doc.forEach(element => {
            this.idVdo = element.id;
            this.dataVdo.isVdo = element.data().isVdo;
            this.fileVdo = element.data().linkVdo;
            let datakey = element.data().linkVdo.split("/");
            this.linkVdo = datakey[3];
          });
          if (this.dataVdo.isVdo == false) {
            this.editVdoDialog = true;
          }
        });
      this.data = [];
      if (this.mode == "draft") {
        this.dataDraft = [];
        db.collection("practice_draft")
          .where("practiceId", "==", "vdo")
          .get()
          .then(doc => {
            let getSound = "";
            doc.forEach(element => {
              if (element.data().isSound) {
                getSound = this.pathFile + "audio/" + element.id + ".mp3";
              }
              let dataKey = {
                key: element.id,
                soundURL: getSound
              };
              let final = {
                ...dataKey,
                ...element.data()
              };
              this.dataDraft.push(final);
            });
            this.loadDarft();
          });
      } else {
        this.dataServer = [];
      }
    },
    loadDarft() {
      this.data = this.dataDraft;
    },
    loadServer() {
      this.data = this.dataServer;
    },
    addBtn() {
      this.$router.push("/vdoInputAdd");
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
            })
            .then(() => {
              this.loadDataAll();
            });
        });
    },
    // เล่นเสียง
    playAudio(sound) {
      let audio = new Audio(sound);
      audio.play();
    },
    editBtn(key) {
      if (key) {
        this.$router.push("/vdoInputEdit/" + key);
      } else {
        this.dataVdo.linkVdo = "";
        this.editVdoDialog = true;
      }
    },
    saveVdo() {
      this.$refs.link.validate();
      if (this.$refs.link.hasError) {
        return;
      }
      this.fileVdo = this.dataVdo.linkVdo;
      if (!this.dataVdo.isVdo) {
        this.dataVdo.isVdo = true;
        db.collection("practice_list").add(this.dataVdo);
      } else {
        db.collection("practice_list")
          .doc(this.idVdo)
          .update(this.dataVdo);
      }
      this.editVdoDialog = false;
      this.loadDataAll();
    },
    deleteBtn(key, id, index) {
      this.isDeleteKey = key;
      this.orderId = id;
      this.isDeleteDialog = true;
    },
    // อัพเดด
    deleteData() {
      db.collection("practice_draft")
        .doc(this.isDeleteKey)
        .update({
          status: "waitForDelete"
        })
        .then(() => {
          this.isDeleteDialog = false;
          this.loadDataAll();
        });
    }
  },
  mounted() {
    this.loadDataAll();
  }
};
</script>

<style scoped>
.boxCard {
  border: 1px solid #263238;
  border-radius: 10px;
}
.box {
  border: 1px solid #263238;
}
.boxServer {
  width: 100%;
  max-width: 330px;
  border: 1px solid #263238;
}
</style>