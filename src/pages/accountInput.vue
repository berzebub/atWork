<template>
  <q-page>
    <div class="q-pb-lg">
      <div>ชื่อแผนก</div>
      <q-select
        v-model="dataEmployee.nameDepartmentSelect"
        dense
        outlined
        :options="departmentOptions"
        map-options
        emit-value
      />
    </div>
    <div>
      <div>ชื่อ นามสกุล</div>
      <q-input
        v-model.trim="dataEmployee.name"
        ref="adminName"
        outlined
        dense
        :rules="[value => !!value ]"
      ></q-input>
    </div>
    <div>
      <div>เบอร์โทร</div>
      <q-input
        v-model.trim="dataEmployee.phone"
        ref="adminPhone"
        outlined
        dense
        :rules="[value => !!value ]"
      ></q-input>
    </div>
    <div>
      <div>อีเมล</div>
      <q-input
        v-model.trim="dataEmployee.email"
        ref="email"
        outlined
        dense
        :rules="[value => !!value ]"
      ></q-input>
    </div>
    <div>
      <div>รหัสผ่าน</div>
      <q-input
        v-model.trim="dataEmployee.password"
        ref="password"
        outlined
        dense
        :rules="[value => !!value ]"
      ></q-input>
    </div>
    <div class="q-pb-md">
      <div>บทเรียนเริ่มต้น</div>
      <q-select
        v-model="dataEmployee.startLevel"
        dense
        outlined
        :options="levelOpions"
        map-options
        emit-value
      />
    </div>
    <div class="row">
      <div class="col-6 q-pr-sm q-py-md" align="right">
        <q-btn @click="cancelAddEmployee()" dense style="width:150px" outline label="ยกเลิก"></q-btn>
      </div>
      <div class="col-6 q-pl-sm q-py-md">
        <q-btn
          @click="saveEmployee()"
          dense
          color="blue-grey-10"
          style="width:150px"
          label="บันทึก"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      departmentOptions: [],
      levelOpions: [],
      dataEmployee: {
        nameDepartmentSelect: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        startLevel: ""
      },
      departmentAll: ""
    };
  },
  methods: {
    saveEmployee() {},
    cancelAddEmployee() {},
    loadDepartment() {
      db.collection("department")
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({ ...element.data(), departmentId: element.id });
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });

          this.departmentOptions = temp;
          this.dataEmployee.nameDepartmentSelect = this.departmentOptions[0];
        });
    }
  },
  mounted() {
    this.loadDepartment();
  }
};
</script>

<style >
</style>