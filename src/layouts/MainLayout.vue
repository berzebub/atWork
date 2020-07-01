<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-blue-grey-10"
      elevated
      v-if="$route.name != 'practiceList' && $route.name != 'userInfo'"
    >
      <q-toolbar>
        <q-toolbar-title class="q-pa-md" v-if="$route.name == 'lessonMainList'">
          <span class="text-h6">ระดับการเรียน</span>
        </q-toolbar-title>
        <q-toolbar-title
          class="q-pa-md"
          v-if="$route.name == 'practiceList' || $route.name == 'practiceMain'"
        >
          <q-btn dense round flat size="12px" icon="fas fa-arrow-left" to="/practiceList"></q-btn>

          <span class="text-h6 q-ml-sm">แบบฝึกหัด</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name == 'flashcardMain'">
          <span class="text-h6">การ์ดคำศัพท์</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name == 'multipleMain'">
          <span class="text-h6">เลือกคำตอบ</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name == 'expressionMain'">
          <span class="text-h6">ประโยคสนทนา</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name == 'vdoMain'">
          <span class="text-h6">บทสนทนา</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- เมนูคอมพิวเตอร์ -->
    <q-drawer
      :breakpoint="800"
      show-if-above
      content-class="desktop-only bg-grey-1 bg-blue-grey-10 row "
      :width="100"
    >
      <div
        class="row text-body2 text-blue-grey-4 self-start"
        style="border-right: 1px solid #000"
        align="center"
        v-if="isLoadUserInfo"
      >
        <div
          v-if="userInfo.userGroup.includes('practice')"
          class="full-width q-py-md relative-position cursor-pointer"
          :class="
            $route.name == 'practiceList'
              ? 'active-line active-text'
              : 'no-active-line'
          "
          v-ripple
          @click="$router.push('/practiceList')"
        >
          <div>
            <q-icon name="book" size="25px" />
          </div>
          <div class="q-pt-sm">แบบฝึกหัด</div>
        </div>
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="
            $route.name == 'lessonMainList'
              ? 'active-line active-text'
              : 'no-active-line'
          "
          v-ripple
          @click="$router.push('/lessonMainList')"
          v-if="userInfo.userGroup.includes('level')"
        >
          <div>
            <q-icon name="fas fa-signal" size="25px" />
          </div>
          <div class="q-pt-sm" style="font-size: 14px">ระดับการเรียน</div>
        </div>
        <!-- <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="$route.name=='businessMain'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/businessMain')"
        >
          <div>
            <q-icon name="fas fa-building" size="25px" />
          </div>
          <div class="q-pt-sm">กิจการ</div>
        </div>-->
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="
            $route.name == 'accountMain'
              ? 'active-line active-text'
              : 'no-active-line'
          "
          v-ripple
          @click="$router.push('/accountMain')"
          v-if="userInfo.userGroup.includes('personel')"
        >
          <div>
            <q-icon name="fas fa-user-tie" size="25px" />
          </div>
          <div class="q-pt-sm">ผู้ใช้งาน</div>
        </div>
        <div
          class="full-width q-py-md relative-position curso-r-pointer"
          :class="
            $route.name == 'userMain'
              ? 'active-line active-text'
              : 'no-active-line'
          "
          v-ripple
          @click="$router.push('/userMain')"
          v-if="userInfo.userGroup.includes('admin')"
        >
          <div>
            <q-icon name="fas fa-user-edit" size="25px" />
          </div>
          <div class="q-pt-sm">ผู้ดูแลระบบ</div>
        </div>
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="
            $route.name == 'userInfo'
              ? 'active-line active-text'
              : 'no-active-line'
          "
          v-ripple
          @click="$router.push('/userInfo')"
        >
          <div>
            <q-icon name="fas fa-cog" size="25px" />
          </div>
          <div class="q-pt-sm">ตั้งค่า</div>
        </div>
      </div>
      <div class="self-end"></div>
    </q-drawer>
    <!-- เมนูมือถือ -->
    <q-footer elevated>
      <div class="mobile-only row bg-blue-grey-10 text-blue-grey-4" align="center">
        <div
          class="col q-pa-xs q-pt-sm relative-position cursor-pointer"
          :class="
            $route.name == 'practiceMain' || $route.name == 'practiceList'
              ? 'active-line-bottom active-text'
              : 'no-active-line-bottom'
          "
          @click="$router.push('/practiceList')"
          v-ripple
        >
          <q-icon name="book" size="25px" />
          <br />
          <span style="font-size:11px">แบบฝึกหัด</span>
        </div>
        <div
          class="col q-pa-xs q-pt-sm relative-position cursor-pointer"
          :class="
            $route.name == 'lessonMainList'
              ? 'active-line-bottom active-text'
              : 'no-active-line-bottom'
          "
          @click="$router.push('/lessonMainList')"
          v-ripple
        >
          <q-icon name="fas fa-signal" size="25px" />
          <br />
          <span style="font-size:11px">ระดับการเรียน</span>
        </div>
        <div
          class="col q-pa-xs q-pt-sm relative-position cursor-pointer"
          :class="
            $route.name == 'accountMain'
              ? 'active-line-bottom active-text'
              : 'no-active-line-bottom'
          "
          @click="$router.push('/accountMain')"
          v-ripple
        >
          <q-icon name="fas fa-user-tie" size="25px" />
          <br />
          <span style="font-size:11px">ผู้ใช้งาน</span>
        </div>
        <div
          class="col q-pa-xs q-pt-sm relative-position cursor-pointer"
          :class="
            $route.name == 'userMain'
              ? 'active-line-bottom active-text'
              : 'no-active-line-bottom'
          "
          @click="$router.push('/userMain')"
          v-ripple
        >
          <q-icon name="fas fa-user-edit" size="25px" />
          <br />
          <span style="font-size:11px">ผู้ดูแลระบบ</span>
        </div>
        <div
          class="col q-pa-xs q-pt-sm relative-position cursor-pointer"
          :class="
            $route.name == 'userInfo'
              ? 'active-line-bottom active-text'
              : 'no-active-line-bottom'
          "
          @click="$router.push('/userInfo')"
          v-ripple
        >
          <q-icon name="fas fa-cog" size="25px" />
          <br />
          <span style="font-size:11px">ตั้งค่า</span>
        </div>
      </div>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view
        :class="
          $route.name == 'practiceList' || $route.name == 'userInfo'
            ? ''
            : 'q-pa-md'
        "
        :style="
          $route.name == 'practiceList' || $route.name == 'userInfo'
            ? ''
            : 'max-width:1000px;width:100%;margin:auto'
        "
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { auth, db } from "../router";
export default {
  name: "MainLayout",

  data() {
    return {
      userInfo: "",
      isLoadUserInfo: false,
      isKey: false,
      loginKey: ""
    };
  },
  methods: {
    async loadUserInfo() {
      let getLoginKey = this.$q.localStorage.getItem("loginKey");
      let uid = this.$q.localStorage.getItem("uid");
      this.userInfo = await this.getUserInfo(uid);
      this.isLoadUserInfo = true;
      db.collection("user_admin")
        .where("uid", "==", uid)
        .onSnapshot(getUserId => {
          if (getLoginKey != getUserId.docs[0].data().loginKey) {
            this.logOut();
          }
        });
    }
  },
  mounted() {
    this.loadUserInfo();
  }
};
</script>
<style lang="scss" scoped>
.active-line {
  border-left: 7px solid #fff;
}
.active-text {
  color: #fff;
}
.no-active-line {
  border-left: 7px solid #263238;
}
.active-line-bottom {
  border-bottom: 5px solid #fff;
}
.no-active-line-bottom {
  border-bottom: 5px solid #263238;
}
</style>
