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
            <span class="text-white text-h6">แบบฝึกหัด</span>
          </div>
        </div>
        <div class="shadow-3 bg-white" style=" height: calc(100vh - 64px)">
          <div class="row items-center">
            <div class="col-6 q-pa-md">
              <div class="text-subtitle1">ชื่อ - สกุล</div>
              <div class="text-body2 text-blue-grey-7">Ploy Kik</div>
            </div>
            <div class="col-6 q-pr-sm" align="right">
              <q-icon name="fas fa-angle-right" />
            </div>
          </div>
          <q-separator class="q-m-md"></q-separator>
          <div class="row items-center">
            <div class="col-6 q-pa-md">
              <div class="text-subtitle1">อีเมล</div>
              <div class="text-body2 text-blue-grey-7">PloyKik@gmail.com</div>
            </div>
          </div>
          <q-separator class="q-m-md"></q-separator>
          <div class="row items-center">
            <div class="col-6 q-pa-md text-subtitle1">รหัสผ่าน</div>
            <div class="col-6 q-pr-sm" align="right">
              <q-icon name="fas fa-angle-right" />
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pa-md">
        <practice-main
          v-if="isShowPracticeMain"
          :levelId="levelId"
          :unitId="unitId"
          :unitName="unitName"
          :num="num"
          :levelName="levelName"
        ></practice-main>
      </div>
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