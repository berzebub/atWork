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
                    <q-item clickable @click="deletePractice(itemPrac)">
                      <q-item-section>ลบแบบฝึกหัด</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col q-pa-sm" align="left">
            <span v-if="itemPrac.practiceType=='flashcard'">การ์ดคำศัพท์</span>
            <span v-if="itemPrac.practiceType=='multipleChoice'">เลือกคำตอบ</span>
            <span v-if="itemPrac.practiceType=='expression'">ประโยคสนทนา</span>
            <span v-if="itemPrac.practiceType=='vdo'">บทสนทนา</span>
          </div>
          <div class="row" :class="$q.platform.is.desktop ? 'col-2':'col-4'" align="center">
            <div class="col">
              <q-btn
                v-show="itemPrac.isShowSyncBtn"
                round
                color="blue-grey-10"
                icon="fas fa-sync-alt"
                @click="sync(itemPrac.practiceId).then(() => emitData(itemPrac) )"
              />
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
      <div>
        <span class="text-subtitle1">รหัสลำดับ</span>
        <span class="text-body2 q-pl-xs" style="color:#BDBDBD">ตัวเลข 3 หลัก</span>
      </div>
      <div>
        <q-input
          mask="###"
          color="blue-grey-10"
          outlined
          v-model.number="data.order"
          :rules="[value => !!value ]"
          ref="order"
        />
      </div>
      <div>ชื่อแบบฝึกหัด</div>
      <div v-if="!isEditMode">
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
      </div>
      <div v-else class="q-py-sm">
        <q-input outlined :value="convertPracticeTypeToThai(data.practiceType)" readonly></q-input>
        <!-- <span>{{convertPracticeTypeToThai(data.practiceType)}}</span> -->
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
    <dialog-setting
      :type="3"
      :name="name"
      :practice="practice"
      v-if="dialogDelete"
      @emitConfirmDelete="deletePracticeConfirm"
    ></dialog-setting>
    <!-- <q-dialog v-model="dialogDelete" persistent>
      <q-card class="q-pa-md" style="width: 300px;" align="center">
        <div class="q-py-lg">
          คุณต้องการลบแบบฝึกหัด
          <br />
          " {{order}} - {{convertPracticeTypeToThai(data.practiceType)}} "
        </div>

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
            <q-btn
              style="width:120px"
              color="blue-grey-10"
              label="ยืนยัน"
              v-close-popup
              @click="deletePracticeConfirm()"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>-->

    <!-- dialog success -->
    <dialog-setting :type="6" v-if="dialogSuccess" @autoClose="dialogSuccess = false"></dialog-setting>
    <!-- <q-dialog v-model="dialogSuccess">
      <q-card style="min-width: 350px; height:170px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>-->
    <!-- dialog delete practicelist success -->
    <q-dialog v-model="dialogDeletePracticeListSuccess">
      <q-card style="min-width: 350px; height:170px">
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">ลบแบบฝึกหัดเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "../router";
import flashcardMainVue from "../pages/flashcardMain.vue";
import dialogSetting from "../components/dialogSetting.vue";
export default {
  components: {
    dialogSetting
  },
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
      order: "",
      practiceId: "",
      practiceType: "",
      dialogDeletePracticeListSuccess: false,
      name: "",
      practice: "แบบฝึกหัด"
    };
  },
  methods: {
    emitData(item) {
      this.$emit("finishSync", item);
    },
    addPractice() {
      // เพิ่มแบบฝึกหัด
      this.isShowPractice = false;
    },
    editPractice(itemPrac) {
      // กดสามจุด+กดแก้ไขแบบฝึกหัด แก้ได้เฉพาะรหัสลำดับ
      this.data.order = itemPrac.order;
      this.data.practiceType = itemPrac.practiceType;
      this.practiceId = itemPrac.practiceId;
      this.isShowPractice = false;
      this.isEditMode = true;
    },
    cancelPractice() {
      // ยกเลิกการแก้ไขแบบฝึกหัด
      this.data.order = "";
      this.data.practiceType = "flashcard";
      this.isShowPractice = true;
      this.isEditMode = false;
    },
    deletePractice(itemPrac) {
      // this.order = itemPrac.order;
      // this.practiceType = itemPrac.practiceType;
      this.practiceId = itemPrac.practiceId;
      this.name = itemPrac.order + " - " + itemPrac.practiceType;
      this.dialogDelete = true;
    },
    deletePracticeConfirm(val) {
      // console.log(this.practiceId);
      this.dialogDelete = false;
      this.loadingShow();
      db.collection("practice_draft")
        .where("practiceId", "==", this.practiceId)
        .get()
        .then(doc => {
          for (const element of doc.docs) {
            db.collection("practice_draft")
              .doc(element.id)
              .delete();
          }

          db.collection("practice_server")
            .where("practiceId", "==", this.practiceId)
            .get()
            .then(doc => {
              for (const element of doc.docs) {
                db.collection("practice_server")
                  .doc(element.id)
                  .delete();
              }
              db.collection("practice_list")
                .doc(this.practiceId)
                .delete()
                .then(() => {
                  this.loadingHide();
                  this.dialogSuccess = true;

                  // this.dialogDeletePracticeListSuccess = true;
                  // setTimeout(() => {
                  //   this.dialogDeletePracticeListSuccess = false;
                  // }, 1000);
                });
            });
        });
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
        this.saveOldData();
      } else {
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
      // this.loadingShow();  // ถามเรื่องการ loadingshow
      db.collection("practice_list")
        .doc(this.practiceId)
        .set(this.data)
        .then(doc => {
          // this.loadingHide();
          this.dialogSuccess = true;
          setTimeout(() => {
            this.data.order = "";
            this.data.practiceType = "flashcard";
            this.dialogSuccess = false;
            this.isShowPractice = true;
          }, 1000);
        });
    },
    loadData() {
      this.isSnap = db
        .collection("practice_list")
        .where("levelId", "==", this.levelId)
        .where("unitId", "==", this.unitId)
        .onSnapshot(doc => {
          this.loadingShow();
          let temp = [];

          // for (const element of doc.docs) {
          //   let practice = await db
          //     .collection("practice_draft")
          //     .where("practiceId", "==", element.id)
          //     .get();
          //   let syncCheck = false;

          //   practice.forEach(practiceElement => {
          //     if (
          //       practiceElement.data().status == "notSync" ||
          //       practiceElement.data().status == "waitForDelete"
          //     ) {
          //       syncCheck = true;
          //     }
          //   });

          //   temp.push({
          //     ...element.data(),
          //     practiceId: element.id,
          //     isShowSyncBtn: syncCheck
          //   });
          // }

          doc.forEach(element => {
            temp.push({ ...element.data(), practiceId: element.id });
          });

          temp.sort((a, b) => {
            return a.order - b.order;
          });
          this.practiceListShow = temp;
          this.loadingHide();
        });
    },
    gotoPractice(itemPrac) {
      if (itemPrac.practiceType == "flashcard") {
        this.$router.push(
          "/flashcardMain/" +
            itemPrac.levelId +
            "/" +
            itemPrac.unitId +
            "/" +
            itemPrac.practiceId
        );
      } else if (itemPrac.practiceType == "multipleChoice") {
        this.$router.push(
          "/multipleMain/" +
            itemPrac.levelId +
            "/" +
            itemPrac.unitId +
            "/" +
            itemPrac.practiceId
        );
      } else if (itemPrac.practiceType == "expression") {
        this.$router.push(
          "/expressionMain/" +
            itemPrac.levelId +
            "/" +
            itemPrac.unitId +
            "/" +
            itemPrac.practiceId
        );
      } else if (itemPrac.practiceType == "vdo") {
        this.$router.push(
          "/vdoMain/" +
            itemPrac.levelId +
            "/" +
            itemPrac.unitId +
            "/" +
            itemPrac.practiceId
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
      this.data.unitId = newValue;
      this.loadData();
    },
    levelId(newValue, oldValue) {
      this.data.levelId = newValue;
    }
  },
  beforeDestroy() {
    this.isSnap();
  }
};
</script>

<style lang="scss" scoped>
</style>