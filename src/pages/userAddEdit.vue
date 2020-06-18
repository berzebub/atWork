<template>
  <div>
    <div>
      <div>
        <div class="text-h6">ชื่อ</div>
        <q-input outlined v-model="dataUser.name"></q-input>
      </div>
      <div class="q-pt-md">
        <div class="text-h6">นามสกุล</div>
        <q-input outlined v-model="dataUser.surname"></q-input>
      </div>
      <div class="q-pt-md">
        <div class="text-h6">E-mail</div>
        <q-input outlined v-model="dataUser.email"></q-input>
      </div>

      <div class="q-pt-md">
        <div class="text-h6">รหัสผ่าน</div>
        <div class="text-subtitle1">ตัวอักษรหรือตัวเลขไม่ต่ำกว่า 4 ตัวอักษร</div>

        <q-input v-model="dataUser.password" outlined :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="row q-py-md">
        <div class="col-6">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model="userOptions"
            val="admin"
            label="ผู้ดูแลระบบ"
          />
        </div>
        <div class="col-6">
          <q-radio
            style="margin:-10px"
            color="blue-grey-10"
            v-model="userOptions"
            val="user"
            label="ผู้ใช้งาน"
          />
        </div>
      </div>
      <div class="row q-pt-md">
        <div class="col-6">
          <q-btn style="width:150px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6">
          <q-btn unelevated color="blue-grey-10" style="width:150px" label="บันทึก"></q-btn>
        </div>
      </div>
    </div>
    <!-- dialog บันทึกสำเร็จ -->
    <q-dialog v-model="saveData">
      <div class="bg-white q-py-lg" style="width:320px" align="center">
        <div>
          <q-icon name="far fa-check-circle" class="text-secondary" size="40px" />
        </div>
        <div class="text-subtitle1 q-py-md">บันทึกข้อมูลเรียบร้อยแล้ว</div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataUser: { name: "", surname: "", email: "" },

      userOptions: "admin",
      isPwd: true,
      saveData: true
    };
  }
};
</script>

<style >
</style>