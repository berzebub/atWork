<template>
  <q-page>
    <!-- หน้าแสดงข้อมูล -->
    <div>
      <div class="q-pa-md" align="center">
        <q-btn
          @click="addLevel()"
          style="width:190px"
          dense
          color="blue-grey-10"
          class="text-subtitle1"
          label="เพิ่ม"
        />
      </div>
      <!-- list -->
      <div class="shadow-1 bg-blue-grey-10">
        <q-list class="rounded-borders">
          <q-expansion-item class="text-white text-subtitle1" label="อาหารและเครื่องดื่ม">
            <q-card>
              <div
                class="q-px-md q-py-sm relative-position cursor-pointer"
                v-ripple
                @click="gotoEdit(1)"
              >
                <div class="row">
                  <div class="col-10">
                    <span class="text-black text-subtitle1">การใช้งานตำแหน่ง</span>

                    <q-toggle v-model="valuePosition" color="secondary" />
                  </div>
                  <div class="col" align="right">
                    <q-btn
                      size="13px"
                      icon="fas fa-ellipsis-v"
                      round
                      dense
                      color="blue-grey-10"
                      flat
                    >
                      <q-menu>
                        <q-list style="min-width: 170px">
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editBtn(item2)">แก้ไขระดับการเรียน</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="editBtn(item2)">แก้ไขบทเรียน</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section @click="deleteBtn(item2)">ลบ</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
                <q-separator />
                <!-- ปุ่มเพิ่มบทเรียน -->

                <div align="center" class="q-py-lg">
                  <q-btn label="เพิ่มบทเรียน" class="bg-blue-grey-6" style="width:190px"></q-btn>
                </div>
                <!-- เนื้อหาบทเรียน  -->
                <div class="text-blue-grey-10">100 - จองโต๊ะ</div>
              </div>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      text: "",
      model: 1,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      valuePosition: true
    };
  },
  methods: {
    addLevel() {
      this.$router.push("lessonInput");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>