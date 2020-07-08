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
          <div class="row">
            <div class="q-mr-md">
              <q-btn
                @click="sync(practiceId),openDialogSync()"
                v-if="expressionType == 'draft'"
                round
                color="blue-grey-10"
                icon="fas fa-sync"
              />
            </div>
            <q-btn v-if="expressionType == 'draft'" round color="blue-grey-10" icon="fas fa-print" />
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
          label="เพิ่ม"
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
          class="brx absolute-center fit row items-center justify-center"
          style="background-color:black;opacity:0.6; z-index:1000"
        ></div>
        <!-- cancel-delete -->
        <q-btn
          v-if="item.status == 'waitForDelete'"
          @click="cancelDeleteExpression(item.id,item.order)"
          style="width:190px; z-index:2000"
          class="absolute-center bg-blue-grey-10 text-white"
        >ยกเลิกการลบ</q-btn>
        <q-card-section class="text-white bg-blue-grey-10">
          <div class="text-h6">รหัสลำดับ {{item.order}}</div>
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
                  @click="editDataExpression(item)"
                  class="cursor-pointer mobile-only"
                >
                  <q-item-section>แก้ไข</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  v-if="item.status != 'waitForDelete'"
                  @click="openDialogDelete(item.id,item.order)"
                  class="cursor-pointer mobile-only"
                >
                  <q-item-section>ลบ</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-card-section>
        <!-- ประโยคข้อความ -->
        <q-card-section v-for="(item2, index2) in item.expression" :key="index2" class="no-padding">
          <div v-if="item2.speaker == 'employee'" class="q-px-md q-pt-md q-pb-sm text-h6">พนักงาน:</div>
          <div v-if="item2.speaker == 'customer'" class="q-px-md q-pt-md q-pb-sm text-h6">ลูกค้า:</div>
          <div class="q-px-md q-p-md q-pb-sm text-h6">{{item2.sentenceEng}}</div>
          <div class="q-px-md q-pb-md text-subtitle1">{{item2.sentenceTh}}</div>

          <q-separator />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
    <!-- ------------------------------------------Dialog------------------------------------ -->

    <q-dialog v-model="dialogDelete" persistent>
      <q-card style="min-width: 350px; height:170px">
        <q-card-section>
          <div class="q-mt-lg text-h6">ต้องการลบ "รหัสลำดับ {{getOrder}}" หรือไม่</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn style="width:120px" outline color="blue-grey-10" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="deleteDataExpression()"
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

        <q-card-actions align="center">
          <q-btn style="width:120px" outline color="blue-grey-10" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="cancelDeleteExpression()"
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          />
        </q-card-actions>
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
      isSnap: ""
    };
  },
  methods: {
    openDialogSync() {
      this.successSync = true;
      setTimeout(() => {
        this.successSync = false;
      }, 2500);
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
            console.log(element.data());
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
                console.log(element.data());

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
      this.dialogDelete = true;
      this.getId = id;
      this.getOrder = order;
    },
    cancelDeleteExpression(id) {
      db.collection("practice_draft")
        .doc(id)
        .update({ status: "notSync" })
        .then(() => {
          this.getId = "";
          this.dialogCancelDelete = false;
        });
    },
    deleteDataExpression() {
      db.collection("practice_draft")
        .doc(this.getId)
        .update({ status: "waitForDelete" })
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
        });
    },
    editDataExpression(item) {
      this.$router.push({
        name: "expressionEdit",
        params: { ...item, levelId: this.levelId, unitId: this.unitId }
      });
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
    }
  },
  mounted() {
    this.loadDataExpression();
    this.loadLevelData();
    this.loadUnitData();

    // var user = auth.currentUser;
    // console.log(user.email);
  }
};
</script>

<style lang="scss" scoped>
</style>
