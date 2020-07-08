<template>
  <q-page class="text-blue-grey-10">
    <div class="mobile-only">
      <!-- ชื่อโรงแรม -->
      <div class="row">
        <div class="col-10">
          <q-select
            dense
            outlined
            v-model="hotelSelected"
            :options="hotelList"
            map-options
            emit-value
          />
        </div>
        <div class="col-2" align="center">
          <q-btn
            size="12px"
            @click="goToAddHotel()"
            flat
            round
            color="blue-grey-10"
            icon="far fa-edit"
          ></q-btn>
        </div>
      </div>
      <!-- เพิ่มแผนก -->
      <div align="center" class="q-mt-md text-subtitle1">
        <q-btn @click="addDepartment()" label="เพิ่มแผนก" color="blue-grey-10" style="width:148px"></q-btn>
      </div>
    </div>
    <!-- รายชื่อแผนก -->
    <q-dialog v-model="addDepartmentDialog">
      <div style="width:330px" class="bg-white">
        <div align="center" class="bg-blue-grey-10 text-white q-py-sm text-h6">เพิ่มแผนก</div>
        <div class="q-ma-md">
          <div class="text-subtitle1">ชื่อแผนก</div>
          <div>
            <q-input dense outlined v-model="departmentName"></q-input>
          </div>
          <div class="row">
            <div class="col-6 q-pr-sm q-py-md" align="right">
              <q-btn
                @click="cancelAddDepartment()"
                dense
                style="width:120px"
                outline
                label="ยกเลิก"
              ></q-btn>
            </div>
            <div class="col-6 q-pl-sm q-py-md">
              <q-btn
                @click="saveDepartment()"
                dense
                color="blue-grey-10"
                style="width:120px"
                label="ยืนยัน"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-dialog>
    <dialog-center :type="6" v-if="addDialogSucess" @autoClose="autoCloseDialog"></dialog-center>
    <div class="desktop-only"></div>
    <span></span>
  </q-page>
</template>

<script>
import { db } from "../router";
import dialogCenter from "../components/dialogSetting";
export default {
  components: {
    dialogCenter
  },
  data() {
    return {
      hotelSelected: "",
      hotelList: [],
      departmentAll: [],
      deparmentSelect: [],
      addDepartmentDialog: false,
      departmentName: "",
      addDialogSucess: false
    };
  },
  methods: {
    loadHotelList() {
      db.collection("hotel")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let temp = {
              value: element.id,
              label: element.data().name
            };
            this.hotelList.push(temp);
          });
          this.hotelSelected = this.hotelList[0].value;
          this.selectDepartment();
        });
    },
    goToAddHotel() {
      this.$router.push("hotelMain");
    },
    loadDepartment() {
      db.collection("department")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let temp = {
              id: element.id
            };
            let final = { ...temp, ...element.data() };

            this.departmentAll.push(final);
          });
        });
    },
    selectDepartment() {
      console.log(this.hotelSelected);
      this.deparmentSelect = this.departmentAll.filter(
        x => x.hotelId == this.hotelSelected
      );
    },
    cancelAddDepartment() {
      this.addDepartmentDialog = false;
    },
    saveDepartment() {
      db.collection("department")
        .add({
          hotelId: this.hotelSelected,
          name: this.departmentName
        })
        .then(() => {
          this.addDepartmentDialog = false;
          this.addDialogSucess = true;
        });
    },
    addDepartment() {
      this.addDepartmentDialog = true;
      this.departmentName = "";
    },
    autoCloseDialog(value) {
      this.addDialogSucess = value;
      console.log(value);
    }
  },
  mounted() {
    this.loadDepartment();
    this.loadHotelList();
  }
};
</script>

<style lang="scss" scoped>
</style>