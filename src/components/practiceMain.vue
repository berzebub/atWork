<template>
  <div class="container">
    <div class="text-h6" align="center">
      <span>อาหารและเครื่องดื่ม</span>
      <br />
      <span>1. จองโต๊ะ</span>
    </div>
    <!-- หน้าหลัก -->
    <div v-if="isShowPractice" align="center">
      <!-- ปุ่มเพิ่มแบบฝึกหัด -->
      <div class="q-pa-md">
        <q-btn
          @click="addPractice()"
          style="width:190px"
          dense
          color="blue-grey-10"
          label="เพิ่มแบบฝึกหัด"
        />
      </div>
      <!-- การ์ดแบบฝึกหัด -->
      <div class="q-mb-md rounded-border" style="border: 1px solid #263238; border-radius: 5px">
        <div class="bg-blue-grey-10 text-white q-pa-sm row" align="left">
          <div class="col self-center">รหัสลำดับ 1000</div>
          <div class="col-1" align="right">
            <!-- ปุ่ม สามจุด -->
            <div class="col-1" align="right">
              <q-btn round size="sm" color="blue-grey-10" icon="fas fa-ellipsis-v">
                <q-menu auto-close :offset="[5, 10]" content-class="shadow-3">
                  <q-list style="min-width: 100px">
                    <q-item clickable @click="editPractice()">
                      <q-item-section>แก้ไขข้อมูล</q-item-section>
                    </q-item>
                    <q-item clickable @click="deletePractice()">
                      <q-item-section>ลบข้อมูล</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col q-pa-sm" align="left">การ์ดคำศัพท์</div>
          <div class="row" :class="$q.platform.is.desktop ? 'col-2':'col-4'" align="center">
            <div class="col">
              <q-btn round color="blue-grey-10" icon="fas fa-sync-alt" />
            </div>
            <div class="col">
              <q-btn round color="blue-grey-10" icon="fas fa-pencil-alt" />
            </div>
          </div>
        </div>
      </div>

      <div style="border: 1px solid #263238; border-radius: 5px">
        <div class="bg-blue-grey-10 text-white q-pa-sm row" align="left">
          <div class="col self-center">รหัสลำดับ 2000</div>
          <!-- ปุ่ม สามจุด -->
          <div class="col-1" align="right">
            <q-btn round size="sm" color="blue-grey-10" icon="fas fa-ellipsis-v">
              <q-menu :offset="[5, 10]" auto-close content-class="shadow-3">
                <q-list style="min-width: 100px">
                  <q-item clickable @click="editPractice()">
                    <q-item-section>แก้ไข</q-item-section>
                  </q-item>
                  <q-item clickable @click="deletePractice()">
                    <q-item-section>ลบ</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col q-pa-sm" align="left">การ์ดคำศัพท์</div>

          <div class="row" :class="$q.platform.is.desktop ? 'col-2':'col-4'" align="center">
            <div class="col">
              <q-btn round color="blue-grey-10" icon="fas fa-sync-alt" />
            </div>
            <div class="col">
              <q-btn round color="blue-grey-10" icon="fas fa-pencil-alt" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- หน้าเพิ่ม -->
    <div class="q-py-md" v-if="!isShowPractice">
      <div>รหัสลำดับ</div>
      <div>
        <q-input color="blue-grey-10" outlined v-model.number="data.order" type="number" />
      </div>
      <div class="q-pt-md">ชื่อแบบฝึกหัด</div>
      <div>
        <q-radio
          v-model="data.practiceType"
          color="blue-grey-10"
          keep-color
          val="flashcard"
          label="การ์ดคำศัพท์"
        ></q-radio>
      </div>
      <div>
        <q-radio
          v-model="data.practiceType"
          color="blue-grey-10"
          keep-color
          val="multipleChoice"
          label="เลือกคำตอบ"
        ></q-radio>
      </div>
      <div>
        <q-radio
          v-model="data.practiceType"
          color="blue-grey-10"
          keep-color
          val="expression"
          label="ประโยคสนทนา"
        ></q-radio>
      </div>
      <div>
        <q-radio
          v-model="data.practiceType"
          color="blue-grey-10"
          keep-color
          val="vdo"
          label="บทสนทนา"
        ></q-radio>
      </div>
      <div class="row q-pa-sm">
        <div class="col q-px-sm" align="right">
          <q-btn
            class="boxbtn"
            outline
            style="color: blue-grey-10;"
            label="ยกเลิก"
            @click="cancelPractice()"
          ></q-btn>
        </div>
        <div class="col q-px-sm">
          <q-btn class="boxbtn bg-blue-grey-10 text-white" label="บันทึก" @click="checkOrder()"></q-btn>
        </div>
      </div>
    </div>

    <!-- dialog delete  -->
    <q-dialog v-model="dialogDelete" persistent>
      <q-card class="q-pa-md" style="width: 300px;" align="center">
        <!-- <q-card-section>
          <div class="text-h6">Small</div>
        </q-card-section>-->

        <div class="q-py-lg">ต้องการลบ " 1000-ชื่อแบบฝึกหัด " หรือไม่</div>

        <div class="row">
          <div class="col">
            <q-btn
              outline
              style="width:120px; color: blue-grey-10;"
              color
              label="ยกเลิก"
              v-close-popup
            />
          </div>
          <div class="col">
            <q-btn style="width:120px" color="blue-grey-10" label="ยืนยัน" v-close-popup />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "../router";
import flashcardMainVue from "../pages/flashcardMain.vue";
export default {
  data() {
    return {
      isShowPractice: true,
      dialogDelete: false,
      data: {
        order: "",
        practiceType: "flashcard",
        levelId: "",
        unitId: ""
      }
    };
  },
  methods: {
    addPractice() {
      // เพิ่มแบบฝึกหัด
      this.isShowPractice = false;
    },
    editPractice() {
      // แก้ไขแบบฝึกหัด แก้ได้เฉพาะรหัสลำดับ
      this.isShowPractice = false;
    },
    cancelPractice() {
      // ยกเลิกการแก้ไขแบบฝึกหัด
      this.isShowPractice = true;
    },
    deletePractice() {
      this.dialogDelete = true;
      //  db.collection("practiceList")
      //   .doc(this.deleteKey)
      //   .delete()
      //   .then(() => {
      //     this.loadDataAll();
      //     this.text = "ลบข้อมูลเรียบร้อย";
      //     this.deleteDialog = false;
      //     this.finishDialog = true;
      //   });
    },
    saveBtn() {
      console.log("บันทึก");
      db.collection("practice_list")
        .add(this.data)
        .then(doc => {
          console.log("เรียบร้อย");
        });
    },
    checkOrder() {
      this.data.order;
      db.collection("practice_list")
        .get()
        .then(doc => {
          console.log(doc.id);
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>