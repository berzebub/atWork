<template>
  <q-page>
    <div class="container-input">
      <div>
        <div class="text-subtitle1">ชื่อ นามสกุล</div>
        <q-input ref="name" outlined dense v-model="dataUser.name" :rules="[val => !!val ]"></q-input>
      </div>

      <div class="q-pt-md">
        <div class="text-subtitle1">อีเมล</div>
        <q-input
          :readonly="$route.name=='userEdit'"
          type="email"
          ref="email"
          outlined
          dense
          v-model="dataUser.email"
          lazy-rules
          :rules="[val => !!val 
          ,isCheckEmail,isValidEmail]"
        ></q-input>
      </div>

      <div class="q-pt-md">
        <div class="text-subtitle1">รหัสผ่าน</div>
        <div class="text-subtitle2">ตัวอักษรหรือตัวเลขไม่ต่ำกว่า 4 ตัวอักษร</div>

        <q-input
          ref="password"
          v-model="dataUser.password"
          dense
          outlined
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => val.length>=6 ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <!-- checkbox -->
      <div class="row q-pt-md">
        <div class="text-subtitle1 row items-center">สิทธิ์การใช้การ</div>
        <div class="text-subtitle1">
          <q-checkbox @input="checkboxAll()" v-model="all" label="ทั้งหมด" />
        </div>
      </div>
      <div class="text-subtitle1">
        <q-option-group
          @input="checkbox()"
          :options="userOptions"
          label="Notifications"
          type="checkbox"
          v-model="dataUser.userGroup"
        />
      </div>
      <!-- ปุ่ม -->
      <div class="row q-pt-md">
        <div class="col-6">
          <q-btn dense style="width:150px" outline label="ยกเลิก" @click="cencel()"></q-btn>
        </div>
        <div class="col-6" align="right">
          <q-btn dense color="blue-grey-10" style="width:150px" label="บันทึก" @click="saveData()"></q-btn>
        </div>
      </div>
    </div>
    <!-- dialog บันทึกสำเร็จ -->
    <q-dialog v-model="saveDataDialog">
      <div
        class="bg-white row justify-center items-center"
        style="width:320px;height:200px"
        align="center"
      >
        <div>
          <q-icon name="far fa-check-circle" class="text-secondary" size="40px" />
          <div class="text-subtitle1 q-pt-md">บันทึกข้อมูลเรียบร้อยแล้ว</div>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, axios } from "../router";
export default {
  data() {
    return {
      dataUser: { name: "", email: "", password: "", userGroup: [] },

      isPwd: true,
      saveDataDialog: false,

      userOptions: [
        {
          label: "แบบฝึกหัด",
          value: "practice"
        },
        { label: "ระดับการเรียน", value: "level" },
        { label: "กิจการ", value: "organization" },
        { label: "พนักงาน", value: "personel" },
        { label: "ผู้ดูแลระบบ", value: "admin" }
      ],
      all: false
    };
  },
  methods: {
    cencel() {
      this.$router.push("userMain");
    },

    async saveData() {
      // check validate
      this.$refs.name.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (
        this.$refs.name.hasError ||
        this.$refs.email.hasError ||
        this.$refs.password.hasError
      ) {
        console.log("ยังไม่กรอกข้อมูล");
        return;
      }
      // check checkbox

      if (this.dataUser.userGroup == "") {
        console.log("ไม่ได้เลือกเช็คบ็อค");
        return;
      }
      this.loadingShow();
      // บันทึกข้อมูล
      if (this.$route.name == "userAdd") {
        let dataUser = {
          email: this.dataUser.email,
          password: this.dataUser.password,
          emailVerified: false,
          disabled: false,
          displayName: this.dataUser.name
        };
        let jsonString = JSON.stringify(dataUser);
        const url = `https://api-winner-adventures.herokuapp.com/createUser?user=${jsonString}`;
        let getCreateUser = await axios.get(url);
        let newDataUser = { ...this.dataUser };
        delete newDataUser.password;
        newDataUser.uid = getCreateUser.data.uid;

        db.collection("user_admin")
          .add(newDataUser)
          .then(() => {
            this.loadingHide();
            this.saveDataDialog = true;
            setTimeout(() => {
              this.$router.push("userMain");
            }, 1000);
          });
      } else {
        this.editMode();
      }
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "รูปแบบ E-mail ไม่ถูกต้อง";
    },
    async isCheckEmail(val) {
      if (this.$route.name != "userEdit") {
        let doc = await db
          .collection("user_admin")
          .where("email", "==", val)
          .get();
        return !doc.size || "E-mail นี้มีผู้ใช้งานแล้ว";
      }
    },
    checkboxAll() {
      if (this.all) {
        let test = this.userOptions.map(x => {
          return x.value;
        });
        this.dataUser.userGroup = test;
      } else {
        this.dataUser.userGroup = [];
      }
    },
    checkbox() {
      if (this.dataUser.userGroup.length == this.userOptions.length) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    loadDataEdit() {
      if (this.$route.params.name == undefined) {
        this.$router.push("userMain");
      } else {
        this.dataUser.name = this.$route.params.name;
        this.dataUser.email = this.$route.params.email;
        this.dataUser.password = this.$route.params.password;
        this.dataUser.userGroup = this.$route.params.userGroup;
        if (this.dataUser.userGroup.length == 5) {
          this.all = true;
        } else {
          this.all = false;
        }
      }
    },
    editMode() {
      db.collection("user_admin")
        .doc(this.$route.params.id)
        .update(this.dataUser)
        .then(() => {
          this.saveDataDialog = true;
          this.loadingHide();
          setTimeout(() => {
            this.$router.push("userMain");
          }, 1000);
        });
    }
  },
  mounted() {
    if (this.$route.name == "userEdit") {
      this.loadDataEdit();
    } else {
    }
  }
};
</script>

<style >
</style>