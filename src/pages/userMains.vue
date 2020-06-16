<template>
  <div>
    <div align="center">ผู้ใช้งาน user</div>
    <div>
      <q-table :data="dataUser" :columns="columnsUser" row-key="name"></q-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnsUser: [
        {
          name: "name",
          align: "center",
          label: "ชื่อ",
          field: "name"
        },
        {
          name: "surname",
          align: "center",
          label: "นามสกุล",
          field: "surname"
        },
        {
          name: "email",
          align: "center",
          label: "E-mali",
          field: "email"
        },
        {
          name: "tel",
          align: "center",
          label: "เบอร์โทร",
          field: "tel"
        }
      ],
      dataUser: [
        {
          name: "ลลิตา",
          surname: "มาลิลา",
          email: "lalita123@mail.com",
          tel: "0856564566"
        }
      ]
    };
  }
};
</script>

<style >
</style>