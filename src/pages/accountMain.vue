<template>
  <q-page class="text-blue-grey-10">
    <div class="mobile-only">
      <div class="row">
        <div class="col-10">
          <q-select dense outlined v-model="hotelName" :options="hotelList" map-options emit-value />
        </div>
        <div class="col-2" align="center">
          <q-btn
            size="12px"
            @click="goToAddHotel()"
            flat
            round
            color="blue-grey-10"
            icon="far fa-edit"
          ></q-btn>
        </div>
      </div>
    </div>
    <div class="desktop-only"></div>
    <span></span>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      hotelName: "",
      hotelList: []
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
          this.hotelName = this.hotelList[0].value;
        });
    },
    goToAddHotel() {}
  },
  mounted() {
    this.loadHotelList();
  }
};
</script>

<style lang="scss" scoped>
</style>