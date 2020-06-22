<template>
  <q-page>
    <div>
      <div class="row justify-between">
        <!-- กล่อง radio -->
        <div class="brg row" style="width:330px">
          <q-radio
            @input="loadDataExpression('draft')"
            class="q-ml-md col-6"
            color="blue-grey-10"
            v-model="expressionType"
            val="draft"
            label="แบบร่าง"
          />
          <q-radio
            @input="loadDataExpression('server')"
            color="blue-grey-10"
            v-model="expressionType"
            val="server"
            label="เซิร์ฟเวอร์"
          />
        </div>
        <!-- ปุ่มพิมพ์ -->
        <div class="mobile-hide">
          <q-btn v-if="expressionType == 'draft'" round color="blue-grey-10" icon="fas fa-print" />
        </div>
      </div>
      <!-- หัวข้อ -->
      <div class="q-ma-lg text-h6" align="center">
        <div>พนักงานร้านอาหาร</div>
        <div>1. รับออเดอร์</div>
      </div>
      <!-- ปุ่มเพิ่ม -->
      <div v-if="expressionType == 'server'" class style="height:36px"></div>
      <div class align="center">
        <q-btn
          v-if="expressionType == 'draft'"
          style="width:190px; height:36px"
          class="bg-blue-grey-10"
          to="/expressionInput"
          color="white"
          label="เพิ่ม"
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
        <q-card-section class="bg-blue-grey-10 text-white">
          <div class="text-h6">รหัสลำดับ {{item.order}}</div>
          <div class="row items-center absolute-right">
            <q-icon
              v-if="expressionType == 'draft'"
              class="cursor-pointer q-pr-md"
              name="fas fa-ellipsis-v"
              style="color:white; font-size: 1.4em;"
            />
            <!-- เมนูแก้ไข-ลบ -->
            <q-menu>
              <q-list style="min-width: 120px">
                <div @click="editDataExpression(item)" class="q-ma-md cursor-pointer">แก้ไขข้อมูล</div>
                <div @click="openDialogDelete(item.id,item.order)" class="q-ma-md cursor-pointer">ลบ</div>
              </q-list>
            </q-menu>
          </div>
        </q-card-section>
        <!-- ประโยคข้อความ -->
        <q-card-section v-for="(item2, index2) in item.expression" class="no-padding">
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
  </q-page>
</template>

<script>
import { db, auth } from "../router";
export default {
  data() {
    return {
      expressionType: "draft",
      dialogDelete: false,
      getId: "",
      getOrder: "",
      showDataExpression: ""
    };
  },
  methods: {
    loadDataExpression() {
      // let collection;
      // if (mode == "server") {
      //   collection = db.collection("expression_server");
      // } else {
      //   collection = db.collection("expression_draft");
      // }
      // collection.get().then(data => {
      //   let temp = [];
      //   data.forEach(element => {
      //     temp.push({ ...element.data(), id: element.id });
      //   });
      //   temp.sort((a, b) => {
      //     return a.order - b.order;
      //   });
      //   this.showDataExpressionDraft = temp;
      // });
      let temp = [];
      db.collection("expression_draft")
        .where("levelId", "==", "a")
        .where("unitId", "==", "a")
        .get()
        .then(dataDraft => {
          dataDraft.forEach(element => {
            temp.push({
              ...element.data(),
              collection: "draft",
              id: element.id
            });
          });
          db.collection("expression_server")
            .get()
            .then(dataServer => {
              dataServer.forEach(element => {
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
    coppy() {
      db.collection("expression_draft")
        .where("levelId", "==", "a")
        .where("unitId", "==", "a")
        .get()
        .then(data => {
          data.forEach(element => {
            db.collection("expression_server")
              .doc(element.id)
              .set(element.data());
          });
        });
    },
    openDialogDelete(id, order) {
      console.log(id, order);
      this.dialogDelete = true;
      this.getId = id;
      this.getOrder = order;
    },
    deleteDataExpression() {
      db.collection("expression_draft")
        .doc(this.getId)
        .update({ status: "waitForDelete" })
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
          this.loadDataExpression();
        });
    },
    editDataExpression(item) {
      this.$router.push({
        name: "expressionEdit",
        params: item
      });
    }
  },
  mounted() {
    this.loadDataExpression();
    this.coppy();

    // var user = auth.currentUser;
    // console.log(user.email);
  }
};
</script>

<style lang="scss" scoped>
</style>
