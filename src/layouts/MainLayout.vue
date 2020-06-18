<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-10" elevated>
      <q-toolbar>
        <q-toolbar-title>Quasar App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <!-- แบบฝึกหัด -->
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>แบบฝึกหัด</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ระดับการเรียน -->
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>ระดับการเรียน</q-item-label>
          </q-item-section>
        </q-item>
        <!-- สถานประกอบการ -->
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>สถานประกอบการ</q-item-label>
          </q-item-section>
        </q-item>
        <!-- จัดการผู้ใช้ -->
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>จัดการผู้ใช้</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        :class="$route.name=='practiceList' ?'':'q-pa-md' "
        style="max-width:1000px;width:100%;margin:auto"
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
