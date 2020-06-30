<template>
  <div class="bg-login">
    <div class="absolute-center text-subtitle1" align="center">
      <div class="text-h6">Winner @Work</div>
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
        <q-input
          @keyup.enter="login()"
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div
          @click="forgetPassword()"
          class="q-mt-sm cursor-pointer"
          align="right"
        >
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

          <q-card-section align="center" class="q-pt-none"
            >E-mail หรือ รหัสผ่านผิดพลาด</q-card-section
          >

          <q-card-actions align="center">
            <q-btn
              v-close-popup
              style="width:190px"
              label="ตกลง"
              color="blue-grey-10"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { auth, axios, db } from "../router";
import { uid } from "quasar";
export default {
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      dialogWrongPassword: false,
      isKey: false,
      loginKey: ""
    };
  },
  methods: {
    login() {
      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.$q.localStorage.set("uid", user.user.uid);
              db.collection("user_admin")
                .where("uid", "==", user.user.uid)
                .get()
                .then(getUserId => {
                  getUserId.docs[0].data().loginKey;
                  this.$q.localStorage.set(
                    "loginKey",
                    getUserId.docs[0].data().loginKey
                  );
                  this.$router.push("/practiceList");
                });
            })
            .catch(error => {
              console.log(error);
              this.confirmWrongEmail();
            });
        })
        .catch(error => {});
    },
    forgetPassword() {
      this.$router.push("/forgetPassword");
    },
    confirmWrongEmail() {
      this.dialogWrongPassword = true;
    },
    checkUserLogin() {
      this.loadingShow();

      let user = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(auth.currentUser);
        }, 1000);
      });

      user.then(result => {
        if (result) {
          this.$router.push("/practiceList");
          this.loadingHide();
        } else {
          this.loadingHide();
        }
      });
    }
  },
  async mounted() {
    this.checkUserLogin();
  }
};
</script>

<style>
.bg-login {
  background-image: url("../statics/bglogin.png");
  min-height: 100vh;
  background-position: left;
  background-repeat: no-repeat;
  width: 100%;
  background-size: cover;
}
</style>
