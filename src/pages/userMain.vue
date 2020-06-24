<template>
  <q-page>
    <div class="container">
      <div align="center">
        <q-btn style="width:190px" color="blue-grey-10" label="เพิ่ม" @click="addUser()"></q-btn>
      </div>
      <div>
        <q-card class="rounded-borders q-py-md q-mt-lg br" v-for="item in nameArr" :key="item.id">
          <q-card-section class="no-padding">
            <q-btn class="q-mb-md q-ml-md" dense color="blue-grey-10" round :label="item"></q-btn>
          </q-card-section>
          <q-card-section
            class="no-padding"
            v-for="(item2,index) in dataUser.filter(x => x.name[0] == item)"
          >
            <div class="row q-px-md">
              <div class="col-11">
                <div class="text-subtitle1">{{ item2.name}}</div>
                <div class="text-subtitle2 text-blue-grey-7">{{item2.email }}</div>
                <span v-for="(item3,index) in item2.userGroup " :key="item3">
                  <q-badge :label="item3" color="blue-grey-7" outline class="q-mr-sm q-mt-sm"></q-badge>
                </span>
              </div>
              <div class="col" align="right">
                <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                  <q-menu :offset="[-15, 0]" self="top right">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="editBtn(item2)">แก้ไขข้อมูล</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="deleteBtn(item2)">ลบ</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
            <q-separator
              v-if="index != dataUser.filter(x => x.name[0] == item).length - 1"
              class="q-my-md"
            />
          </q-card-section>
        </q-card>
      </div>
      <!-- dialog ต้องการลบข้อมูล -->
      <q-dialog v-model="deleteDataDialog">
        <div
          class="bg-white row justify-center items-center"
          style="width:320px;height:152px"
          align="center"
        >
          <div>
            <div class="text-subtitle1 q-pb-md">คุณต้องการลบ "{{nameDialog}}" หรือไม่</div>
            <div class="row q-pt-md">
              <div class="col-6 q-pr-sm">
                <q-btn dense style="width:120px" outline label="ยกเลิก" @click="cencel()"></q-btn>
              </div>
              <div class="col-6 q-pl-sm" align="right">
                <q-btn
                  dense
                  color="blue-grey-10"
                  style="width:120px"
                  label="ยืนยัน"
                  @click="confirm()"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { db, axios } from "../router";
export default {
  data() {
    return {
      deleteKey: "",
      dataUser: [],
      nameArr: "",
      deleteDataDialog: false,
      nameDialog: ""
    };
  },
  methods: {
    loadDataUser() {
      db.collection("user_admin").onSnapshot(doc => {
        let nameArr = [];
        let userTemp = [];
        doc.forEach(element => {
          nameArr.push(element.data().name[0]);
          let dataKey = {
            id: element.id
          };
          let dataFinal = {
            ...dataKey,
            ...element.data()
          };

          userTemp.push(dataFinal);
        });

        nameArr = [...new Set(nameArr)];

        nameArr.sort((a, b) => {
          return a < b ? -1 : 1;
        });
        this.nameArr = nameArr;

        userTemp.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        this.dataUser = userTemp;
      });
    },

    addUser() {
      this.$router.push("userAdd");
    },
    editBtn(data) {
      this.$router.push({ name: "userEdit", params: data });
    },
    deleteBtn(id) {
      this.deleteKey = id.id;
      this.nameDialog = id.name;
      this.deleteDataDialog = true;
    },
    cencel() {
      this.deleteDataDialog = false;
    },
    confirm() {
      db.collection("user_admin")
        .doc(this.deleteKey)
        .delete()
        .then(() => {
          this.deleteDataDialog = false;
          // this.loadDataUser();
        });
    }
  },
  mounted() {
    this.loadDataUser();
  }
};
</script>

<style lang="scss" scoped>
</style>