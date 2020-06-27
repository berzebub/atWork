<template>
  <div class="container">
    <div class="text-h6" align="center">
      <span>{{levelName}}</span>
      <br />
      <span>{{num}}. {{unitName}}</span>
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
      <div
        v-for="(itemPrac, index) in practiceListShow"
        class="q-mb-md rounded-border"
        style="border: 1px solid #263238; border-radius: 5px"
      >
        <div class="bg-blue-grey-10 text-white q-pa-sm row" align="left">
          <div class="col self-center">รหัสลำดับ {{itemPrac.order}}</div>
          <div class="col-1" align="right">
            <!-- ปุ่ม สามจุด -->
            <div class="col-1" align="right">
              <q-btn round size="sm" color="blue-grey-10" icon="fas fa-ellipsis-v">
                <q-menu auto-close :offset="[5, 10]" content-class="shadow-3">
                  <q-list style="min-width: 100px">
                    <q-item clickable @click="editPractice(itemPrac)">
                      <q-item-section>แก้ไขรหัสลำดับ</q-item-section>
                    </q-item>
                    <q-item clickable @click="deletePractice(itemPrac.practiceId)">
                      <q-item-section>ลบ</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col q-pa-sm" align="left">{{itemPrac.practiceType}}</div>
          <div class="row" :class="$q.platform.is.desktop ? 'col-2':'col-4'" align="center">
            <div class="col">
              <q-btn round color="blue-grey-10" icon="fas fa-sync-alt" />
            </div>
            <div class="col">
              <q-btn
                round
                color="blue-grey-10"
                icon="fas fa-pencil-alt"
                @click="gotoPractice(itemPrac)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- หน้าเพิ่ม -->
    <div class="q-py-md" v-if="!isShowPractice">
      <div>รหัสลำดับ</div>
      <div>
        <q-input
          color="blue-grey-10"
          outlined
          v-model.number="data.order"
          type="number"
          :rules="[value => !!value ]"
          ref="order"
        />
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
          <q-btn class="boxbtn bg-blue-grey-10 text-white" label="บันทึก" @click="saveBtn()"></q-btn>
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

    <!-- dialog success -->
    <q-dialog v-model="dialogSuccess">
      <q-card style="min-width: 350px; height:170px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "../router";
import flashcardMainVue from "../pages/flashcardMain.vue";
export default {
  props: ["levelId", "unitId", "num", "levelName", "unitName"],
  data() {
    return {
      isShowPractice: true,
      isEditMode: false,
      dialogDelete: false,
      dialogSuccess: false,
      data: {
        order: "",
        practiceType: "flashcard",
        levelId: this.levelId,
        unitId: this.unitId
      },
      practiceListShow: "",
      isSnap: "",
      practiceId: ""
    };
  },
  methods: {
    addPractice() {
      // เพิ่มแบบฝึกหัด
      this.isShowPractice = false;
    },
    editPractice(itemPrac) {
      // กดสามจุด+กดแก้ไขแบบฝึกหัด แก้ได้เฉพาะรหัสลำดับ
      // console.log(order);
      this.data.order = itemPrac.order;
      this.data.practiceType = itemPrac.practiceType;
      this.practiceId = itemPrac.practiceId;
      // console.log(this.data.order);
      // return;
      this.isShowPractice = false;
      this.isEditMode = true;
    },
    cancelPractice() {
      // ยกเลิกการแก้ไขแบบฝึกหัด
      this.data.order = "";
      this.isShowPractice = true;
      this.isEditMode = false;
    },
    deletePractice(practiceId) {
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
      //กดปุ่มบันทึกข้อมูล
      this.$refs.order.validate();

      if (this.$refs.order.hasError) {
        this.$q.notify({
          message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
          color: "red",
          position: "top"
        });
        return;
      }

      if (this.isEditMode) {
        console.log("edit");
        // return;
        this.saveOldData();
      } else {
        console.log("add");
        return;
        this.saveNewData();
      }
    },
    saveNewData() {
      db.collection("practice_list")
        .add(this.data)
        .then(doc => {
          this.dialogSuccess = true;
          this.data.order = "";
          setTimeout(() => {
            this.dialogSuccess = false;
            this.isShowPractice = true;
          }, 1000);
        });
    },
    saveOldData() {
      // console.log(this.practiceId);
      // return;
      // this.loadingShow();
      db.collection("practice_list")
        .doc(this.practiceId)
        .set(this.data)
        .then(doc => {
          // this.loadingHide();
          this.dialogSuccess = true;
          setTimeout(() => {
            this.data.order = "";

            this.dialogSuccess = false;
            this.isShowPractice = true;
          }, 1000);
        });
    },
    loadData() {
      console.log(this.levelId, this.unitId);

      this.isSnap = db
        .collection("practice_list")
        .where("levelId", "==", this.levelId)
        .where("unitId", "==", this.unitId)
        .onSnapshot(doc => {
          let temp = [];
          doc.forEach(element => {
            // console.log(element.data());
            temp.push({ ...element.data(), practiceId: element.id });
          });
          temp.sort((a, b) => a.order - b.order);
          this.practiceListShow = temp;
        });
    },
    gotoPractice(itemPrac) {
      if (itemPrac.practiceType == "flashcard") {
        this.$router.push(
          "/flashcardMain/" + itemPrac.levelId + "/" + itemPrac.unitId
        );
      } else if (itemPrac.practiceType == "multipleChoies") {
        this.$router.push(
          "/multipleMain/" + itemPrac.levelId + "/" + itemPrac.unitId
        );
      } else if (itemPrac.practiceType == "expression") {
        this.$router.push(
          "/expressionMain/" + itemPrac.levelId + "/" + itemPrac.unitId
        );
      } else if (itemPrac.practiceType == "vdo/") {
        this.$router.push(
          "/vdoMain/" + itemPrac.levelId + "/" + itemPrac.unitId
        );
      } else {
        // ไม่อยู่ type ไหนเลยให้แก้ มีแจ้งเตือน
        this.$router.push("/practiceList");
      }
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    unitId(newValue, oldValue) {
      this.loadData();
    }
  },
  beforeDestroy() {
    this.isSanp();
  }
};
</script>

<style lang="scss" scoped>
</style>