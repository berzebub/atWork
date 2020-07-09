<template>
  <div>
    <!-- ดูตั่งค่าวีดีโอ -->
    <q-dialog v-model="isSettingDialog" persistent>
      <q-card class="q-pa-md" style="max-width:900px;width:100%;">
        <div class="text-h6 q-px-md">การตั้งค่าการอัปโหลดวิดีโอ</div>
        <div>
          <div class="text-subtitle1">
            <div class="q-py-sm">
              <q-btn class="boxUpload q-mx-md" flat label="1" />
              <span>เลือกไฟล์วิดีโอที่ต้องการอัปโหลด</span>
              <div class="text-center q-py-md">
                <q-img style="max-width:90%" src="../statics/upload/upload1.png" />
              </div>
            </div>
            <div class="q-py-sm">
              <q-btn class="boxUpload q-mx-md" flat label="2" />
              <span>ใส่ชื่อ และคำอธิบาย</span>
              <div class="text-center q-py-md">
                <q-img style="max-width:90%" src="../statics/upload/upload2.png" />
              </div>
            </div>
            <div class="q-py-sm">
              <q-btn class="boxUpload q-mx-md" flat label="3" />
              <span>เลือก “ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก”</span>
              <div class="text-center q-py-md">
                <q-img style="max-width:90%" src="../statics/upload/upload3.png" />
              </div>
            </div>
            <div class="q-py-sm">
              <q-btn class="boxUpload q-mx-md" flat label="4" />
              <span>เลือก “ระดับการแชร์”</span>
            </div>
            <div class="q-py-sm">
              <q-btn class="boxUpload q-mx-md" flat label="5" />
              <span>เลือก “ไม่เป็นสาธารณะ”</span>
              <div class="text-center q-py-md">
                <q-img style="max-width:90%" src="../statics/upload/upload5.png" />
              </div>
            </div>
            <div class="text-center">
              <q-btn
                v-close-popup
                style="max-width:190px;width:100%"
                label="ปิด"
                class="bg-blue-grey-10 text-white"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
</style>