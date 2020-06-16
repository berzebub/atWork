<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <q-item clickable @click="toPracticeList()">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>

          <q-item-section>
            <q-item-label>แบบฝึกหัด</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view style="width:1000px; margin:auto " />
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
