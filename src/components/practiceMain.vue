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
          <div class="col">รหัสลำดับ 1000</div>
          <div class="col-1" align="right">
            <!-- ปุ่ม สามจุด -->
            <div class="col-1" align="right">
              <q-btn round size="sm" color="blue-grey-10" icon="fas fa-ellipsis-v">
                <q-menu auto-close>
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>แก้ไขข้อมูล</q-item-section>
                    </q-item>
                    <q-item clickable>
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
          <div class="col">รหัสลำดับ 2000</div>
          <!-- ปุ่ม สามจุด -->
          <div class="col-1" align="right">
            <q-btn round size="sm" color="blue-grey-10" icon="fas fa-ellipsis-v">
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable @click="editPractice()">
                    <q-item-section>แก้ไขข้อมูล</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>ลบข้อมูล</q-item-section>
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
        <q-input outlined v-model="order"></q-input>
      </div>
      <div class="q-pt-md">ชื่อแบบฝึกหัด</div>
      <div>
        <q-radio
          v-model="namePractice"
          color="blue-grey-10"
          keep-color
          val="flashcard"
          label="การ์ดคำศัพท์"
        ></q-radio>
      </div>
      <div>
        <q-radio
          v-model="namePractice"
          color="blue-grey-10"
          keep-color
          val="multipleChoice"
          label="เลือกคำตอบ"
        ></q-radio>
      </div>
      <div>
        <q-radio
          v-model="namePractice"
          color="blue-grey-10"
          keep-color
          val="expression"
          label="ประโยคสนทนา"
        ></q-radio>
      </div>
      <div>
        <q-radio v-model="namePractice" color="blue-grey-10" keep-color val="vdo" label="บทสนทนา"></q-radio>
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
          <q-btn class="boxbtn bg-blue-grey-10 text-white" label="บันทึก"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router";
import flashcardMainVue from "../pages/flashcardMain.vue";
export default {
  data() {
    return {
      isShowPractice: true,
      namePractice: "",
      order: ""
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
      this.isShowPractice = true;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>