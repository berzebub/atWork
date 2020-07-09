<template>
  <q-page>
    <div>
      <div class="row justify-between">
        <!-- กล่อง radio -->
        <div class="brg row" :style="$q.platform.is.desktop?'width:330px':'width:250px'">
          <q-radio
            class="q-ml-md col-6"
            color="blue-grey-10"
            v-model="flashcardType"
            val="draft"
            label="แบบร่าง"
          />
          <q-radio color="blue-grey-10" v-model="flashcardType" val="server" label="เซิร์ฟเวอร์" />
        </div>
        <!-- ปุ่มซิงค์ -->
        <div class="row">
          <div class="q-mr-md">
            <q-btn
              @click="sync(practiceId),openDialogSync()"
              v-if="flashcardType == 'draft'"
              round
              color="blue-grey-10"
              icon="fas fa-sync"
            />
          </div>
          <!-- ปุ่มพิมพ์ -->
          <div class="mobile-hide">
            <q-btn v-if="flashcardType == 'draft'" round color="blue-grey-10" icon="fas fa-print" />
          </div>
        </div>
      </div>
      <!-- หัวข้อ -->
      <div class="q-ma-lg text-h6" align="center">
        <div>{{getLevelName}}</div>
        <div>{{getUnitName}}</div>
      </div>
      <!-- ปุ่มเพิ่ม -->
      <div align="center">
        <q-btn
          v-if="flashcardType == 'draft'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          @click="addDataFlashcard()"
          color="white"
          label="เพิ่มคำศัพท์ "
        ></q-btn>
        <q-btn
          v-if="flashcardType == 'server'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          color="white"
          label="เพิ่มคำศัพท์ "
          disable
        ></q-btn>
      </div>
      <!-- การ์ดข้อความ -->

      <q-card
        v-for="(item, index) in showDataFlashcard"
        v-show="item.collection == flashcardType"
        :key="index"
        class="q-mt-md"
        style="width:100%"
      >
        <div
          v-if="item.status == 'waitForDelete'"
          class="absolute-center fit row items-center justify-center"
          style="background-color:black;opacity:0.6; z-index:2500;"
        ></div>
        <!-- cancel-delete -->
        <q-btn
          v-if="item.status == 'waitForDelete' && $q.platform.is.desktop"
          @click="cancelDeleteFlashcard(item.id, item.order)"
          style="width:190px; z-index:2600; "
          class="absolute-center bg-white"
        >ยกเลิกการลบ</q-btn>
        <q-card-section class="text-white bg-blue-grey-10">
          <div
            v-if="item.status != 'waitForDelete'"
            class="text-subtitle1"
          >รหัสลำดับ {{ item.order }}</div>
          <div
            @click="cancelDeleteFlashcard(item.id, item.order)"
            v-if="$q.platform.is.mobile && item.status == 'waitForDelete'"
            class="brx text-subtitle1 cursor-pointer"
            style="z-index:2600 ; position : relative; width: fit-content"
          >
            <u>ยกเลิกการลบ</u>
          </div>
          <div class="row items-center absolute-right">
            <!-- icon-delete -->
            <q-icon
              @click="openDialogDelete(item.id, item.order , item.vocabulary)"
              v-if="flashcardType == 'draft'"
              class="cursor-pointer q-pr-lg desktop-only"
              name="far fa-trash-alt"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-edit -->
            <q-icon
              @click="editDataFlashcard(item)"
              v-if="flashcardType == 'draft'"
              class="cursor-pointer q-pr-md desktop-only"
              name="fas fa-edit"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-menu -->
            <q-icon
              v-if="flashcardType == 'draft'"
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
                  @click="openDialogDelete(item.id, item.order , item.vocabulary)"
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
              <q-img :src="item.img" :ratio="1/1" style="width:300px;height:300px" class></q-img>
            </div>
            <!-- คำ -->
            <div class="q-md-6 q-sm-12">
              <div class="row items-center q-ml-md q-mt-md">
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
              <div
                class="q-ml-md q-px-md q-pt-md q-pb-sm text-subtitle1 text-blue-grey-10"
              >{{item.read}}</div>
              <div
                class="q-ml-md q-px-md q-p-md q-pb-sm text-subtitle1 text-blue-grey-10"
              >{{item.meaning}}</div>
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
          <div align="center" class="q-mt-lg text-h6">คุณต้องการลบคำศัพท์</div>
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
    <q-dialog v-model="successDelete">
      <q-card style="min-width: 323px; height:200px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- เพิ่มข้อมูลสำเร็จ -->
    <q-dialog v-model="successDelete">
      <q-card style="min-width: 323px; height:200px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">ลบคำศัพท์เรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ซิงค์ข้อมูลเรียบร้อย -->
    <q-dialog v-model="successSync">
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg" style="margin-top:45px">
            <q-btn
              outline
              round
              class="text-teal"
              size="16px"
              style="border-style:solid; border-width:3px"
            >
              <q-icon color="secondary" name="fas fa-sync" />
            </q-btn>
          </div>
          <div class="q-mt-lg text-subtitle1">ซิงค์ข้อมูลเรียบร้อย</div>
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
      successSync: false,
      successData: false,
      successDelete: false,
      flashcardType: "draft",
      dialogDelete: false,
      getId: "",
      getOrder: "",
      getVocabulary: "",
      getLevelName: "",
      getUnitName: "",
      showDataFlashcard: "",
      levelId: this.$route.params.levelId,
      unitId: this.$route.params.unitId,
      isSnap: "",
      isDelete: true,
      practiceId: this.$route.params.practiceId
    };
  },
  methods: {
    loadLevelData() {
      db.collection("level")
        .doc(this.levelId)
        .get()
        .then(data => {
          this.getLevelName = data.data().name;
        });
    },
    loadUnitData() {
      db.collection("unit")
        .doc(this.unitId)
        .get()
        .then(data => {
          this.getUnitName = data.data().name;
        });
    },
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
    openDialogSync() {
      this.successSync = true;
      setTimeout(() => {
        this.successSync = false;
      }, 2500);
    },
    openDialogDelete(id, order, vocabulary) {
      this.dialogDelete = true;
      this.getId = id;
      this.getOrder = order;
      this.getVocabulary = vocabulary;
    },
    async cancelDeleteFlashcard(id) {
      await this.updateSyncStatus(this.practiceId, this.unitId);
      db.collection("practice_draft")
        .doc(id)
        .update({ status: "notSync" })
        .then(() => {
          this.isDelete = false;
          this.getId = "";
          this.dialogCancelDelete = false;
        });
    },
    async deleteDataFlashcard() {
      await this.updateSyncStatus(this.practiceId, this.unitId);
      db.collection("practice_draft")
        .doc(this.getId)
        .update({ status: "waitForDelete" })
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
          this.successDelete = true;
          setTimeout(() => {
            this.successDelete = false;
            this.isDelete = true;
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
    addDataFlashcard() {
      this.$router.push(
        "/flashcardInput/" +
          this.levelId +
          "/" +
          this.unitId +
          "/" +
          this.practiceId
      );
      // this.$router.push({
      //   name: "flashcardInput",
      //   params: {
      //     data: {
      //       levelId: item.levelId,
      //       unitId: item.unitId,
      //       practiceId: item.practiceId
      //     },
      //     getLevelName: this.getLevelName,
      //     getUnitName: this.getUnitName
      //   }
      // });
    },
    playSound(pathSound) {
      console.log(pathSound);
      let audio = new Audio(pathSound);
      audio.play();
    }
  },
  mounted() {
    this.loadDataFlashcard();
    this.loadLevelData();
    this.loadUnitData();
  }
};
</script>

<style lang="scss" scoped></style>
