<template>
  <div class="absolute-center text-subtitle1" align="center">
    <div>Winner @Work</div>
    <div class="q-mt-md">Backend</div>
    <!-- Email -->
    <div class="q-ma-md" style="width:300px">
      <div class="q-ml-xs" align="left">E-mail</div>
      <div>
        <q-input outlined v-model="email" />
      </div>
    </div>
    <!-- password -->
    <div class="q-ma-md" style="width:300px">
      <div class="q-ml-xs" align="left">รหัสผ่าน</div>
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div @click="forgetPassword()" class="q-mt-sm cursor-pointer" align="right">
        <u>ลืมรหัสผ่าน?</u>
      </div>
    </div>
    <!-- login -->
    <div class="q-ma-md">
      <q-btn
        @click="login()"
        label="เข้าสู่ระบบ"
        class="q-ma-md bg-blue-grey-10 text-white"
        style="width:190px"
      />
    </div>
    <!-- -----------------------------------------dialog--------------------------------------- -->
    <q-dialog v-model="dialogWrongPassword">
      <q-card style="width:323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-md">
            <q-icon color="red" size="lg" name="far fa-times-circle" />
          </div>
        </q-card-section>

        <q-card-section align="center" class="q-pt-none">E-mail หรือ รหัสผ่านผิดพลาด</q-card-section>

        <q-card-actions align="center">
          <q-btn
            @click="confirmWrongEmail()"
            style="width:190px"
            label="ตกลง"
            color="blue-grey-10"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, axios } from "../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      dialogWrongPassword: false
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // console.log(user.user.uid);
          this.$q.localStorage.set("uid", user.user.uid);
          this.$router.push("/practiceList");
        })
        .catch(error => {
          console.log(error);
        });
    },
    forgetPassword() {
      this.$router.push("/forgetPassword");
    },
    confirmWrongEmail() {
      this.dialogWrongPassword = false;
    }
  },
  mounted() {
    console.log(auth.currentUser);
  }
};
</script>

<style></style>
