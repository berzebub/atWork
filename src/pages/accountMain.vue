<template>
  <q-page class="text-blue-grey-10">
    <div class="mobile-only">
      <!-- ชื่อโรงแรม -->
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
      <!-- เพิ่มแผนก -->
      <div align="center" class="q-mt-md">
        <q-btn label="เพิ่มแผนก" color="blue-grey-10" style="width:148px"></q-btn>
      </div>
      <!-- รายชื่อแผนก -->
      <div>
        <q-separator class="q-mt-md" />
        <div>ชื่อxxx</div>
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
      hotelList: [],
      departmentAll: [],
      deparmentSelect: []
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
          this.selectDepartment();
        });
    },
    goToAddHotel() {
      this.$router.push("hotelMain");
    },
    loadDepartment() {
      db.collection("department")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let temp = {
              id: element.id
            };
            let final = { ...temp, ...element.data() };

            this.departmentAll.push(final);
          });
        });
    },
    selectDepartment() {
      console.log(this.hotelName);
      this.deparmentSelect = this.departmentAll.filter(
        x => x.hotelId == this.hotelName
      );
    }
  },
  mounted() {
    this.loadDepartment();
    this.loadHotelList();
  }
};
</script>

<style lang="scss" scoped>
</style>