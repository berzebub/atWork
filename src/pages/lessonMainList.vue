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
                <div class="row q-px-md">
                  <div class="col-10">
                    <span class="text-black text-subtitle1">การใช้งาน</span>

                    <q-toggle
                      class="text-blue-grey-10"
                      @input="statusLevel(item)"
                      v-model="item.status"
                      color="secondary"
                    />
                  </div>
                  <div class="col self-center" align="right">
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
                            <q-item-section @click="deletePositionBtn(item)">ลบ</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
                <q-separator class="bg-blue-grey-10" />
                <!-- ปุ่มเพิ่มบทเรียน -->

                <div v-show="showLessonList == 0 " align="center" class="q-py-lg">
                  <div @click="addLesson(item) " class="text-blue-grey-10">
                    <u>เพิ่มบทเรียน</u>
                  </div>
                </div>
                <!-- เนื้อหาบทเรียน  -->
                <div class="row" v-for="(item2,index2) in showLessonList " :key="index2">
                  <q-separator />
                  <div
                    class="text-blue-grey-10 q-pa-md text-subtitle1 col-9"
                  >{{item2.order}} - {{item2.name}}</div>

                  <div v-show="item2.status != true" class="col q-py-md" align="right">
                    <q-icon size="16px" name="fas fa-power-off" dense color="negative" flat></q-icon>
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
        <div class="text-subtitle1 q-mt-md">
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
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
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
      deleted: false
    };
  },
  methods: {
    addPosition() {
      this.$router.push("lessonInput");
    },
    editPositionBtn(levelId) {
      this.$router.push("lessonEdit/" + levelId.levelId);
    },
    addLesson(levelId) {
      this.$router.push("lessonUnitList/" + levelId.levelId);
    },
    editLessonBtn(item) {
      this.$router.push("lessonUnitlist/" + item.levelId);
    },

    deletePositionBtn(data) {
      this.namePosition = data.name;
      console.log(data);

      db.collection("practice_server")
        .where("levelId", "==", data.levelId)
        .get()
        .then(doc => {
          if (doc.size > 0) {
            //  กรณีมีข้อมูลในแบบฝึกหัด ขึ้นแจ้งเตือน ให้ลบ
            this.dialogNoDelete = true;
          } else {
            //  กรณีไม่มีข้อมูลในแบบฝึกหัด ขึ้นแจ้งเตือน ไม่ให้ลบ
            this.dataDelete = data;
            this.dialogDelete = true;
          }
        });
    },

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

        this.loadDataLesson();
      });
    },
    loadDataLesson() {
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
    showLesson(levelId) {
      this.showLessonList = this.lessonList.filter(x => x.levelId == levelId);
    },
    okDelete() {
      this.dialogNoDelete = false;
    },
    cancelDelete() {
      this.dialogDelete = false;
    },
    deletePosition() {
      console.log(this.dataDelete.levelId);
      db.collection("level")
        .doc(this.dataDelete.levelId)
        .delete()
        .then(() => {
          this.dialogDelete = false;
          this.deleted = true;
          setTimeout(() => {
            this.deleted = false;
          }, 1000);
        });
    },
    statusLevel(data) {
      db.collection("level")
        .doc(data.levelId)
        .update({
          status: data.status
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