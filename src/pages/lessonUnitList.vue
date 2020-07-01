<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-subtitle1">ชื่อตำแหน่ง</div>
      <div>
        <q-input dense outlined readonly :value="positionName"></q-input>
      </div>
    </div>

    <div align="center" class="q-py-md text-subtitle1">
      <q-btn
        dense
        color="blue-grey-10"
        style="width:190px"
        label="เพิ่มบทเรียน"
        @click="addLesson()"
      ></q-btn>
    </div>
    <!-- ShowLesson -->
    <div class="row" v-for="(item,index) in lessonList">
      <q-separator />
      <div class="bg-white q-pa-md text-subtitle1 col-9">{{item.order}} - {{item.name}}</div>

      <div v-show="item.status != true" class="col q-py-md bg-white" align="right">
        <q-icon size="16px" name="fas fa-power-off" dense color="negative" flat></q-icon>
      </div>
      <div class="col q-py-md bg-white" align="right">
        <q-btn
          size="10px"
          icon="fas fa-ellipsis-v"
          round
          dense
          color="blue-grey-10"
          class="bg-white"
          flat
        >
          <q-menu>
            <q-list style="min-width: 170px">
              <q-item clickable v-close-popup>
                <q-item-section @click="editLessonBtn(item)">แก้ไขบทเรียน</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="deleteLessonBtn(item)">ลบบทเรียน</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <q-separator />
    </div>
    <q-dialog v-model="savedDataDialog">
      <div
        class="bg-white row justify-center items-center"
        style="width:320px;height:200px"
        align="center"
      >
        <div>
          <q-icon name="far fa-check-circle" class="text-secondary" size="40px" />
          <div class="text-subtitle1 q-pt-md">บันทึกข้อมูลเรียบร้อยแล้ว</div>
        </div>
      </div>
    </q-dialog>
    <!-- dialog เพิ่มบทเรียน -->
    <q-dialog v-model="dialogLesson">
      <div class="bg-white row q-pa-md" style="width:330px">
        <div class="text-subtitle1 col-12" align="letf">รหัสลำดับ</div>
        <div style="width:300px">
          <q-input
            ref="order"
            dense
            mask="###"
            outlined
            v-model.number="dataLesson.order"
            :error="errorOrder"
            @keyup="errorOrder=false"
          ></q-input>
        </div>
        <span class="text-subtitle1 q-pt-sm">ชื่อบทเรียน</span>
        <div style="width:300px">
          <q-input
            ref="name"
            dense
            outlined
            v-model="dataLesson.name"
            :error="errorLesson"
            @keyup="errorLesson=false"
          ></q-input>
        </div>
        <div class="col-12 q-pt-md">
          <span class="text-black text-subtitle1">การใช้งานบทเรียน</span>

          <q-toggle v-model="dataLesson.status" color="secondary" />
        </div>
        <div class="col-6 q-pr-sm q-pt-md" align="right">
          <q-btn @click="cancelAddLesson()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-pt-md">
          <q-btn
            @click="saveLesson()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog ยืนยันการลบ -->
    <q-dialog v-model="dialogDeleteNull">
      <div
        class="bg-white row justify-center items-center q-py-md"
        style="width:323px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md col-12">
          ต้องการลบแบบฝึกหัดภายในบทเรียน
          <br />
          "{{nameLesson}}"
        </div>

        <div class="q-pt-lg q-pb-md">
          <q-btn dense color="blue-grey-10" style="width:120px" @click="okDelete()" label="ตกลง"></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog ยืนยันการลบ -->
    <q-dialog v-model="dialogDelete">
      <div
        class="bg-white row justify-center items-center"
        style="width:323px;height:200px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md">
          คุณต้องการลบบทเรียน
          <br />
          "{{nameLesson}}"
        </div>

        <div class="col-6 q-pr-sm" align="right">
          <q-btn @click="cancelDelete()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm" align="left">
          <q-btn
            @click="deleteLesson()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog ลบสำเร็จ -->
    <q-dialog v-model="deleted">
      <div
        class="bg-white row justify-center items-center"
        style="width:320px;height:200px"
        align="center"
      >
        <div>
          <q-icon name="far fa-check-circle" class="text-secondary" size="40px" />
          <div class="text-subtitle1 q-pt-md">ลบข้อมูลเรียบร้อยแล้ว</div>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
import { colors } from "quasar";
export default {
  data() {
    return {
      dataLesson: {
        order: "",
        name: "",
        status: false,
        levelId: this.$route.params.levelId
      },
      dialogLesson: false,
      savedDataDialog: false,

      positionName: "",
      lessonList: "",
      editId: "",
      nameOld: "",
      orderOld: "",
      errorOrder: false,
      errorLesson: false,
      isSnap: "",
      dialogDeleteNull: false,
      dialogDelete: false,
      nameLesson: "",
      dataDelete: "",
      deleted: false
    };
  },
  methods: {
    cancelAddLesson() {
      this.dialogLesson = false;
      this.editId = "";
    },
    async saveLesson() {
      if (
        this.nameOld != this.dataLesson.name ||
        this.orderOld != this.dataLesson.order
      ) {
        let checkName = false;
        let checkOrder = false;
        if (this.nameOld != this.dataLesson.name) {
          checkName = await this.isCheckName(this.dataLesson.name);
        }
        if (this.orderOld != this.dataLesson.order) {
          checkOrder = await this.isCheckOrder(this.dataLesson.order);
        }

        this.errorOrder = false;
        this.errorLesson = false;
        console.log(checkName);
        console.log(checkOrder);
        if (checkName || checkOrder) {
          if (checkName) {
            this.errorLesson = true;
          }
          if (checkOrder) {
            this.errorOrder = true;
          }
          return;
        }
      }

      this.loadingShow();
      if (this.editId != "") {
        db.collection("unit")
          .doc(this.editId)
          .update(this.dataLesson)
          .then(() => {
            this.editId = "";
            this.loadingHide();
            this.dialogLesson = false;
            this.savedDataDialog = false;
          });
      } else {
        db.collection("unit")
          .add(this.dataLesson)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;
            setTimeout(() => {
              this.dialogLesson = false;
              this.savedDataDialog = false;
            }, 1000);
          });
      }
    },
    addLesson() {
      (this.dataLesson = {
        order: "",
        name: "",
        status: false,
        levelId: this.$route.params.levelId
      }),
        (this.dialogLesson = true);
    },
    async isCheckName(val) {
      let doc = await db
        .collection("unit")
        .where("name", "==", val)
        .get();
      return doc.size ? true : false;
    },
    async isCheckOrder(val) {
      let doc = await db
        .collection("unit")
        .where("order", "==", val)
        .get();
      return doc.size ? true : false;
    },
    // ลบบทเรียน
    deleteLessonBtn(data) {
      this.nameLesson = data.name;

      console.log(data);
      db.collection("practice_server")
        .where("levelId", "==", data.levelId)
        .where("unitId", "==", data.unitId)
        .get()
        .then(doc => {
          console.log(doc.size);
          if (doc.size > 0) {
            this.dialogDeleteNull = true;
          } else {
            this.dataDelete = data;
            this.dialogDelete = true;
          }
        });
    },
    // แก้ไขบทเรียน
    editLessonBtn(data) {
      let coppyData = { ...data };
      this.dialogLesson = true;
      this.dataLesson = coppyData;
      this.editId = data.unitId;
      this.orderOld = coppyData.order;
      this.nameOld = coppyData.name;
    },
    loadNamePosition() {
      db.collection("level")
        .doc(this.$route.params.levelId)
        .get()
        .then(doc => {
          this.positionName = doc.data().name;
        });
      this.loadDataLesson();
    },
    loadDataLesson() {
      this.isSnap = db
        .collection("unit")
        .where("levelId", "==", this.$route.params.levelId)
        .onSnapshot(doc => {
          let temp = [];
          doc.forEach(element => {
            let dataLesson = {
              levelId: element.data().levelId,
              name: element.data().name,
              order: element.data().order,
              status: element.data().status,
              unitId: element.id
            };

            temp.push(dataLesson);
          });
          temp.sort((a, b) => {
            return a.order - b.order;
          });
          this.lessonList = temp;
        });
    },
    okDelete() {
      this.dialogDeleteNull = false;
    },
    cancelDelete() {
      this.dialogDelete = false;
    },
    deleteLesson() {
      db.collection("unit")
        .doc(this.dataDelete.unitId)
        .delete()
        .then(() => {
          this.dialogDelete = false;
          this.deleted = true;
          setTimeout(() => {
            this.deleted = false;
          }, 1000);
        });
    }
  },
  beforeDestroy() {
    this.isSnap();
  },
  mounted() {
    this.loadNamePosition();
  }
};
</script>

<style >
</style>