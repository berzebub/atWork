<template>
  <q-page class="text-blue-grey-10">
    <!-- practiceList -->
    <!-- show content -->
    <div class="row">
      <div
        class
        :class="$q.platform.is.desktop?'col-3':'col-12'"
        :style="$q.platform.is.desktop? 'width: 300px;': 'width: 100%'"
      >
        <div class="q-pa-md bg-blue-grey-10 shadow-5">
          <div>
            <span class="text-white text-h6">แบบฝึกหัด</span>
          </div>
        </div>
        <div class="shadow-3 bg-white" style=" height: calc(100vh - 64px)">
          <q-list class="rounded-borders">
            <q-expansion-item label="อาหารและเครื่องดื่ม">
              <q-card>
                <div
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="activeKey==1?'bg-blue-grey-4':''"
                  v-ripple
                  @click="gotoEdit(1)"
                >
                  <div class="col">1. จองโต๊ะ</div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                  </div>
                </div>
                <div
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="activeKey==2?'bg-blue-grey-4':''"
                  v-ripple
                  @click="gotoEdit(2)"
                >
                  <div class="col">2. สั่งอาหาร</div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                  </div>
                </div>
                <div
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="activeKey==3?'bg-blue-grey-4 ':''"
                  v-ripple
                  @click="gotoEdit(3)"
                >
                  <div class="col">3. สั่งเครื่องดื่ม</div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                  </div>
                </div>
              </q-card>
            </q-expansion-item>
            <q-separator />
            <q-expansion-item label="พนักงานต้อนรับ">
              <q-card>
                <div
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="isActive?'bg-blue-grey-4':''"
                  v-ripple
                  @click="gotoEdit()"
                >
                  <div class="col">1. จองโต๊ะ</div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                  </div>
                </div>
                <div class="row q-px-md q-py-sm relative-position cursor-pointer" v-ripple>
                  <div class="col">2. สั่งอาหาร</div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                  </div>
                </div>
                <div class="row q-px-md q-py-sm relative-position cursor-pointer" v-ripple>
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
      </div>
      <div class="col q-pa-md">
        <practice-main v-if="isShowPracticeMain"></practice-main>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
import practiceMain from "../components/practiceMain.vue";
export default {
  components: {
    practiceMain
  },
  data() {
    return {
      isShowPracticeMain: false,
      isActive: false,
      activeKey: ""
    };
  },
  methods: {
    gotoEdit(key) {
      this.activeKey = key;

      if (this.$q.platform.is.desktop) {
        this.isShowPracticeMain = true;
      } else {
        this.$router.push("/practiceMain"); //ต้องใส่ key เพื่อไปยัง L/U นั้น
      }
    },
    gotoPractice(practiceType) {
      if (practiceType == "flashcard") {
        this.$router.push("/flashcard");
      } else if (practiceType == "multipleChoies") {
        this.$router.push("/multipleMain");
      } else if (practiceType == "expression") {
        this.$router.push("/expressionMain/a/a");
      } else if (practiceType == "vdo") {
        this.$router.push("/vdo");
      } else {
        // ไม่อยู่ type ไหนเลยให้แก้ มีแจ้งเตือน
        this.$router.push("/practiceList");
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>