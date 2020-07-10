<template>
  <q-page class>
    <div class="container">
      <div class="row justify-between">
        <!-- กล่อง radio -->
        <div class="col text-left">
          <div class="row brg" style="max-width:330px ; width:100%">
            <div class="col">
              <q-radio
                @input="changeRadio(false)"
                color="blue-grey-10"
                v-model="expressionType"
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <div class="col">
              <q-radio
                @input="changeRadio(true)"
                color="blue-grey-10"
                v-model="expressionType"
                val="server"
                label="เซิร์ฟเวอร์"
              />
            </div>
          </div>
        </div>
        <div>
          <!-- ปุ่มซิงค์ -->
          <div class="q-ml-md" v-if="$q.platform.is.mobile">
            <sync-btn :practiceId="practiceId" :isServer="isDisable"></sync-btn>
          </div>
          <div class="row desktop-only" v-if="expressionType == 'draft'">
            <div class="q-mx-md">
              <sync-btn :practiceId="practiceId"></sync-btn>
            </div>
            <!-- ปุ่มพิมพ์ -->
            <div class="mobile-hide">
              <q-btn
                v-if="expressionType == 'draft'"
                round
                color="blue-grey-10"
                icon="fas fa-print"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- หัวข้อ -->
      <div class="q-ma-lg text-h6" align="center">
        <div>{{getLevelName}}</div>
        <div>{{getUnitName}}</div>
      </div>
      <!-- ปุ่มเพิ่ม -->
      <div class align="center">
        <q-btn
          v-if="expressionType == 'draft'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          @click="addDataExpression()"
          color="white"
          label="เพิ่มประโยคสนทนา"
        ></q-btn>
        <q-btn
          v-if="expressionType == 'server'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          color="white"
          label="เพิ่มประโยคสนทนา"
          disable
        ></q-btn>
      </div>
      <!-- การ์ดข้อความ -->

      <q-card
        v-for="(item, index) in  showDataExpression"
        v-show="item.collection == expressionType"
        :key="index"
        class="q-mt-md"
        style="width:100%"
      >
        <div
          v-if="item.status == 'waitForDelete'"
          class="absolute-center fit row items-center justify-center"
          style="background-color:black;opacity:0.6; z-index:2500"
        ></div>
        <!-- cancel-delete -->
        <q-btn
          v-if="item.status == 'waitForDelete' && $q.platform.is.desktop"
          @click="cancelDeleteExpression(item.id, item.order)"
          style="width:190px; z-index:2600; "
          class="absolute-center bg-white"
        >ยกเลิกการลบ</q-btn>
        <q-card-section class="text-white bg-blue-grey-10">
          <div
            v-if="item.status != 'waitForDelete' || $q.platform.is.desktop"
            class="text-h6"
          >รหัสลำดับ {{item.order}}</div>
          <div
            @click="cancelDeleteExpression(item.id, item.order)"
            v-if="$q.platform.is.mobile && item.status == 'waitForDelete'"
            class="text-subtitle1 cursor-pointer"
            style="z-index:2600 ; position : relative; width: fit-content"
          >
            <u>ยกเลิกการลบ</u>
          </div>
          <div class="row items-center absolute-right">
            <!-- icon-delete -->
            <q-icon
              @click="openDialogDelete(item.id,item.order)"
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-lg desktop-only"
              name="far fa-trash-alt"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-edit -->
            <q-icon
              @click="editDataExpression(item)"
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-md desktop-only"
              name="fas fa-edit"
              style="color:white; font-size: 1.4em;"
            />
            <!-- icon-menu -->
            <q-btn
              dense
              flat
              round
              size="13px"
              v-if="expressionType == 'draft'"
              class="cursor-pointer mobile-only"
              icon="fas fa-ellipsis-v"
            >
              <!-- เมนูแก้ไข-ลบ -->
              <q-menu anchor="top right" self="top right" :offset="[0,-37]" class="mobile-only">
                <q-list style="min-width:180px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="editDataExpression(item)"
                    class="cursor-pointer text-subtitle1"
                  >
                    <q-item-section>แก้ไขประโยคสนทนา</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    v-if="item.status != 'waitForDelete'"
                    @click="openDialogDelete(item.id,item.order)"
                    class="cursor-pointer text-subtitle1"
                  >
                    <q-item-section>ลบประโยคสนทนา</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-section>
        <!-- ประโยคข้อความ -->
        <q-card-section v-for="(item2, index2) in item.expression" :key="index2" class="no-padding">
          <div v-if="item2.speaker == 'employee'" class="q-px-md q-pt-md q-pb-sm text-h6">พนักงาน:</div>
          <div v-if="item2.speaker == 'customer'" class="q-px-md q-pt-md q-pb-sm text-h6">ลูกค้า:</div>
          <div class="row items-center">
            <div class="col-1">
              <q-btn
                v-if="item2.isSound == true"
                style="margin-top:10%"
                flat
                icon="fas fa-volume-up"
                color="blue-grey-10"
                @click="playSound('https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/audio/' + item.id +'-' +(index2+1)+'.mp3')"
              ></q-btn>
            </div>
            <div
              :class="$q.platform.is.desktop?'col-11 text-subtitle1':'q-ml-lg  text-subtitle1'"
            >{{item2.sentenceEng}}</div>
          </div>
          <div class="row">
            <div
              :class="$q.platform.is.desktop?'col-11 offset-1 text-subtitle1 text-blue-grey-7':'text-blue-grey-7  text-subtitle1' "
              :style="$q.platform.is.mobile?'margin-left:52px': null"
            >{{item2.sentenceTh}}</div>
          </div>

          <q-separator />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
    <!-- ------------------------------------------Dialog------------------------------------ -->
    <dialog-setting :type="4" v-if="isShowDialogDelete == true"></dialog-setting>
    <dialog-setting :type="9" v-if="isShowDialogSync == true"></dialog-setting>

    <q-dialog v-model="dialogDelete" persistent>
      <q-card style="min-width: 350px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg text-subtitle1">ต้องการลบประโยคสนทนา</div>
          <div class="q-mb-md text-subtitle1">"รหัสลำดับ {{getOrder}}"</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn style="width:120px" outline color="blue-grey-10" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="deleteExpression()"
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogCancelDelete" persistent>
      <q-card style="min-width: 350px; height:170px">
        <q-card-section>
          <div class="q-mt-lg text-h6">ต้องการลบ "รหัสลำดับ {{getOrder}}" หรือไม่</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
import dialogSetting from "../components/dialogSetting";
import syncBtn from "../components/syncBtn.vue";
export default {
  components: {
    dialogSetting,
    syncBtn
  },
  data() {
    return {
      isShowDialogDelete: false,
      isShowDialogSync: false,
      expressionType: "draft",
      dialogDelete: false,
      dialogCancelDelete: false,
      getId: "",
      getOrder: "",
      getLevelName: "",
      getUnitName: "",
      showDataExpression: "",
      levelId: this.$route.params.levelId,
      unitId: this.$route.params.unitId,
      practiceId: this.$route.params.practiceId,
      isSnap: "",
      isDisable: false
    };
  },
  methods: {
    changeRadio(val) {
      this.isDisable = val;
    },
    openDialogSync() {
      this.isShowDialogSync = true;
    },
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
    loadDataExpression() {
      db.collection("practice_draft")
        .where("levelId", "==", this.levelId)
        .where("unitId", "==", this.unitId)
        .where("practiceId", "==", this.practiceId)
        .onSnapshot(dataDraft => {
          let temp = [];
          dataDraft.forEach(element => {
            temp.push({
              ...element.data(),
              collection: "draft",
              id: element.id
            });
          });
          db.collection("practice_server")
            .where("levelId", "==", this.levelId)
            .where("unitId", "==", this.unitId)
            .where("practiceId", "==", this.practiceId)
            .get()
            .then(dataServer => {
              dataServer.forEach(element => {
                temp.push({
                  ...element.data(),
                  collection: "server",
                  id: element.id
                });
              });
              temp.sort((a, b) => {
                return a.order - b.order;
              });
              this.showDataExpression = temp;
            });
        });
    },
    openDialogDelete(id, order) {
      this.successDelete = true;
      this.dialogDelete = true;
      this.getId = id;
      this.getOrder = order;
    },
    async cancelDeleteExpression(id) {
      await this.updateSyncStatus(this.practiceId, this.unitId);
      db.collection("practice_draft")
        .doc(id)
        .update({ status: "notSync" })
        .then(() => {
          this.getId = "";
          this.dialogCancelDelete = false;
          this.successDelete = true;
          setTimeout(() => {
            this.successDelete = false;
          }, 2500);
        });
    },
    async deleteExpression() {
      await this.updateSyncStatus(this.practiceId, this.unitId);
      db.collection("practice_draft")
        .doc(this.getId)
        .update({ status: "waitForDelete" })
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
          this.isShowDialogDelete = true;
        });
    },
    editDataExpression(item) {
      this.$router.push({
        name: "expressionEdit",
        params: {
          ...item,
          levelId: this.levelId,
          unitId: this.unitId,
          getLevelName: this.getLevelName,
          getUnitName: this.getUnitName
        }
      });
      console.log(item);
    },
    addDataExpression() {
      this.$router.push({
        name: "expressionInput",
        params: {
          getLevelName: this.getLevelName,
          getUnitName: this.getUnitName,
          levelId: this.levelId,
          unitId: this.unitId
        }
      });
    },
    playSound(pathSound) {
      let audio = new Audio(pathSound);
      console.log(pathSound);
      audio.play();
    }
  },
  mounted() {
    this.loadDataExpression();
    this.loadLevelData();
    this.loadUnitData();

    // var user = auth.currentUser;
  }
};
</script>

<style lang="scss" scoped>
</style>
