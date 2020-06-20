<template>
  <q-page>
    <div>
      <div class="row justify-between">
        <!-- กล่อง radio -->
        <div class="brg row" style="width:330px">
          <q-radio
            class="q-ml-md col-6"
            color="blue-grey-10"
            v-model="expressionType"
            val="darf"
            label="แบบร่าง"
          />
          <q-radio color="blue-grey-10" v-model="expressionType" val="server" label="เซิร์ฟเวอร์" />
        </div>
        <!-- ปุ่มพิมพ์ -->
        <div class="mobile-hide">
          <q-btn round color="blue-grey-10" icon="fas fa-print" />
        </div>
      </div>
      <!-- หัวข้อ -->
      <div class="q-ma-lg text-h6" align="center">
        <div>พนักงานร้านอาหาร</div>
        <div>1. รับออเดอร์</div>
      </div>
      <!-- ปุ่มเพิ่ม -->
      <div align="center">
        <q-btn
          style="width:190px"
          class="bg-blue-grey-10"
          to="/expressionInput"
          color="white"
          label="เพิ่ม"
        ></q-btn>
      </div>
      <q-card
        v-for="(item, index) in showDataExpression"
        :key="index"
        class="q-mt-md"
        style="width:100%"
      >
        <q-card-section class="bg-blue-grey-10 text-white">
          <div>{{item.order}}</div>
          <div class="row items-center absolute-right">
            <q-icon
              class="cursor-pointer q-pr-md"
              name="fas fa-ellipsis-v"
              style="color:white; font-size: 1.4em;"
            />
            <q-menu>
              <q-list style="min-width: 120px">
                <div @click="editDataExpression(item)" class="q-ma-md cursor-pointer">แก้ไขข้อมูล</div>
                <div @click="openDialogDelete(item.id)" class="q-ma-md cursor-pointer">ลบ</div>
              </q-list>
            </q-menu>
          </div>
        </q-card-section>
        <q-card-section v-for="(item2, index2) in item.expression" class="no-padding">
          <div class="q-px-md q-pt-md q-pb-sm text-h6">{{item2.sentenceEng}}</div>
          <div class="q-px-md q-pb-md text-subtitle2">{{item2.sentenceTh}}</div>

          <q-separator />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
    <!-- ------------------------------------------Dialog------------------------------------ -->

    <q-dialog v-model="dialogDelete" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">คุณต้องการลบ หรือไม่</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="ยกเลิก" v-close-popup />
          <q-btn @click="deleteDataExpression()" flat label="ยืนยัน" v-close-popup />
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
      expressionType: "darf",
      dialogDelete: false,
      getId: "",
      showDataExpression: ""
    };
  },
  methods: {
    loadDataExpression() {
      db.collection("expression")
        .get()
        .then(data => {
          let temp = [];
          data.forEach(element => {
            temp.push({ ...element.data(), id: element.id });
          });
          this.showDataExpression = temp;
        });
    },

    openDialogDelete(id) {
      this.dialogDelete = true;
      this.getId = id;
    },
    deleteDataExpression() {
      db.collection("expression")
        .doc(this.getId)
        .delete()
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

    // var user = auth.currentUser;
    // console.log(user.email);
  }
};
</script>

<style lang="scss" scoped>
</style>
