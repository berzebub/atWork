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
          label="เพิ่ม"
        />
      </div>
      <!-- list -->
      <div class="shadow-1 bg-blue-grey-10" v-for="(item,index) in dataPosition ">
        <q-list class="rounded-borders">
          <q-expansion-item
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
                            <q-item-section @click="editBtn(item2)">แก้ไขระดับการเรียน</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editBtn(item2)">แก้ไขบทเรียน</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="deleteBtn(item2)">ลบ</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
                <q-separator />
                <!-- ปุ่มเพิ่มบทเรียน -->

                <div align="center" class="q-py-lg">
                  <q-btn
                    label="เพิ่มบทเรียน"
                    @click="addLesson()"
                    class="bg-blue-grey-6"
                    style="width:190px"
                  ></q-btn>
                </div>
                <!-- เนื้อหาบทเรียน  -->
                <div class="text-blue-grey-10">100 - จองโต๊ะ</div>
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
    <!-- dialog เพิ่มบทเรียน -->
    <q-dialog v-model="dialogLesson">
      <div class="bg-white row q-pa-md" style="width:330px">
        <div class="text-subtitle1 col-12" align="letf">รหัสลำดับ</div>
        <div style="width:300px">
          <q-input dense outlined v-model="dataLesson.order"></q-input>
        </div>
        <span class="text-subtitle1 q-pt-sm">ชื่อบทเรียน</span>
        <div style="width:300px">
          <q-input dense outlined v-model="dataLesson.nameLesson"></q-input>
        </div>
        <div class="col-12 q-pt-md">
          <span class="text-black text-subtitle1">การใช้งานบทเรียน</span>

          <q-toggle v-model="dataLesson.statusLesson" color="secondary" />
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
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      dataLesson: { order: "", nameLesson: "", statusLesson: false },
      text: "",
      model: 1,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      status: false,
      deleteDialog: "",
      dialogDelete: false,
      dialogDelete2: false,
      dialogLesson: false,
      dataPosition: []
    };
  },
  methods: {
    addPosition() {
      this.$router.push("lessonInput");
    },
    addLesson() {
      this.dialogLesson = true;
    },
    cancelAddLesson() {
      this.dialogLesson = false;
    },
    saveLesson() {
      db.collection("unit")
        .add(this.dataLesson)
        .then(() => {});
    },
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
      });
    }
  },
  mounted() {
    this.loadDataPosition();
  }
};
</script>

<style lang="scss" scoped>
</style>