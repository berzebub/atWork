<template>
  <q-page class="text-blue-grey-10">
    <div class="mobile-only">
      <!-- ชื่อโรงแรม -->
      <div class="row items-end">
        <div class="col-10">
          <q-select
            dense
            outlined
            v-model="hotelSelectedId"
            :options="hotelList"
            map-options
            emit-value
            @input="selectDepartment()"
          />
        </div>
        <div class="col-2" align="center">
          <q-btn
            dense
            size="14px"
            @click="goToAddHotel()"
            flat
            round
            color="blue-grey-10"
            icon="far fa-edit"
          ></q-btn>
        </div>
      </div>
      <!-- เพิ่มแผนก -->
      <div align="center" class="q-py-md text-subtitle1">
        <q-btn @click="addDepartment()" label="เพิ่มแผนก" color="blue-grey-10" style="width:148px"></q-btn>
      </div>
    </div>
    <!-- รายชื่อแผนก -->
    <q-separator />
    <div v-for="(item,index) in deparmentSelect " :key="index" @click="filterEmployee(item)">
      <!-- show ชื่อแผนก -->
      <q-toolbar class="no-padding">
        <q-toolbar-title class="text-subtitle1">
          <q-icon v-if="clickedToolbar!=item.departmentId" name="fas fa-chevron-down"></q-icon>
          <q-icon v-else name="fas fa-chevron-up"></q-icon>
          {{item.name}}
        </q-toolbar-title>
        <q-btn @click.stop="addEmployee()" icon="fas fa-user-plus" flat size="10px"></q-btn>
        <q-btn @click.stop="deleteDepartment()" icon="far fa-trash-alt" flat size="10px"></q-btn>
        <q-btn @click.stop="editDepartment()" icon="fas fa-edit" flat size="10px"></q-btn>
      </q-toolbar>
      <q-separator v-if="clickedToolbar!=item.departmentId" />
      <!-- ชื่อพนักงาน -->

      <div v-if="clickedToolbar==item.departmentId">
        <div v-if="employeeList.length == 0">
          <!-- กรณีไม่มีพนักงานในแผนก -->
          <div
            v-if="employeeList.length==0"
            class="text-body2 q-py-md"
            align="center"
          >กรุณาเพิ่มพนักงาน</div>
        </div>
        <div v-for="(item2,index2) in employeeList" :key="index2">
          <!-- กรณีมีพนักงาน -->
          <q-toolbar class="no-padding">
            <q-toolbar-title class="text-body2 q-pl-lg">
              <span class="q-pl-md">{{index2+1}}. {{item2.name}}</span>
            </q-toolbar-title>
            <q-btn class="invisible" icon="far fa-trash-alt" flat size="10px"></q-btn>
            <q-btn @click.stop="deleteEmployee()" icon="far fa-trash-alt" flat size="10px"></q-btn>
            <q-btn @click.stop="editEmployee()" icon="fas fa-edit" flat size="10px"></q-btn>
          </q-toolbar>
        </div>
        <q-separator />
      </div>
    </div>

    <!-- Dialod เพิ่มชื่อแผนก -->
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
      hotelSelectedId: "",
      hotelList: [],
      departmentAll: [],
      deparmentSelect: [],
      addDepartmentDialog: false,
      departmentName: "",
      addDialogSucess: false,
      userList: "",
      clickedToolbar: "",
      employeeAll: "",
      employeeList: ""
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
          this.hotelList.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.hotelSelectedId = this.hotelList[0].value;
          this.selectDepartment();
          this.loadEmployee();
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
              departmentId: element.id
            };

            let final = { ...temp, ...element.data() };

            this.departmentAll.push(final);
          });
        });
    },

    selectDepartment() {
      console.log(this.hotelSelectedId);
      this.deparmentSelect = this.departmentAll.filter(
        x => x.hotelId == this.hotelSelectedId
      );
      this.loadEmployee();
    },
    cancelAddDepartment() {
      this.addDepartmentDialog = false;
    },
    saveDepartment() {
      db.collection("department")
        .add({
          hotelId: this.hotelSelectedId,
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
      console.log(value);
      this.addDialogSucess = false;
    },
    filterEmployee(data) {
      console.log(data);
      if (
        data.departmentId == this.clickedToolbar &&
        this.clickedToolbar != ""
      ) {
        this.clickedToolbar = "";
      } else {
        this.employeeList = this.employeeAll.filter(
          x => x.departmentId == data.departmentId
        );
        this.clickedToolbar = data.departmentId;
      }
    },
    loadEmployee() {
      db.collection("employee")
        .where("hotelId", "==", this.hotelSelectedId)
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({ ...element.data(), employeeId: element.id });
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.employeeAll = temp;
        });
    },
    addEmployee() {},
    deleteDepartment() {},
    editDepartment() {},
    deleteEmployee() {},
    editEmployee() {}
  },
  mounted() {
    this.loadDepartment();
    this.loadHotelList();
  }
};
</script>

<style lang="scss" scoped>
</style>