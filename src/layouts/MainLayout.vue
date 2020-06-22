<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-10" elevated v-if="$route.name!='practiceList' ">
      <q-toolbar>
        <q-toolbar-title class="q-pa-md" v-if="$route.name=='lessonMain' ">
          <span class="text-h6">ระดับการเรียน</span>
        </q-toolbar-title>
        <q-toolbar-title
          class="q-pa-md"
          v-if="$route.name=='practiceList' || $route.name=='practiceMain' "
        >
          <span class="text-h6">แบบฝึกหัด</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name=='flashcardMain' ">
          <span class="text-h6">การ์ดคำศัพท์</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name=='multipleMain' ">
          <span class="text-h6">เลือกคำตอบ</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name=='expressionMain' ">
          <span class="text-h6">ประโยคสนทนา</span>
        </q-toolbar-title>
        <q-toolbar-title class="q-pa-md" v-if="$route.name=='vdoMain' ">
          <span class="text-h6">บทสนทนา</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-1 bg-blue-grey-10 row "
      :width="100"
    >
      <div
        class="row text-body2 text-white self-start"
        style="border-right: 1px solid #000"
        align="center"
      >
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="$route.name=='practiceList'?'active-line active-text':'no-active-line'"
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
          :class="$route.name=='lessonMain'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/lessonMain')"
        >
          <div>
            <q-icon name="fas fa-signal" size="25px" />
          </div>
          <div class="q-pt-sm">ระดับการเรียน</div>
        </div>
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="$route.name=='businessMain'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/businessMain')"
        >
          <div>
            <q-icon name="fas fa-building" size="25px" />
          </div>
          <div class="q-pt-sm">กิจการ</div>
        </div>
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="$route.name=='accountMain'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/accountMain')"
        >
          <div>
            <q-icon name="fas fa-user-tie" size="25px" />
          </div>
          <div class="q-pt-sm">พนักงาน</div>
        </div>
        <div
          class="full-width q-py-md relative-position curso-r-pointer"
          :class="$route.name=='userMain'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/userMain')"
        >
          <div>
            <q-icon name="fas fa-user-edit" size="25px" />
          </div>
          <div class="q-pt-sm">ผู้ดูแลระบบ</div>
        </div>
        <div
          class="full-width q-py-md relative-position cursor-pointer"
          :class="$route.name=='userInfo'?'active-line active-text':'no-active-line'"
          v-ripple
          @click="$router.push('/userInfo')"
        >
          <div>
            <q-icon name="fas fa-cog" size="25px" />
          </div>
          <div class="q-pt-sm">โปรไฟล์</div>
        </div>
      </div>
      <div class="self-end"></div>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view
        :class="$route.name=='practiceList' ?'':'q-pa-md' "
        :style="$route.name=='practiceList' ?'':'max-width:1000px;width:100%;margin:auto' "
      />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    toPracticeList() {
      console.log("object");
    }
  }
};
</script>
<style lang="scss" scoped>
.active-line {
  border-left: 7px solid #90a4ae;
}
.active-text {
  color: #90a4ae;
}
.no-active-line {
  border-left: 7px solid #263238;
}
</style>