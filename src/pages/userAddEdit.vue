<template>
  <q-page>
    <div class="container-input">
      <div>
        <div class="text-subtitle1">ชื่อ</div>
        <q-input outlined dense v-model="dataUser.name" :rules="[val => !!val || 'กรุณาใส่ชื่อ']"></q-input>
      </div>
      <div class="q-pt-md">
        <div class="text-subtitle1">นามสกุล</div>
        <q-input
          outlined
          dense
          v-model="dataUser.surname"
          :rules="[val => !!val || 'กรุณาใส่นามสกุล']"
        ></q-input>
      </div>
      <div class="q-pt-md">
        <div class="text-subtitle1">E-mail</div>
        <q-input
          outlined
          dense
          v-model="dataUser.email"
          :rules="[val => !!val || 'รูปแบบ E-mail ไม่ถูกต้อง']"
        ></q-input>
      </div>

      <div class="q-pt-md">
        <div class="text-subtitle1">รหัสผ่าน</div>
        <div class="text-subtitle2">ตัวอักษรหรือตัวเลขไม่ต่ำกว่า 4 ตัวอักษร</div>

        <q-input
          v-model="dataUser.password"
          dense
          outlined
          :type="isPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'กรุณาใช้รหัสผ่านที่มีความยาวไม่ต่ำกว่า 4 ตัวอักษร']"
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
          <q-checkbox v-model="all" label="ทั้งหมด" />
        </div>
      </div>
      <div class="text-subtitle1">
        <q-option-group
          :options="userOptions"
          label="Notifications"
          type="checkbox"
          v-model="userGroup"
        />
      </div>
      <!-- ปุ่ม -->
      <div class="row q-pt-md">
        <div class="col-6">
          <q-btn dense style="width:150px" outline label="ยกเลิก" @click="cencel()"></q-btn>
        </div>
        <div class="col-6" align="right">
          <q-btn dense color="blue-grey-10" style="width:150px" label="บันทึก"></q-btn>
        </div>
      </div>
    </div>
    <!-- dialog บันทึกสำเร็จ -->
    <q-dialog v-model="saveData">
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
export default {
  data() {
    return {
      dataUser: { name: "", surname: "", email: "" },

      isPwd: true,
      saveData: false,
      userGroup: [],
      userOptions: [
        {
          label: "แบบฝึกหัด",
          value: "practice"
        },
        { label: "ระดับการเรียน", value: "level" },
        { label: "สถานประกอบการ", value: "organization" },
        { label: "พนักงาน", value: "personel" },
        { label: "ผู้ดูแลระบบ", value: "admin" }
      ],
      all: false
    };
  },
  methods: {
    cencel() {
      this.$router.push("userMain");
    }
  }
};
</script>

<style >
</style>