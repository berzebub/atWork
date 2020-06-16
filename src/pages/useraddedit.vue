<template>
  <div>
    <div align="center">ผู้ใช้งาน</div>
    <div>
      <q-input outlined v-model="dataUser.name" label="ชื่อ"></q-input>
    </div>
    <div>
      <q-input outlined v-model="dataUser.surname" label="นามสกุล"></q-input>
    </div>
    <div>
      <q-input outlined v-model="dataUser.email" label="E-mail"></q-input>
    </div>
    <div>
      <q-input outlined v-model="dataUser.tel" label="เบอร์โทร"></q-input>
    </div>
    <div>
      <q-input outlined v-model="dataUser.password" label="รหัสผ่าน"></q-input>
    </div>
    <div>
      <q-btn outlined label="ยกเลิก"></q-btn>
      <q-btn output label="บันทึก"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataUser: { name: "", surname: "", email: "", tel: "" }
    };
  }
};
</script>

<style >
</style>