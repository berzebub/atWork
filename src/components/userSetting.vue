<template>
  <div class="container">
    <!-- box2 แก้ไขชื่อ -->
    <div
      class
      v-show="infoData == '1'"
      align="center"
      :style="$q.platform.is.desktop?'width:328px;margin-top:50%;margin-left:25%':''"
    >
      <div class="text-h6">แก้ไข ชื่อ สกุล</div>
      <div class="q-mt-lg">
        <div align="left" class="text-body2">ชื่อ นามสกุล</div>
        <div>
          <q-input outlined ref="name" v-model="name" :rules="[val => !!val]" />
        </div>
      </div>
      <div class="row justify-center">
        <q-btn
          @click="dialogChangeData()"
          class="q-mx-md"
          label="ยกเลิก"
          :style="$q.platform.is.desktop?'width:120px':'width:100px'"
          outline
          color="blue-grey-10"
        />
        <q-btn
          @click="saveChangeName()"
          class="q-mx-md bg-blue-grey-10 text-white"
          label="บันทึก"
          :style="$q.platform.is.desktop?'width:120px':'width:100px'"
        />
      </div>
    </div>
    <!-- box3 แก้ไขรหัสผ่าน -->
    <div
      v-show="infoData == '2'"
      align="center"
      :style="$q.platform.is.desktop?'width:328px;margin-top:50%;margin-left:25%':''"
    >
      <div class="text-h6">คุณต้องการรีเซตรหัสผ่าน</div>
      <div class="text-subtitle1">"{{userInfo.email}}"</div>

      <div class="row justify-center q-mt-lg">
        <q-btn
          @click="backMainPage()"
          class="q-mx-md"
          label="ยกเลิก"
          :style="$q.platform.is.desktop?'width:120px':'width:100px'"
          outline
          color="blue-grey-10"
        />
        <q-btn
          @click="saveChangePassword()"
          class="q-mx-md bg-blue-grey-10 text-white"
          label="ตกลง"
          :style="$q.platform.is.desktop?'width:120px':'width:100px'"
        />
      </div>
    </div>
    <!-- box4 ออกจากระบบ -->
    <div
      v-show="infoData == '3'"
      align="center"
      :style="$q.platform.is.desktop?'width:328px;margin-top:50%;margin-left:25%':''"
    >
      <div class="text-h6 q-mb-md">ออกจากระบบ</div>
      <div>
        <q-btn
          @click="logOut()"
          class="bg-blue-grey-10 text-white"
          style="width:190px;"
          label="เฉพาะอุปกรณ์ปัจจุบัน"
        />
      </div>
      <div class="q-mt-md">
        <q-btn @click="logOutAll()" style="width:190px" label="อุปกรณ์ทั้งหมด" outline />
      </div>
      <div class="q-mt-md">
        <q-btn @click="backMainPage()" style="width:190px" label="กลับสู่โปรแกรม" outline />
      </div>
    </div>
    <!-- -------------------------------------------Diaolog--------------------------------------- -->
    <!-- เพิ่มข้อมูลสำเร็จ -->
    <q-dialog v-model="isDialogSuccess">
      <q-card
        :style="$q.platform.is.desktop?'min-width: 350px; height:200px; margin-left:23%':'min-width: 350px; height:200px'"
      >
        <q-card-section class="absolute-center" align="center">
          <div>
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- correct Email -->
    <q-dialog v-model="dialogEmail">
      <q-card
        :style="$q.platform.is.desktop?'min-width: 350px; height:200px; margin-left:23%':'min-width: 350px; height:200px'"
      >
        <q-card-section align="center">
          <div class="q-mt-md">
            <q-icon color="secondary" size="lg" name="far fa-check-circle" />
          </div>
        </q-card-section>

        <q-card-section align="center" class="q-pt-none">กรุณาตรวจสอบ E-mail</q-card-section>

        <q-card-actions align="center">
          <q-btn @click="confirmEmail()" style="width:190px" label="ตกลง" color="blue-grey-10" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- dont complete data -->
    <q-dialog v-model="dialogDontChangeData">
      <q-card
        :style="$q.platform.is.desktop?'min-width: 350px; height:200px; margin-left:23%':'min-width: 350px; height:200px'"
      >
        <q-card-section align="center" class="q-pt-xl">
          <div class="text-subtitle1">คุณกำลังออกจากหน้านี้</div>
          <div class="text-subtitle1">ต้องการบันทึกข้อมูลหรือไม่</div>
        </q-card-section>

        <q-card-actions align="center" class="q-mt-xs" style="width:350px">
          <q-btn
            @click="dialogChangeData()"
            style="width:90px"
            label="ยกเลิก"
            outline
            v-close-popup
          />
          <q-btn @click="backMainPage()" style="width:90px" label="ไม่บันทึก" outline />
          <q-btn @click="saveChangeName()" style="width:90px" label="บันทึก" color="blue-grey-10" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, db } from "../router";
import { uid } from "quasar";
import userInfoVue from "../pages/userInfo.vue";
export default {
  props: ["infoData", "userInfo"],
  data() {
    return {
      name: this.userInfo.name,
      oldPassword: "",
      newPassword: "",
      confrimPassword: "",
      isPwd1: true,
      isPwd2: true,
      isPwd3: true,
      isNamePage: false,
      isPasswordPage: false,
      isLogOutPage: false,
      isDialogSuccess: false,
      dialogEmail: false,
      dialogDontChangeData: false
    };
  },
  watch: {
    infoData() {
      console.log(this.infoData);
      if (this.infoData == "1") {
        this.$refs.name.resetValidation();
      }
    }
  },
  methods: {
    backMainPage() {
      if (this.$q.platform.is.desktop) {
        this.$emit("backStep", false);
      } else {
        this.$router.push("/userInfo");
      }
    },
    saveChangeName() {
      this.$refs.name.validate();
      if (this.$refs.name.hasError) {
        return;
      }
      db.collection("user_admin")
        .doc(this.userInfo.userId)
        .update({ name: this.name })
        .then(() => {
          this.isDialogSuccess = true;
          setTimeout(() => {
            this.isDialogSuccess = false;
            this.backMainPage();
          }, 700);
          this.isNamePage = false;
        });
    },
    saveChangePassword() {
      let _this = this;
      auth
        .sendPasswordResetEmail(this.userInfo.email)
        .then(function() {
          _this.dialogEmail = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // ตกลง
    confirmEmail() {
      this.backMainPage();
    },
    async logOutAll() {
      this.loadingShow();
      let genCode = Math.random()
        .toString(36)
        .substring(7);

      let signOut = await db
        .collection("user_admin")
        .doc(this.userInfo.userId)
        .update({ loginKey: genCode });
    },
    dialogChangeData() {
      this.dialogDontChangeData = true;
    }
    // checkConfrimPassword(val) {
    //   return this.newPassword == val || "รหัสผ่านไม่ตรงกัน";
    // }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>