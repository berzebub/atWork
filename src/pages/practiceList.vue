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
          <q-list class="rounded-borders" v-for="(itemLv,index) in levelList" :key="index">
            <q-expansion-item
              :label="itemLv.name"
              @click="showUnit(itemLv.levelId)"
              group="unitgroup"
              :disable="unitList.filter(x => x.levelId == itemLv.levelId).length == 0"
            >
              <!-- <q-separator /> -->
              <q-card v-for="(itemUnit,index2) in unitListShow" :key="index2">
                <div
                  class="row q-px-md q-py-sm relative-position cursor-pointer"
                  :class="activeKey==itemUnit.unitId?'bg-blue-grey-4':''"
                  v-ripple
                  @click="gotoEdit(itemUnit.unitId,itemUnit.levelId,index2,itemUnit.label,itemLv.name)"
                >
                  <div class="col">
                    {{itemUnit.order}} -
                    <span style="text-decoration:underline">{{itemUnit.label}}</span>
                  </div>
                  <div class="col-1" align="right">
                    <q-icon name="fas fa-sync-alt"></q-icon>
                    <!-- เช็คว่ามีการซิงค์มั๊ย -->
                  </div>
                </div>
                <!-- <q-separator />  -->
              </q-card>
            </q-expansion-item>
            <q-separator />
          </q-list>
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
      unitId: "",
      num: "",
      unitName: "",
      levelName: ""
    };
  },
  methods: {
    gotoEdit(unitId, levelId, index, unitName, levelName) {
      this.isShowPracticeMain = false;
      this.activeKey = unitId;
      this.levelId = levelId;
      this.unitId = unitId;
      this.num = index + 1;
      this.unitName = unitName;
      this.levelName = levelName;
      if (this.$q.platform.is.desktop) {
        this.isShowPracticeMain = true;
      } else {
        this.$router.push("/practiceMain"); //ต้องใส่ key เพื่อไปยัง L/U นั้น
      }
    },

    loadLevel() {
      db.collection("level")
        .get()
        .then(doc => {
          // console.log("level");
          doc.forEach(element => {
            let showData = {
              levelId: element.id,
              name: element.data().name
            };
            this.levelList.push(showData);
            this.levelList.sort((a, b) => {
              return a.name > b.name ? 1 : -1;
            });
          });

          this.loadUnit();
        });
    },
    loadUnit() {
      db.collection("unit")
        .get()
        .then(doc => {
          // console.log("unit");
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
      // console.log(levelId);
      this.unitListShow = this.unitList.filter(x => x.levelId == levelId);
    }
  },
  mounted() {
    this.loadLevel();
  }
};
</script>

<style lang="scss" scoped>
</style>