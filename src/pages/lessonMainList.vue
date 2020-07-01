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
      <div class="shadow-1 bg-blue-grey-10" v-for="(item,index) in dataPosition " :key="index">
        <q-list class="rounded-borders">
          <q-expansion-item
            group="level"
            @click="showLesson(item.levelId)"
            style="border-radius: 5px"
            class="text-white text-subtitle1"
            :label="item.name"
          >
            <q-card>
              <div class="q-px-md q-py-sm relative-position cursor-pointer" v-ripple>
                <div class="row">
                  <div class="col-10">
                    <span class="text-black text-subtitle1">การใช้งานตำแหน่ง</span>

                    <q-toggle v-model="status" color="secondary" />
                  </div>
                  <div class="col" align="right">
                    <q-btn
                      size="13px"
                      icon="fas fa-ellipsis-v"
                      round
                      dense
                      color="blue-grey-10"
                      flat
                    >
                      <q-menu>
                        <q-list style="min-width: 170px">
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editPositionBtn(item)">แก้ไขระดับการเรียน</q-item-section>
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
                <q-separator />
                <!-- ปุ่มเพิ่มบทเรียน -->

                <div align="center" class="q-py-lg">
                  <div @click="addLesson(item) " class="text-blue-grey-10">
                    <u>เพิ่มบทเรียน</u>
                  </div>
                </div>
                <!-- เนื้อหาบทเรียน  -->
                <div class="row" v-for="(item2,index2) in showLessonList " :key="index2">
                  <q-separator />
                  <div
                    class="bg-white text-blue-grey-10 q-pa-md text-subtitle1 col-9"
                  >{{item2.order}} - {{item2.name}}</div>

                  <div v-show="item2.status != true" class="col q-py-md bg-white" align="right">
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
    <!-- dialog ยืนยันการลบ -->
    <q-dialog v-model="dialogDelete">
      <div
        class="bg-white row justify-center items-center"
        style="width:323px;height:200px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md">
          กรูณาพิมพ์ "ดำเนินการ "
          <br />เพื่อลบตำแหน่ง
        </div>
        <div style="width:300px">
          <q-input dense outlined v-model="deleteDialog"></q-input>
        </div>
        <div class="col-6">
          <q-btn dense style="width:120px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6">
          <q-btn dense color="blue-grey-10" style="width:120px" label="ยืนยัน"></q-btn>
        </div>
      </div>
    </q-dialog>
    <!-- dialog ไม่สามารถลบได้ -->
    <q-dialog v-model="dialogDelete2">
      <div
        class="bg-white row justify-center items-center"
        style="width:323px;height:200px"
        align="center"
      >
        <div class="text-subtitle1 q-mt-md">
          ไม่สามารถลบตำแหน่งนี้ได้ มีแบบฝึกหัดใช้งาน
          <br />ตำแหน่ง "xxxxxxxx" อยู่
        </div>

        <div class="q-mb-md">
          <q-btn dense color="blue-grey-10" style="width:120px" label="ตกลง"></q-btn>
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
      dialogDelete: false,
      dialogDelete2: false,

      dataPosition: [],
      lessonList: "",
      showLessonList: "",
      isSnap: ""
    };
  },
  methods: {
    addPosition() {
      this.$router.push("lessonInput");
    },
    editPositionBtn() {},
    addLesson(levelId) {
      this.$router.push("lessonUnitList/" + levelId.levelId);
    },
    editLessonBtn(item) {
      this.$router.push("lessonUnitlist/" + item.levelId);
    },

    deletePositionBtn() {},

    loadDataPosition() {
      db.collection("level").onSnapshot(doc => {
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
          console.log(temp);
          this.lessonList = temp;
        });
    },
    showLesson(levelId) {
      console.log(levelId);
      this.showLessonList = this.lessonList.filter(x => x.levelId == levelId);
    }
  },
  mounted() {
    this.loadDataPosition();
    console.log(this.$q.platform.is.desktop);
  }
};
</script>


<style lang="scss" scoped>
</style>