<template>
  <div>
    <!-- อีเมล หรือ รหัสผ่านผิด -->
    <q-dialog v-if="type == 1" v-model="successData" persistent>
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-md">
            <q-icon color="red" size="40px" name="far fa-times-circle" />
          </div>
          <div>
            <div class="q-mt-lg text-subtitle1">อีเมลหรือรหัสผ่านไม่ถูกต้อง</div>
          </div>
        </q-card-section>
        <q-card-action align="center">
          <div class="q-mt-xs">
            <q-btn label="ตกลง" class="bg-blue-grey-10 text-white" style="width:190px"></q-btn>
          </div>
        </q-card-action>
      </q-card>
    </q-dialog>
    <!-- ใส่อีเมลเพื่อกำหนดรหัสผ่านใหม่เรียบร้อย -->
    <q-dialog v-if="type == 2" v-model="successData">
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg">
            <q-icon color="secondary" size="40px" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg text-subtitle1">เราทำการส่งอีเมลสำหรับการตั้งค่า</div>
          <div class="text-subtitle1">รหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ต้องการลบตำแหน่งหรือไม่ -->
    <q-dialog v-if="type == 3" v-model="successData" persistent>
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg text-subtitle1">คุณต้องการลบตำแหน่ง</div>
          <div class="text-subtitle1">"อาหารและเครื่องดื่ม"</div>
        </q-card-section>
        <q-card-action>
          <div class="row justify-center" style="margin-top:25px">
            <div>
              <q-btn label="ยกเลิก" color="blue-grey-10" style="width:120px" outline v-close-popup></q-btn>
            </div>
            <div>
              <q-btn label="ตกลง" class="bg-blue-grey-10 text-white q-ml-md" style="width:120px"></q-btn>
            </div>
          </div>
        </q-card-action>
      </q-card>
    </q-dialog>
    <!-- ลบข้อมูลตำแหน่งเรียบร้อย -->
    <q-dialog v-if="type == 4" v-model="successData">
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg" style="margin-top:45px">
            <q-icon color="secondary" size="40px" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg text-subtitle1">ลบข้อมูลตำแหน่งเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ลบแบบฝึกหัดทั้งหมดออกก่อน -->
    <q-dialog v-if="type == 5" v-model="successData" persistent>
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div>
            <div class="q-mt-lg text-subtitle1">ต้องลบแบบฝึกหัดทั้งหมดภายในบทเรียน</div>
            <div class="text-subtitle1">"จองโต๊ะ"</div>
          </div>
        </q-card-section>
        <q-card-action align="center">
          <div class="q-mt-md">
            <q-btn label="ตกลง" class="bg-blue-grey-10 text-white" style="width:190px"></q-btn>
          </div>
        </q-card-action>
      </q-card>
    </q-dialog>
    <!-- บันทึกข้อมูลgเรียบร้อย -->
    <q-dialog v-if="type == 6" v-model="successData">
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="q-mt-lg" style="margin-top:45px">
            <q-icon color="secondary" size="40px" name="far fa-check-circle" />
          </div>
          <div class="q-mt-lg text-subtitle1">บันทึกข้อมูลเรียบร้อย</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- วิดีโอสนทนา -->
    <q-dialog v-if="type == 7" v-model="successData" persistent>
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="text-h6">วิดีโอสนทนา</div>
          <div>
            <div align="left" class="text-subtitle1">ลิงค์วิดีโอ</div>
            <div>
              <q-input outlined v-model="videoConver"></q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <div>
            <q-btn label="ยกเลิก" color="blue-grey-10" style="width:120px" outline v-close-popup></q-btn>
          </div>
          <div>
            <q-btn label="ตกลง" class="bg-blue-grey-10 text-white q-ml-md" style="width:120px"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- อัพโหลดรายชื่อ -->
    <q-dialog v-if="type == 8" v-model="successData" persistent>
      <q-card style="width: 323px; height:200px">
        <q-card-section align="center">
          <div class="text-h6">อัพโหลดรายชื่อ</div>
          <div class="q-mt-md text-subtitle1">แผนกวิศวกร</div>
          <div class="q-mt-sm text-subtitle1">
            <u>ตัวอย่างไฟล์</u>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <div>
            <q-btn label="ยกเลิก" color="blue-grey-10" style="width:120px" outline v-close-popup></q-btn>
          </div>
          <div>
            <q-btn label="อัพโหลด" class="bg-blue-grey-10 text-white q-ml-md" style="width:120px"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import userInfo from "../pages/userInfo.vue";
export default {
  props: ["type"],
  data() {
    return {
      successData: true,
      videoConver: ""
    };
  },
  mounted() {
    let stoTypeList = [2, 4, 6, 9];
    if (stoTypeList.includes(this.type)) {
      setTimeout(() => {
        this.$emit("autoClose", false);
      }, 2500);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>