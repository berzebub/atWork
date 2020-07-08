<template>
  <q-page>
    <div class="container">
      <div>
        <div>ชื่อกิจการ</div>
        <q-input
          v-model="datahotel.hotelName"
          ref="HotelName"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>ชื่อ นามสกุลผู้ดูแลระบบ</div>
        <q-input
          v-model="datahotel.adminName"
          ref="adminName"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>เบอร์ติดต่อผู้ดูแลระบบ</div>
        <q-input
          v-model="datahotel.adminTel"
          ref="adminTel"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div>
        <div>อีเมลผุ้ดูแลระบบ</div>
        <q-input v-model="datahotel.email" ref="email" outlined dense :rules="[value => !!value ]"></q-input>
      </div>
      <div>
        <div>รหัสผ่านผู้ดูแลระบบ</div>
        <q-input
          v-model="datahotel.password"
          ref="password"
          outlined
          dense
          :rules="[value => !!value ]"
        ></q-input>
      </div>
      <div class="row">
        <div class="col-6 q-pr-sm q-py-md" align="right">
          <q-btn @click="cancelAddHotel()" dense style="width:150px" outline label="ยกเลิก"></q-btn>
        </div>
        <div class="col-6 q-pl-sm q-py-md">
          <q-btn @click="saveHotel()" dense color="blue-grey-10" style="width:150px" label="บันทึก"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      datahotel: {
        hotelName: "",
        adminName: "",
        adminTel: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    cancelAddHotel() {},
    saveHotel() {}
  }
};
</script>

<style lang="scss" scoped>
</style>