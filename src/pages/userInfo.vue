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
                <div class="text-body2 text-blue-grey-7">{{userInfo.name}}</div>
              </div>
              <div class="col-6 q-pr-sm" align="right">
                <q-icon name="fas fa-angle-right" />
              </div>
            </div>
            <q-separator class="q-m-md"></q-separator>

            <div class="row items-center">
              <div class="col-6 q-pa-md">
                <div class="text-subtitle1">อีเมล</div>
                <div class="text-body2 text-blue-grey-7">{{userInfo.email}}</div>
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
              @click="markLogOut()"
              v-ripple
              class="q-pa-md row items-center justify-center relative-position cursor-pointer"
              :class="isLogOutClick == true? 'bg-blue-grey-4' : 'bg-white'"
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
      <!-- box1 หน้าแรก -->
      <div v-if="mainPage == true" align="center" class="absolute-center" style="margin-left:10%">
        <div class="row justify-center items-center">
          <div>
            <q-icon name="fas fa-arrow-left" size="1.7em" />
          </div>
          <div class="q-ml-sm text-subtitle1">กรุณาเลือกการตั้งค่า</div>
        </div>
      </div>
      <div v-if="infoSetting == true" class="col q-pa-md">
        <user-setting :infoData="type"></user-setting>
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
      isPasswordClick: false,
      isLogOutClick: false,
      infoSetting: false,
      mainPage: true,
      type: "",
      userInfo: ""
    };
  },
  methods: {
    markName() {
      this.mainPage = false;
      this.infoSetting = true;
      this.isNameClick = true;
      this.isPasswordClick = false;
      this.isLogOutClick = false;
      this.type = "1";
    },
    markPassword() {
      this.mainPage = false;
      this.infoSetting = true;
      this.isPasswordClick = true;
      this.isNameClick = false;
      this.isLogOutClick = false;
      this.type = "2";
    },
    markLogOut() {
      this.mainPage = false;
      this.infoSetting = true;
      this.isNameClick = false;
      this.isPasswordClick = false;
      this.isLogOutClick = true;
      this.type = "3";
    }
  },
  async mounted() {
    this.userInfo = await this.getUserInfo(this.$q.localStorage.getItem("uid"));
    console.log(userInfo);
  }
};
</script>

<style lang="scss" scoped>
</style>