<template>
  <q-page>
    <div class="container">
      <div class="q-pb-lg">
        <div>ชื่อแผนก</div>
        <q-select
          v-model="dataEmployee.departmentId"
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
          ref="name"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>เบอร์โทร</div>
        <q-input v-model.trim="dataEmployee.tel" ref="tel" outlined dense :rules="[val => !!val ]"></q-input>
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
          v-model="dataEmployee.startLevelId"
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
      <dialog-center :type="6" v-if="isAddDialogSucess" @autoClose=" addDialogSucess" />
    </div>
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
      departmentOptions: [],
      levelOpions: [],
      dataEmployee: {
        departmentId: "",
        name: "",
        tel: "",
        email: "",
        password: "",
        startLevelId: "",
        star: 0
      },
      departmentAll: "",
      isAddDialogSucess: false
    };
  },
  methods: {
    saveEmployee() {
      // check validate
      this.$refs.name.validate();
      this.$refs.tel.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (
        this.$refs.name.hasError ||
        this.$refs.tel.hasError ||
        this.$refs.password.hasError ||
        this.$refs.email.hasError
      ) {
        return console.log("กรอก input ไม่ครบ");
      }
      this.loadingShow();
      if (this.$route.name != "accountEdit") {
        db.collection("employee")
          .add({
            hotelId: this.$route.params.hotelId,
            departmentId: this.dataEmployee.departmentId,
            name: this.dataEmployee.name,
            email: this.dataEmployee.email,
            password: this.dataEmployee.password,
            startLevelId: this.dataEmployee.startLevelId,
            tel: this.dataEmployee.tel,
            star: 0
          })
          .then(() => {
            this.loadingHide();
            this.isAddDialogSucess = true;
          });
      } else {
        db.collection("employee")
          .doc(this.$route.params.employeeId)
          .update(this.dataEmployee)
          .then(() => {
            this.loadingHide();
            this.isAddDialogSucess = true;
          });
      }
    },
    cancelAddEmployee() {
      this.$router.push("/accountMain");
    },
    loadDepartment() {
      db.collection("department")
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            let newData = {
              value: element.id,
              label: element.data().name,
              hotelId: element.data().hotelId
            };
            temp.push(newData);
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });

          this.departmentAll = temp;
          this.filleDepartment();
        });
    },
    filleDepartment() {
      this.departmentOptions = this.departmentAll.filter(
        x => x.hotelId == this.$route.params.hotelId
      );

      console.log(
        this.departmentOptions.filter(
          x => x.value == this.$route.params.departmentId
        )
      );
      this.dataEmployee.departmentId = this.departmentOptions.filter(
        x => x.value == this.$route.params.departmentId
      )[0].value;
    },
    loadLevel() {
      this.loadingShow();
      db.collection("level")
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({
              value: element.id,
              label: element.data().name
            });
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.levelOpions = temp;

          this.dataEmployee.startLevelId = this.levelOpions[0].value;
          this.loadingHide();
        });
    },
    loadEdit() {
      db.collection("employee")
        .doc(this.$route.params.employeeId)
        .get()
        .then(doc => {
          this.dataEmployee.departmentId = doc.data().departmentId;
          this.dataEmployee.name = doc.data().name;
          this.dataEmployee.email = doc.data().email;
          this.dataEmployee.tel = doc.data().tel;
          this.dataEmployee.password = doc.data().password;
          this.dataEmployee.startLevelId = doc.data().startLevelId;
        });
    },
    addDialogSucess() {
      this.$router.push("/accountMain");
    }
  },
  mounted() {
    this.loadDepartment();
    this.loadLevel();
    if (this.$route.name == "accountEdit") {
      console.log("555");
      this.loadEdit();
      return;
    }
  }
};
</script>

<style >
</style>