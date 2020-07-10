<template>
  <q-page>
    <!-- หน้าแสดงข้อมูล -->
    <div>
      <div class="q-pa-md" align="center">
        <q-btn
          @click="addPosition()"
          style="width:190px"
          dense
          color="blue-grey-10"
          class="text-subtitle1"
          label="เพิ่มตำแหน่ง"
        />
      </div>
      <!-- list -->
      <div
        class="shadow-1 bg-blue-grey-10"
        style="border-radius: 10px"
        v-for="(item,index) in dataPosition "
        :key="index"
      >
        <q-list class="rounded-borders q-mt-sm box-main" style="border-radius: 10px">
          <q-expansion-item
            group="level"
            @click="showLesson(item.levelId)"
            class="text-white text-subtitle1"
            :label="item.name"
          >
            <q-card style="border-bottom-left-radius: 10px ; border-bottom-right-radius:10px">
              <div class="relative-position cursor-pointer" v-ripple>
                <div class="row items-center q-px-md">
                  <div class="col-lg-8 col-xs-10">
                    <span class="text-black text-subtitle1">การใช้งาน</span>

                    <q-toggle
                      class="text-blue-grey-10"
                      @input="statusLevel(item)"
                      v-model="item.status"
                      color="secondary"
                    />
                  </div>
                  <!-- เมนู mobile -->
                  <div class="col self-center mobile-only" align="right">
                    <q-btn
                      size="13px"
                      icon="fas fa-ellipsis-v"
                      round
                      dense
                      color="blue-grey-10"
                      flat
                    >
                      <q-menu>
                        <q-list style="min-width: 144px">
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editPositionBtn(item)">แก้ไขตำแหน่ง</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editLessonBtn(item)">แก้ไขบทเรียน</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="deletePositionBtn(item)">ลบตำแหน่ง</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                  <!-- menu desktop -->
                  <div class="col desktop-only">
                    <div class="row justify-between text-blue-grey-10">
                      <div @click="deletePositionBtn(item)">
                        <u>ลบตำแหน่ง</u>
                      </div>
                      <div @click="editPositionBtnPc(item)">
                        <u>แก้ไขตำแหน่ง</u>
                      </div>
                      <div @click="addLessonBtnPc(item)">
                        <u>เพิ่มบทเรียน</u>
                      </div>
                    </div>
                  </div>
                </div>
                <q-separator class="bg-blue-grey-10" />
                <!-- ปุ่มเพิ่มบทเรียน mobile-->

                <div v-show="showLessonList == 0 " align="center" class="q-py-lg mobile-only">
                  <div @click="addLesson(item) " class="text-blue-grey-10">
                    <u>เพิ่มบทเรียน</u>
                  </div>
                </div>
                <!-- ปุ่มเพิ่มบทเรียน desktop -->

                <div v-show="showLessonList == 0 " align="center" class="q-py-lg desktop-only">
                  <div class="text-blue-grey-10">กรุณาเพิ่มบทเรียน</div>
                </div>

                <!-- เนื้อหาบทเรียน  -->
                <div
                  class="row items-center"
                  v-for="(item2,index2) in showLessonList "
                  :key="index2"
                >
                  <q-separator />
                  <div
                    class="text-blue-grey-10 q-pl-md text-subtitle1 col-9"
                  >{{item2.order}} - {{item2.name}}</div>
                  <!-- mobile -->
                  <div
                    :style="item2.status == true?'visibility:hidden':null"
                    class="col mobile-only q-py-md q-pr-lg"
                    align="right"
                  >
                    <q-icon size="16px" name="fas fa-power-off" dense color="negative" flat></q-icon>
                  </div>
                  <!-- desktop -->
                  <div class="col desktop-only q-py-md q-pr-lg" align="right">
                    <div class="row justify-between items-center">
                      <div :style="item2.status == true?'visibility:hidden':null">
                        <q-btn
                          class="q-px-sm"
                          dense
                          outline
                          color="blue-grey-6"
                          disable
                          label="ปิดการใช้การ"
                        />
                      </div>
                      <div>
                        <q-btn
                          size="15px"
                          flat
                          round
                          @click="deleteLessonBtnPc(item2) "
                          color="blue-grey-10"
                          icon="far fa-trash-alt"
                        />
                      </div>
                      <div>
                        <q-btn
                          @click="editLessonBtnPc(item2) "
                          size="15px"
                          flat
                          round
                          color="blue-grey-10"
                          icon="far fa-edit"
                        />
                      </div>
                    </div>
                  </div>

                  <q-separator />
                </div>
              </div>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>

    <!-- dialog การไม่ให้ลบ -->
    <q-dialog v-model="dialogNoDelete">
      <div
        class="bg-white row justify-center items-center q-py-md"
        style="width:323px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md col-12">
          ต้องการลบบทเรียนภายในบทเรียน
          <br />
          "{{namePosition}}"
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
        <div class="text-subtitle1 q-mt-md col-12">
          คุณต้องการลบตำแหน่ง
          <br />
          "{{namePosition}}"
        </div>

        <div class="col-6 q-pr-sm" align="right">
          <q-btn @click="cancelDelete()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm" align="left">
          <q-btn
            @click="deletePosition()"
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
    <!-- dialog เพิ่มบทเรียน -->
    <q-dialog v-model="dialogLesson" class="desktop-only">
      <div class="bg-white row q-pb-lg" style="width:330px ;border-radius: 10px">
        <div
          align="center"
          style="width:330px"
          class="text-h6 bg-blue-grey-10 text-white q-py-md"
        >เพิ่มบทเรียน</div>
        <div class="text-subtitle1 col-12 q-px-md q-pt-md" align="letf">
          <span>รหัสลำดับ</span>
          <span class="text-grey-5 text-body2 q-pl-sm">ตัวเลข 3 หลัก</span>
        </div>
        <div style="width:300px" class="q-mx-md">
          <q-input
            ref="order"
            dense
            mask="###"
            outlined
            v-model.number="dataLesson.order"
            :error="errorOrder  "
            :error-message="errorOrderMsg"
            @keyup="errorOrder=false"
          ></q-input>
        </div>
        <span class="text-subtitle1 q-pt-sm q-mx-md">ชื่อบทเรียน</span>
        <div style="width:300px" class="q-mx-md">
          <q-input
            ref="name"
            dense
            outlined
            v-model="dataLesson.name"
            :error="errorLesson"
            :error-message="errorNameMsg"
            @keyup="errorLesson=false"
          ></q-input>
        </div>
        <div class="col-12 q- q-px-md">
          <span class="text-black text-subtitle1">การใช้งานบทเรียน</span>

          <q-toggle v-model="dataLesson.status" color="secondary" />
        </div>
        <div class="col-6 q-pr-sm q-pt-md" align="right">
          <q-btn @click="cancelAddLessonPc()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-pt-md">
          <q-btn
            @click="saveLessonPc()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="บันทึก"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog บันทึกสำเร็จ -->
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
    <!-- dialog เพิ่มตำแหน่ง -->
    <q-dialog v-model="dialogAddPosition" class="desktop-only">
      <div class="bg-white row q-pb-lg" style="width:400px ;border-radius: 10px">
        <div
          align="center"
          style="width:400px"
          class="text-h6 bg-blue-grey-10 text-white q-py-md"
        >เพิ่มตำแหน่ง</div>

        <div style="width:362px" class="q-mx-md q-py-lg">
          <div class="text-subtitle1">ชื่อตำแหน่ง</div>
          <div>
            <q-input
              ref="namePosition"
              dense
              outlined
              v-model="dataPositionPc.name"
              :error="errorNamePosition"
              :error-message="errorNamePositionMessage"
              @keyup="errorNamePosition=false"
            ></q-input>
          </div>
        </div>

        <div class="col-6 q-pr-sm q-py-md" align="right">
          <q-btn @click="cancelAddPositionPc()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-py-md">
          <q-btn
            @click="savePositionPc()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog lesson ยืนยันการลบ -->
    <q-dialog v-model="dialogNoDeleteLesson">
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
    <!-- dialog lesson ยืนยันการลบ -->
    <q-dialog v-model="deleteLesson">
      <div
        class="bg-white row justify-center items-center"
        style="width:323px;height:200px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md col-12">
          คุณต้องการลบบทเรียน
          <br />
          "{{nameLesson}}"
        </div>

        <div class="col-6 q-pr-sm" align="right">
          <q-btn @click="cancelDeleteLesson()" dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm" align="left">
          <q-btn
            @click="deleteLessonBtn()"
            dense
            color="blue-grey-10"
            style="width:120px"
            label="ยืนยัน"
          ></q-btn>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      // mobile
      text: "",
      model: 1,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      status: false,
      deleteDialog: "",
      dialogNoDelete: false,
      dialogDelete: false,

      dataPosition: [],
      lessonList: "",
      showLessonList: "",
      isSnap: "",
      namePosition: "",
      dataDelete: "",
      deleted: false,
      // desktop
      dialogLesson: false,
      dataLesson: {
        order: "",
        name: "",
        status: false,
        levelId: this.$route.params.levelId
      },
      errorOrder: false,
      errorLesson: false,
      editId: "",
      orderOld: "",
      savedDataDialog: false,
      dialogAddPosition: false,
      dataPositionPc: { name: "", status: false },
      errorNamePosition: false,
      nameOld: "",
      editPositionMode: false,
      nameLesson: "",
      dialogNoDeleteLesson: false,
      deleteLesson: false,
      dataDeleteLessson: "",
      editLessonMode: false,
      errorOrderMsg: "",
      errorNameMsg: "",
      errorNamePositionMessage: ""
    };
  },
  methods: {
    // ********************************** mobile **********************************
    // ปุ่มเพิ่มตำแหน่ง
    addPosition() {
      if (this.$q.platform.is.desktop) {
        this.editPositionMode = false;
        this.dialogAddPosition = true;
        this.dataPositionPc.name = "";
      } else {
        this.$router.push("lessonInput");
      }
    },
    // ปุ่มแก้ไขตำแหน่ง mobile
    editPositionBtn(levelId) {
      this.$router.push("lessonEdit/" + levelId.levelId);
    },

    // ปุ่มเพิ่มบทเรียน mobile

    addLesson(levelId) {
      this.$router.push("lessonUnitList/" + levelId.levelId);
    }, // ปุ่มแก้ไขบทเรียน mobile
    editLessonBtn(item) {
      this.$router.push("lessonUnitList/" + item.levelId);
    },
    // ปุ่มลบตำแหน่ง
    deletePositionBtn(data) {
      this.namePosition = data.name;
      // console.log(data);

      db.collection("practice_server")
        .where("levelId", "==", data.levelId)
        .get()
        .then(doc => {
          if (doc.size > 0) {
            //  กรณีมีข้อมูลในแบบฝึกหัด ขึ้นแจ้งเตือน ให้ลบ
            this.dialogNoDelete = true;
          } else {
            console.log(doc.size);
            //  กรณีไม่มีข้อมูลในแบบฝึกหัด ขึ้นแจ้งเตือน ไม่ให้ลบ
            this.dataDelete = data;
            this.dialogDelete = true;
          }
        });
    },
    // โหลดข้อมูลตำแหน่งออกมาโชว์
    loadDataPosition() {
      db.collection("level").onSnapshot(doc => {
        this.dataPosition = [];
        doc.forEach(element => {
          let showData = {
            levelId: element.id,
            name: element.data().name,
            status: element.data().status
          };
          this.dataPosition.push(showData);
          this.dataPosition.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
        });
        this.lessonList = [];
        this.loadDataLesson();
      });
    },
    // โหลดข้อมูลบทเรียน
    loadDataLesson() {
      this.lessonList = [];
      this.isSnap = db
        .collection("unit")

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
    // ฟังชั่นแยกบทเรียนออกมาโชว์ให้ตรงกับตำแหน่งของตัวเอง
    showLesson(levelId) {
      this.showLessonList = this.lessonList.filter(x => x.levelId == levelId);
    },
    // ปุ่มตกลง หน้า dialog ลบตำแหน่งที่มีข้อมูลบทเรียนอยู่
    okDelete() {
      this.dialogNoDelete = false;
    },
    // ปุ่มยกเลิก หน้า dialog ลบตำแหน่งที่มีไม่ข้อมูลบทเรียน
    cancelDelete() {
      this.dialogDelete = false;
    },
    // ปุ่มตกลง หน้า dialog ลบตำแหน่งที่มีไม่ข้อมูลบทเรียน

    deletePosition() {
      console.log(this.dataDelete.levelId);
      db.collection("level")
        .doc(this.dataDelete.levelId)
        .delete()
        .then(() => {
          this.dialogDelete = false;
          this.deleted = true;
          this.loadDataPosition();
          setTimeout(() => {
            this.deleted = false;
          }, 1000);
          this.showLesson();
        });
    },
    // ฟังชั่นอัปเดตสถานะของตำแหน่ง
    statusLevel(data) {
      db.collection("level")
        .doc(data.levelId)
        .update({
          status: data.status
        });
    },
    // *************************************** desktop ***********************************
    // ปุ่มยกเลิก dialog เพิ่มบทเรียน ของ pc
    cancelAddLessonPc() {
      this.dialogLesson = false;
      this.editId = "";
    }, // ปุ่มแก้ไขบทเรียน pc
    addLessonBtnPc(data) {
      (this.dataLesson = {
        order: "",
        name: "",
        status: false,
        levelId: data.levelId
      }),
        (this.errorOrder = false),
        (this.errorLesson = false),
        (this.dialogLesson = true);
    }, // ปุ่มแก้ไขตำแหน่ง pc
    editPositionBtnPc(data) {
      this.dataPositionPc = { ...data };
      this.editPositionMode = true;
      this.dialogAddPosition = true;
    },
    // ปุ่มบันทึก dialog เพิ่มบทเรียน ของ pc

    async saveLessonPc() {
      if (this.dataLesson.order == "" || this.dataLesson.name == "") {
        console.log("เช็ค input ว่าง");
        if (this.dataLesson.order == "") {
          this.errorOrder = true;
        }
        if (this.dataLesson.name == "") {
          this.errorLesson = true;
        }
        return;
      }

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
        if (checkName || checkOrder) {
          if (checkOrder) {
            this.errorOrderMsg = "รหัสลำดับนี้มีผู้ใช้งานแล้ว";
            this.errorOrder = true;
          }
          if (checkName) {
            this.errorNameMsg = "ชื่อนี้มีผู้ใช้งานแล้ว";
            this.errorLesson = true;
          }
          return;
        }
      }

      this.loadingShow();
      if (this.editId != "") {
        console.log("save edit");
        db.collection("unit")
          .doc(this.editId)
          .update(this.dataLesson)
          .then(() => {
            this.editId = "";
            this.loadingHide();
            this.dialogLesson = false;
            this.savedDataDialog = false;
            this.showLesson(this.dataLesson.levelId);
          });
      } else {
        console.log("save add");
        db.collection("unit")
          .add(this.dataLesson)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;

            setTimeout(() => {
              this.dialogLesson = false;
              this.savedDataDialog = false;
            }, 1000);
            this.showLesson(this.dataLesson.levelId);
          });
      }
    },

    // เช็คชื่อซ้ำ
    async isCheckName(val) {
      console.log(val);
      let doc = await db
        .collection("unit")
        .where("name", "==", val)
        .where("levelId", "==", this.dataLesson.levelId)
        .get();
      return doc.size ? true : false;
    },
    // เช็ครหัสลำดับซ้ำ
    async isCheckOrder(val) {
      let doc = await db
        .collection("unit")
        .where("order", "==", val)
        .where("levelId", "==", this.dataLesson.levelId)
        .get();

      return doc.size ? true : false;
    }, // แก้ไขบทเรียน
    editLessonBtnPc(data) {
      this.editLessonMode = true;
      // console.log(data);
      let coppyData = { ...data };
      this.dialogLesson = true;
      this.dataLesson = coppyData;
      this.editId = data.unitId;
      this.orderOld = coppyData.order;
      this.nameOld = coppyData.name;
    },
    cancelAddPositionPc() {
      this.dialogAddPosition = false;
    },
    async savePositionPc() {
      if (this.dataPositionPc.name == "") {
        this.errorNamePosition = true;
        return;
      }
      if (this.nameOld != this.dataPositionPc.name) {
        let checkName = false;
        checkName = await this.isCheckName(this.dataPositionPc.name);

        this.errorNamePosition = false;

        if (checkName) {
          this.errorNamePositio;
          this.errorNamePositionMessage = "ชื่อนี้มีตำแหน่งแล้ว";
          n = true;
          return;
        }
      }
      this.loadingShow();
      if (this.editPositionMode == true) {
        console.log("edit");
        db.collection("level")
          .doc(this.dataPositionPc.levelId)
          .update(this.dataPositionPc)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;
            setTimeout(() => {
              this.dialogAddPosition = false;
              this.savedDataDialog = false;
            }, 1000);
          });
      } else {
        console.log("add");
        db.collection("level")
          .add(this.dataPositionPc)
          .then(() => {
            this.loadingHide();
            this.savedDataDialog = true;
            setTimeout(() => {
              this.dialogAddPosition = false;
              this.savedDataDialog = false;
            }, 1000);
          });
      }
    },
    async isCheckName(val) {
      let doc = await db
        .collection("unit")
        .where("name", "==", val)
        .get();
      return doc.size ? true : false;
    },
    // dialog ลบบทเรียน
    deleteLessonBtnPc(data) {
      this.nameLesson = data.name;

      // console.log(data);
      db.collection("practice_server")
        .where("levelId", "==", data.levelId)
        .where("unitId", "==", data.unitId)
        .get()
        .then(doc => {
          console.log(doc.size);
          if (doc.size > 0) {
            this.dialogNoDeleteLesson = true;
          } else {
            this.dataDeleteLessson = data;
            this.deleteLesson = true;
          }
        });
    },
    // ยกเลิก dialog ลบบทเรียน
    cancelDeleteLesson() {
      this.deleteLesson = false;
    },
    // ลบ lesson
    deleteLessonBtn() {
      db.collection("unit")
        .doc(this.dataDeleteLessson.unitId)
        .delete()
        .then(() => {
          this.deleteLesson = false;
          this.deleted = true;
          setTimeout(() => {
            this.deleted = false;
          }, 1000);
          this.showLesson();
        });
    }
  },
  mounted() {
    this.loadDataPosition();
    console.log(this.$q.platform.is.desktop);
  }
};
</script>


<style >
.box-main {
  border: 1px solid #263238;
}
</style>