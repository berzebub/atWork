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
            <q-expansion-item
              v-for="(itemLv,index) in levelList"
              :key="index"
              :label="itemLv.label"
              @click="showUnit(itemLv.levelId)"
              group="unitgroup"
            >
              <q-card>
                <div
                  v-for="(item2,index2) in unitListShow"
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="activeKey==item2.unitId?'bg-blue-grey-4':''"
                  v-ripple
                  @click="gotoEdit(item2.unitId,item2.levelId)"
                >
                  <div class="col">{{index2+1}}. {{item2.label}}</div>
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
        <practice-main v-if="isShowPracticeMain" :levelId="levelId" :unitId="unitId"></practice-main>
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
      activeKey: "",
      levelList: [],
      unitList: [],
      unitListShow: [],
      levelId: "",
      unitId: ""
    };
  },
  methods: {
    gotoEdit(unitId, levelId) {
      this.activeKey = unitId;
      this.levelId = levelId;
      this.unitId = unitId;
      if (this.$q.platform.is.desktop) {
        this.isShowPracticeMain = true;
      } else {
        this.$router.push("/practiceMain"); //ต้องใส่ key เพื่อไปยัง L/U นั้น
      }
    },
    gotoPractice(practiceType) {
      if (practiceType == "flashcard") {
        this.$router.push("/flashcard/");
      } else if (practiceType == "multipleChoies") {
        this.$router.push("/multipleMain/");
      } else if (practiceType == "expression") {
        this.$router.push("/expressionMain/");
      } else if (practiceType == "vdo/") {
        this.$router.push("/vdo");
      } else {
        // ไม่อยู่ type ไหนเลยให้แก้ มีแจ้งเตือน
        this.$router.push("/practiceList");
      }
    },
    loadLevel() {
      db.collection("level")
        .get()
        .then(doc => {
          console.log("level");
          doc.forEach(element => {
            let showData = {
              levelId: element.id,
              label: element.data().name
            };
            this.levelList.push(showData);
            this.levelList.sort((a, b) => {
              return a.label - b.label ? 1 : -1;
            });
          });
          this.loadUnit();
        });
    },
    loadUnit() {
      db.collection("unit")
        .get()
        .then(doc => {
          console.log("unit");
          doc.forEach(element => {
            let showData = {
              unitId: element.id,
              levelId: element.data().levelId,
              label: element.data().name,
              order: element.data().order
            };
            this.unitList.push(showData);
            this.unitList.sort((a, b) => {
              return a.order - b.order;
            });
          });
        });
    },
    showUnit(levelId) {
      console.log(levelId);
      this.unitListShow = this.unitList.filter(x => x.levelId == levelId);
    },
    test(key) {
      console.log(key);
    }
  },
  mounted() {
    this.loadLevel();
  }
};
</script>

<style lang="scss" scoped>
</style>