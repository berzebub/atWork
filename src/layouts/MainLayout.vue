<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-10" elevated v-if="$route.name!='practiceList' ">
      <q-toolbar>
        <q-toolbar-title>Quasar App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      content-class="bg-grey-1 bg-blue-grey-10 row "
      :width="100"
    >
      <!-- <q-list class="text-center">
        แบบฝึกหัด
        <q-item clickable @click="toPracticeList()" class="brx">
          <q-item-section avatar >
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>แบบฝึกหัด</q-item-label>
          </q-item-section>
        </q-item>
        ระดับการเรียน
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>ระดับการเรียน</q-item-label>
          </q-item-section>
        </q-item>
        สถานประกอบการ
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>สถานประกอบการ</q-item-label>
          </q-item-section>
        </q-item>
        จัดการผู้ใช้
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>จัดการผู้ใช้</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>-->
      <div
        class="row text-body2 text-white self-start"
        style="border-right: 1px solid #ffff"
        align="center"
      >
        <div class="full-width q-py-md" style="border-left: 7px solid #90A4AE">
          <div>
            <q-icon name="book" size="25px" style="color:#90A4AE" />
          </div>
          <div class="q-pt-sm" style="color:#90A4AE">แบบฝึกหัด</div>
        </div>
        <div class="full-width q-py-md">
          <div>
            <q-icon name="fas fa-signal" size="25px" />
          </div>
          <div class="q-pt-sm">ระดับการเรียน</div>
        </div>
        <div class="full-width q-py-md">
          <div>
            <q-icon name="fas fa-building" size="25px" />
          </div>
          <div class="q-pt-sm">กิจการ</div>
        </div>
        <div class="full-width q-py-md">
          <div>
            <q-icon name="fas fa-user-tie" size="25px" />
          </div>
          <div class="q-pt-sm">พนักงาน</div>
        </div>
        <div class="full-width q-py-md">
          <div>
            <q-icon name="fas fa-user-edit" size="25px" />
          </div>
          <div class="q-pt-sm">ผู้ดูแลระบบ</div>
        </div>
        <div class="full-width q-py-md">
          <div>
            <q-icon name="fas fa-cog" size="25px" />
          </div>
          <div class="q-pt-sm">โปรไฟล์</div>
        </div>
      </div>
      <div class="self-end"></div>
    </q-drawer>

    <q-page-container>
      <router-view
        :class="$route.name=='practiceList' ?'':'q-pa-md' "
        :style="$route.name=='practiceList' ?'':'max-width:1000px;width:100%;margin:auto' "
        class="bg-grey-1"
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
