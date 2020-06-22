<template>
  <div class="container" align="center">
    <div class="text-h6" align="center">
      <span>อาหารและเครื่องดื่ม</span>
      <br />
      <span>1. จองโต๊ะ</span>
    </div>
    <!-- ปุ่มเพิ่มแบบฝึกหัด -->
    <div class="q-pa-md">
      <q-btn
        @click="addQuestion()"
        style="width:190px"
        dense
        color="blue-grey-10"
        label="เพิ่มแบบฝึกหัด"
      />
    </div>
    <!-- การ์ดแบบฝึกหัด -->

    <div style="border: 1px solid #263238; border-radius: 5px">
      <div class="bg-blue-grey-10 text-white q-pa-sm row" align="left">
        <div class="col">รหัสลำดับ 2000</div>
        <div class="col-1" align="right">
          <q-icon name="fas fa-ellipsis-v"></q-icon>
        </div>
      </div>
      <div class="row q-py-sm">
        <div class="col q-pa-sm" align="left">การ์ดคำศัพท์</div>

        <div class="row" :class="$q.platform.is.desktop ? 'col-2':'col-4'" align="center">
          <div class="col">
            <q-btn round color="blue-grey-10" icon="fas fa-sync-alt" />
          </div>
          <div class="col">
            <q-btn round color="blue-grey-10" icon="fas fa-pencil-alt" />
          </div>
        </div>
      </div>
    </div>
  </div>
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