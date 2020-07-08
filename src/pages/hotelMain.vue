<template>
  <q-page>
    <div align="center">
      <q-btn @click="goToAddHotel()" label="เพิ่มกิจการ" color="blue-grey-10" style="width:190px"></q-btn>
    </div>
    <q-separator class="q-mt-md" />
    <div v-for="(item,index) in dataHotel" :key="index">
      <q-toolbar class="no-padding">
        <q-toolbar-title class="text-subtitle1">
          <span>{{item.name}}</span>
        </q-toolbar-title>
        <q-btn @click.stop="deleteHotel()" icon="far fa-trash-alt" flat size="10px"></q-btn>
        <q-btn @click.stop="editHotel()" icon="fas fa-edit" flat size="10px"></q-btn>
      </q-toolbar>
      <q-separator />
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      dataHotel: ""
    };
  },
  methods: {
    deleteHotel() {},
    editHotel() {},
    loadHotel() {
      db.collection("hotel")
        .get()
        .then(doc => {
          let temp = [];
          // console.log(doc.size);
          doc.forEach(element => {
            temp.push({ ...element.data(), hotelId: element.id });
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.dataHotel = temp;
        });
    },
    goToAddHotel() {
      this.$router.push("/hotelAdd");
    }
  },
  mounted() {
    this.loadHotel();
  }
};
</script>

<style scoped>
</style>