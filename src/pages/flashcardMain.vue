<template>
  <q-page>
    <div>
      <div class="row justify-between">
        <!-- กล่อง radio -->
        <div class="brg row" style="width:330px">
          <q-radio
            class="q-ml-md col-6"
            color="blue-grey-10"
            v-model="expressionType"
            val="draft"
            label="แบบร่าง"
          />
          <q-radio color="blue-grey-10" v-model="expressionType" val="server" label="เซิร์ฟเวอร์" />
        </div>
        <!-- ปุ่มพิมพ์ -->
        <div class="mobile-hide">
          <q-btn v-if="expressionType == 'draft'" round color="blue-grey-10" icon="fas fa-print" />
        </div>
      </div>
      <!-- หัวข้อ -->
      <div class="q-ma-lg text-h6" align="center">
        <div>พนักงานร้านอาหาร</div>
        <div>1. รับออเดอร์</div>
      </div>
      <!-- ปุ่มเพิ่ม -->
      <div v-if="expressionType == 'server'" class style="height:36px"></div>
      <div class align="center">
        <q-btn
          expression
          v-if="expressionType == 'draft'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          :to="'/flashcardInput' + '/' + levelId +'/'+unitId + '/' + practiceId"
          color="white"
          label="เพิ่มคำศัพท์ "
        ></q-btn>
      </div>
      <!-- การ์ดข้อความ -->

      <q-card
        v-for="(item, index) in showDataFlashcard"
        v-show="item.collection == expressionType"
        :key="index"
        class="q-mt-md"
        style="width:100%"
      >
        <div
          v-if="item.status == 'waitForDelete'"
          class="absolute-center fit row items-center justify-center"
          style="background-color:black;opacity:0.6; z-index:1000"
        ></div>
        <!-- cancel-delete -->
        <q-btn
          v-if="item.status == 'waitForDelete'"
          @click="cancelDeleteFlashcard(item.id, item.order)"
          style="width:190px; z-index:2000"
          class="absolute-center bg-white"
        >ยกเลิกการลบ</q-btn>
        <q-card-section class="text-white bg-blue-grey-10">
          <div class="text-h6">รหัสลำดับ {{ item.order }}</div>
          <div class="row items-center absolute-right">
            <!-- icon-delete -->
            <q-icon
              @click="openDialogDelete(item.id, item.order , item.vocabulary)"
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-lg desktop-only"
              name="far fa-trash-alt"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-edit -->
            <q-icon
              @click="editDataFlashcard(item)"
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-md desktop-only"
              name="fas fa-edit"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-menu -->
            <q-icon
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-md mobile-only"
              name="fas fa-ellipsis-v"
              style="color:white; font-size: 1.4em;"
            />
            <!-- เมนูแก้ไข-ลบ -->
            <q-menu no-refocus>
              <q-list style="min-width: 120px">
                <q-item
                  clickable
                  v-close-popup
                  @click="editDataFlashcard(item)"
                  class="cursor-pointer mobile-only"
                >
                  <q-item-section>แก้ไข</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  v-if="item.status != 'waitForDelete'"
                  @click="openDialogDelete(item.id, item.order)"
                  class="cursor-pointer mobile-only"
                >
                  <q-item-section>ลบ</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-card-section>
        <!-- ประโยคข้อความ -->
        <q-card-section class="no-padding">
          <div class="row">
            <!-- รูป -->
            <div
              v-if="item.isImage == true"
              class="col-sm-6 col-xs-12 q-px-md q-pt-md q-pb-sm text-h6"
              align="center"
            >
              <q-img :src="item.img" :ratio="4/3" style="max-width:400px; width:100%" class></q-img>
            </div>
            <!-- คำ -->
            <div class="col-6">
              <div class="row items-center q-ml-md">
                <div>
                  <q-btn
                    v-if="item.isSound == true"
                    style="margin-top:10%"
                    flat
                    icon="fas fa-volume-up"
                    color="blue-grey-10"
                    @click="playSound(item.audio)"
                  ></q-btn>
                </div>
                <div class="q-px-md q-pt-md q-pb-sm text-h6 text-blue-grey-10">{{item.vocabulary}}</div>
              </div>
              <div class="q-ml-md q-px-md q-pt-md q-pb-sm text-h6 text-blue-grey-10">{{item.read}}</div>
              <div class="q-ml-md q-px-md q-p-md q-pb-sm text-h6 text-blue-grey-10">{{item.meaning}}</div>
            </div>
          </div>
          <q-separator />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
    <!-- ------------------------------------------Dialog------------------------------------ -->
    <!-- ลบ -->
    <q-dialog v-model="dialogDelete" persistent>
      <q-card style="min-width: 350px; height:200px">
        <q-card-section>
          <div align="center" class="q-mt-lg text-h6">คุณต้องการลบคำศัพท์์</div>
          <div align="center" class="q-mb-md text-h6">"{{ getOrder }} - {{getVocabulary}}"</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn style="width:120px" outline color="blue-grey-10" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="deleteDataFlashcard()"
            color="blue-grey-10"
            style="width:120px"
            label="ตกลง"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ยกเลิกกการลบ -->
    <q-dialog v-model="dialogCancelDelete" persistent>
      <q-card style="min-width: 350px; height:200px">
        <q-card-section>
          <div class="q-mt-lg text-h6">ต้องการลบ "รหัสลำดับ {{ getOrder }}" หรือไม่</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn style="width:120px" outline color="blue-grey-10" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="cancelDeleteFlashcard()"
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- เพิ่มข้อมูลสำเร็จ -->
    <q-dialog v-model="successData">
      <q-card style="min-width: 323px; height:200px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
export default {
  data() {
    return {
      successData: false,
      expressionType: "draft",
      dialogDelete: false,
      dialogCancelDelete: false,
      getId: "",
      getOrder: "",
      getVocabulary: "",
      showDataFlashcard: "",
      levelId: this.$route.params.levelId,
      unitId: this.$route.params.unitId,
      isSnap: "",
      practiceId: this.$route.params.practiceId
    };
  },
  methods: {
    loadDataFlashcard() {
      db.collection("practice_draft")
        .where("levelId", "==", this.levelId)
        .where("unitId", "==", this.unitId)
        .where("practiceId", "==", this.practiceId)

        .onSnapshot(dataDraft => {
          let temp = [];
          dataDraft.forEach(element => {
            let getImage = "";
            let getSound = "";
            if (element.data().isImage == true) {
              getImage =
                " https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/image/" +
                element.id +
                ".jpg";
            }
            if (element.data().isSound == true) {
              getSound =
                "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/audio/" +
                element.id +
                ".mp3";
            }
            temp.push({
              ...element.data(),
              collection: "draft",
              id: element.id,
              img: getImage,
              audio: getSound
            });
          });
          db.collection("practice_server")
            .where("levelId", "==", this.levelId)
            .where("unitId", "==", this.unitId)
            .where("practiceId", "==", this.practiceId)

            .get()
            .then(dataServer => {
              dataServer.forEach(element => {
                let getImage = "";
                let getSound = "";
                if (element.data().isImage == true) {
                  getImage =
                    " https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/image/" +
                    element.id +
                    ".jpg";
                }
                if (element.data().isSound == true) {
                  getSound =
                    "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/audio/" +
                    element.id +
                    ".mp3";
                }
                temp.push({
                  ...element.data(),
                  collection: "server",
                  id: element.id,
                  img: getImage,
                  audio: getSound
                });
              });

              temp.sort((a, b) => {
                return a.order - b.order;
              });

              this.showDataFlashcard = temp;
            });
        });
    },
    openDialogDelete(id, order, vocabulary) {
      this.dialogDelete = true;
      this.getId = id;
      this.getOrder = order;
      this.getVocabulary = vocabulary;
    },
    cancelDeleteFlashcard(id) {
      db.collection("practice_draft")
        .doc(id)
        .update({ status: "notSync" })
        .then(() => {
          this.getId = "";
          this.dialogCancelDelete = false;
        });
    },
    deleteDataFlashcard() {
      db.collection("practice_draft")
        .doc(this.getId)
        .update({ status: "waitForDelete" })
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
          this.successData = true;
          setTimeout(() => {
            this.successData = false;
          }, 2500);
        });
    },
    editDataFlashcard(item) {
      this.$router.push({
        name: "flashcardEdit",
        params: {
          data: {
            isImage: item.isImage,
            isSound: item.isSound,
            levelId: item.levelId,
            unitId: item.unitId,
            vocabulary: item.vocabulary,
            meaning: item.meaning,
            read: item.read,
            order: item.order,
            status: item.status,
            practiceId: item.practiceId
          },
          id: item.id
        }
      });
    },
    playSound(pathSound) {
      console.log(pathSound);
      let audio = new Audio(pathSound);
      audio.play();
    }
  },
  mounted() {
    this.loadDataFlashcard();
  }
};
</script>

<style lang="scss" scoped></style>
