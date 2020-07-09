<template>
  <q-page>
    <div align="center">
      <q-btn
        @click="goToAddHotel()"
        label="เพิ่มกิจการ"
        color="blue-grey-10"
        style="width:190px"
      ></q-btn>
    </div>
    <q-separator class="q-mt-md" />
    <div v-for="(item, index) in hotelList" :key="index">
      <q-toolbar class="no-padding">
        <div class="text-subtitle1 q-pr-sm">
          <span>{{ item.name }}</span>
        </div>
        <q-space></q-space>
        <q-btn
          @click.stop="deleteHotel(item)"
          icon="far fa-trash-alt"
          flat
          size="10px"
        ></q-btn>
        <q-btn
          @click.stop="editHotel()"
          icon="fas fa-edit"
          flat
          size="10px"
        ></q-btn>
      </q-toolbar>
      <q-separator />
    </div>
    <!-- dialog ลบ กรณีมีข้อมูล -->
    <dialog-center
      :type="5"
      :practice="'แผนกภายในกิจการ'"
      :name="hotelData.name"
      v-if="isShowNoDeleteDialog"
      @emitConfirmDelete="isShowNoDeleteDialog = false"
    ></dialog-center>
    <!-- dialog ลบ กรณีไม่มีข้อมูล -->
    <dialog-center
      :type="3"
      :practice="'กิจการ'"
      :name="hotelData.name"
      v-if="isShowDeleteDialog"
      @emitCancelDelete="isShowDeleteDialog = false"
      @emitConfirmDelete="confirmDelete"
    ></dialog-center>
  </q-page>
</template>

<script>
import { db } from "../router";
import dialogCenter from "../components/dialogSetting";
export default {
  components: {
    dialogCenter
  },
  data() {
    return {
      hotelList: "",
      isShowNoDeleteDialog: false,
      hotelData: "",
      isShowDeleteDialog: false,
      isSnapLoadHotel: ""
    };
  },
  methods: {
    deleteHotel(data) {
      this.hotelData = data;
      db.collection("department")

        .where("hotelId", "==", data.hotelId)
        .get()
        .then(doc => {
          if (doc.size > 0) {
            this.isShowNoDeleteDialog = true;
          } else {
            this.isShowDeleteDialog = true;
          }
        });
    },
    editHotel() {},
    loadHotel() {
      this.isSnapLoadHotel = db.collection("hotel").onSnapshot(doc => {
        let temp = [];

        // console.log(doc.size);
        doc.forEach(element => {
          temp.push({ ...element.data(), hotelId: element.id });
        });
        temp.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        this.hotelList = temp;
      });
    },
    goToAddHotel() {
      this.$router.push("/hotelAdd");
    },
    dialogNoDelete() {},
    confirmDelete() {
      this;
      db.collection("hotel")
        .doc(this.hotelData.hotelId)
        .delete()
        .then(() => {
          this.isShowDeleteDialog = false;
        });
    }
  },
  mounted() {
    this.loadHotel();
  },
  beforeDestroy() {
    this.isSnapLoadHotel();
  }
};
</script>

<style scoped></style>
