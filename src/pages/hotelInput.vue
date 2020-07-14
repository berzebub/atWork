<template>
  <q-page>
    <div class="container">
      <div>
        <div>ชื่อกิจการ</div>
        <q-input
          v-model.trim="datahotel.name"
          ref="name"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>ชื่อ นามสกุลผู้ดูแลระบบ</div>
        <q-input
          v-model.trim="datahotel.adminName"
          ref="adminName"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>เบอร์ติดต่อผู้ดูแลระบบ</div>
        <q-input
          v-model.trim="datahotel.adminPhone"
          ref="adminPhone"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>อีเมลผู้ดูแลระบบ</div>
        <q-input
          v-model.trim="datahotel.email"
          ref="email"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>รหัสผ่านผู้ดูแลระบบ</div>
        <q-input
          v-model.trim="datahotel.password"
          ref="password"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div class="row">
        <div class="col-6 q-pr-sm q-py-md" align="right">
          <q-btn @click="cancelAddHotel()" dense style="width:150px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-py-md">
          <q-btn @click="saveHotel()" dense color="blue-grey-10" style="width:150px" label="บันทึก"></q-btn>
        </div>
      </div>
      <dialog-center :type="6" v-if="isAddDialogSucess" @autoClose="addDialogSucess"></dialog-center>
    </div>
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
      datahotel: {
        name: "",
        adminName: "",
        adminPhone: "",
        email: "",
        password: ""
      },
      isAddDialogSucess: false,
      hotelList: ""
    };
  },
  methods: {
    cancelAddHotel() {
      this.$router.push("/hotelMain");
    },
    saveHotel() {
      // check validate
      this.$refs.name.validate();
      this.$refs.adminName.validate();
      this.$refs.adminPhone.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (
        this.$refs.name.hasError ||
        this.$refs.adminName.hasError ||
        this.$refs.adminPhone.hasError ||
        this.$refs.password.hasError ||
        this.$refs.email.hasError
      ) {
        return console.log("กรอก input ไม่ครบ");
      }

      this.loadingShow();
      // บันทึก add
      if (this.$route.name == "hotelAdd") {
        console.log(" add save");
        db.collection("hotel")
          .add(this.datahotel)
          .then(() => {
            this.isAddDialogSucess = true;
            this.loadingHide();
          });
      } else {
        console.log("edit save");
        db.collection("hotel")
          .doc(this.$route.params.hotelId)
          .update(this.datahotel)
          .then(() => {
            this.isAddDialogSucess = true;

            this.loadingHide();
          });
      }
    },

    addDialogSucess() {
      this.isAddDialogSucess = false;
      setTimeout(() => {
        this.$router.push("hotelMain");
      }, 500);
    },
    loadHotelEdit() {
      db.collection("hotel")
        .doc(this.$route.params.hotelId)
        .get()
        .then(doc => {
          console.log(doc.data());
          this.datahotel.name = doc.data().name;
          this.datahotel.adminName = doc.data().adminName;
          this.datahotel.adminPhone = doc.data().adminPhone;
          this.datahotel.email = doc.data().email;
          this.datahotel.password = doc.data().password;
          this.nameOld = doc.data().name;
        });
    }
  },
  mounted() {
    if (this.$route.name == "hotelEdit") {
      this.loadHotelEdit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>