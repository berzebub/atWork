<template>
  <q-page class="text-blue-grey-10">
    <!-- practiceList -->
    <!-- show content -->
    <div class="row">
      <div
        class
        :class="$q.platform.is.desktop?'col-3':'col-12'"
        :style="$q.platform.is.desktop? 'width: 360px;': 'width: 100%'"
      >
        <div class="q-pa-md bg-blue-grey-10 shadow-5">
          <div>
            <span class="text-white text-h6">ตั้งค่า</span>
          </div>
        </div>
        <div class="shadow-3 bg-white row" style=" height: calc(100vh - 64px)">
          <div class="col-12">
            <div
              @click="markName()"
              class="row items-center cursor-pointer relative-position"
              :class="isNameClick == true? 'bg-blue-grey-4' : 'bg-white'"
              v-ripple
            >
              <div class="col-6 q-pa-md">
                <div class="text-subtitle1">ชื่อ - สกุล</div>
                <div class="text-body2 text-blue-grey-7">Ploy Kik</div>
              </div>
              <div class="col-6 q-pr-sm" align="right">
                <q-icon name="fas fa-angle-right" />
              </div>
            </div>
            <q-separator class="q-m-md"></q-separator>

            <div class="row items-center cursor-pointer">
              <div class="col-6 q-pa-md">
                <div class="text-subtitle1">อีเมล</div>
                <div class="text-body2 text-blue-grey-7">PloyKik@gmail.com</div>
              </div>
            </div>
            <q-separator class="q-m-md"></q-separator>

            <div
              @click="markPassword()"
              class="row items-center cursor-pointer relative-position"
              :class="isPasswordClick == true? 'bg-blue-grey-4' : 'bg-white'"
              v-ripple
            >
              <div class="col-6 q-pa-md q-py-lg">
                <div class="text-subtitle1">รหัสผ่าน</div>
              </div>
              <div class="col-6 q-pr-sm" align="right">
                <q-icon name="fas fa-angle-right" />
              </div>
            </div>
            <q-separator class="q-m-md"></q-separator>
          </div>

          <div class="col-12 self-end">
            <q-separator></q-separator>
            <div
              @click="logOut()"
              v-ripple
              class="q-pa-md row items-center justify-center relative-position cursor-pointer"
            >
              <div class="q-mr-md">
                <q-icon size="1.7em" name="fas fa-sign-out-alt" />
              </div>
              <div>
                <div class="text-subtitle1 q-my-xs">ออกจากระบบ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col q-pa-md">
        <user-setting></user-setting>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
import userSetting from "../components/userSetting";
export default {
  components: {
    userSetting
  },
  data() {
    return {
      isNameClick: false,
      isPasswordClick: false
    };
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .then(() => {
          this.$q.localStorage.clear();
          this.$router.push("/");
          console.log("loginkey ไม่เท่ากัน");
        })
        .catch(function(error) {});
    },
    markName() {
      this.isNameClick = true;
      this.isPasswordClick = false;
    },
    markPassword() {
      this.isPasswordClick = true;
      this.isNameClick = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>