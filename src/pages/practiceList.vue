<template>
  <q-page class="text-blue-grey-10">
    <!-- practiceList -->
    <!-- show content -->
    <div class="q-pa-md bg-blue-grey-10 shadow-5" style="width: 360px">
      <span class="text-white text-h6">แบบฝึกหัด</span>
    </div>
    <div class="q-pt-md shadow-3 bg-white" style="width: 360px; height: calc(100vh - 64px)">
      <q-list class="rounded-borders">
        <q-expansion-item label="อาหารและเครื่องดื่ม">
          <q-card class="q-px-md q-pb-sm">
            <div class="row q-pb-sm relative-position cursor-pointer" v-ripple to="/practiceMain">
              <div class="col">1. จองโต๊ะ</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">2. สั่งอาหาร</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">3. สั่งเครื่องดื่ม</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
          </q-card>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item label="พนักงานต้อนรับ">
          <q-card class="q-px-md q-pb-sm">
            <div class="row q-pb-sm">
              <div class="col">1. จองโต๊ะ</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">2. สั่งอาหาร</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
            <div class="row q-pb-sm">
              <div class="col">3. สั่งเครื่องดื่ม</div>
              <div class="col-1" align="right">
                <q-icon name="fas fa-sync-alt"></q-icon>
              </div>
            </div>
          </q-card>
        </q-expansion-item>
        <q-separator />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>