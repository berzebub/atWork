<template>
  <div class="container brx">
    <!-- box2 แก้ไขชื่อ -->
    <div v-show="infoData == '1'" align="center">
      <div class="text-subtitle1">แก้ไข ชื่อ สกุล</div>
      <div class="q-mt-lg">
        <div style="width:328px" align="left" class="text-body2">ชื่อ นามสกุล</div>
        <div>
          <q-input outlined style="width:328px" ref="name" v-model="name" :rules="[val => !!val]" />
        </div>
      </div>
      <div class="row justify-center q-ma-lg">
        <q-btn class="q-mx-md" label="ยกเลิก" style="width:150px" outline color="blue-grey-10" />
        <q-btn
          @click="saveChangeName()"
          class="q-mx-md bg-blue-grey-10 text-white"
          label="บันทึก"
          style="width:150px"
        />
      </div>
    </div>
    <!-- box3 แก้ไขรหัสผ่าน -->
    <div v-show="infoData == '2'" align="center">
      <div class="text-subtitle1">แก้ไขรหัสผ่าน</div>
      <div class="q-mt-lg">
        <div style="width:328px" align="left" class="text-body2">รหัสผ่านปัจจุบัน</div>
        <div>
          <q-input
            style="width:328px"
            v-model="oldPassword"
            :type="isPwd1 ? 'password' : 'text'"
            outlined
            ref="oldPassword"
            :rules="[val => !!val]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="q-mt-lg">
        <div style="width:328px" align="left" class="text-body2">รหัสผ่านใหม่</div>
        <div class="text-blue-grey-7" style="width:328px" align="left">ไม่ต่ำกว่า 6 ตัวอักษร</div>
        <div>
          <q-input
            style="width:328px"
            v-model="newPassword"
            ref="newPassword"
            :rules="[val => !!val]"
            :type="isPwd2 ? 'password' : 'text'"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="q-mt-lg">
        <div style="width:328px" align="left" class="text-body2">ยืนยันรหัสผ่านใหม่</div>
        <div>
          <q-input
            style="width:328px"
            v-model="confrimPassword"
            :type="isPwd3 ? 'password' : 'text'"
            ref="confrimPassword"
            :rules="[val => !!val,val => val == newPassword || 'รหัสผ่านไม่ตรงกัน']"
            outlined
          >
            <!-- checkConfrimPassword -->
            <template v-slot:append>
              <q-icon
                :name="isPwd3 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd3 = !isPwd3"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-center q-ma-lg">
        <q-btn class="q-mx-md" label="ยกเลิก" style="width:150px" outline color="blue-grey-10" />
        <q-btn
          @click="saveChangePassword()"
          class="q-mx-md bg-blue-grey-10 text-white"
          label="บันทึก"
          style="width:150px"
        />
      </div>
    </div>
    <!-- box4 ออกจากระบบ -->
    <div v-show="infoData == '3'" align="center" style="margin-top:50%">
      <div class="text-h6">ออกจากระบบ</div>
      <div>
        <q-btn
          @click="logOut()"
          class="bg-blue-grey-10 text-white"
          style="width:190px"
          label="เฉพาะอุปกรณ์ปัจจุบัน"
        />
      </div>
      <div class="q-mt-md">
        <q-btn style="width:190px" label="อุปกรณ์ทั้งหมด" outline />
      </div>
      <div class="q-mt-md">
        <q-btn style="width:190px" label="กลับสู่โปรแกรม" outline />
      </div>
    </div>
    <!-- -------------------------------------------Diaolog--------------------------------------- -->
    <!-- เพิ่มข้อมูลสำเร็จ -->
    <q-dialog v-model="isDialogSuccess">
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
import { auth } from "../router";
export default {
  props: ["infoData"],
  data() {
    return {
      name: "",
      oldPassword: "",
      newPassword: "",
      confrimPassword: "",
      isPwd1: true,
      isPwd2: true,
      isPwd3: true,
      isNamePage: false,
      isPasswordPage: false,
      isLogOutPage: false,
      isDialogSuccess: false
    };
  },
  methods: {
  
    saveChangeName() {
      this.$refs.name.validate();
      if (this.$refs.name.hasError) {
        return;
      }
      this.isDialogSuccess = true;
      setTimeout(() => {
        this.isDialogSuccess = false;
      }, 700);
      this.isNamePage = false;
    },
    saveChangePassword() {
      this.$refs.oldPassword.validate();
      this.$refs.newPassword.validate();
      this.$refs.confrimPassword.validate();
      if (
        this.$refs.oldPassword.hasError ||
        this.$refs.newPassword.hasError ||
        this.$refs.confrimPassword.hasError
      ) {
        return;
      }
      this.isDialogSuccess = true;
      setTimeout(() => {
        this.isDialogSuccess = false;
      }, 700);
      this.isPasswordPage = false;
    }
    // checkConfrimPassword(val) {
    //   return this.newPassword == val || "รหัสผ่านไม่ตรงกัน";
    // }
  },
  mounted() {
    console.log(this.infoData);
  }
};
</script>

<style lang="scss" scoped>
</style>