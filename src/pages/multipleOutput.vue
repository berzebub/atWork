<template>
  <q-page>
    <div class="container" align="center">
      <!-- box เซิร์ฟเวอร์  -->
      <div class="text-left">
        <div class="row boxServer">
          <div class="col">
            <q-radio color="blue-grey-10" v-model="server" val="draft" label="แบบร่าง" />
          </div>
          <div class="col">
            <q-radio color="blue-grey-10" v-model="server" val="server" label="เซิร์ฟเวอร์" />
          </div>
        </div>
      </div>

      <div class="text-h6">
        <div class="q-pt-md">อาหารและเครื่องดื่ม</div>
        <div>1. จองโต๊ะ</div>
      </div>
      <!-- box คำสั่ง -->
      <div class="box text-left q-my-md">
        <div class="bg-blue-grey-10 text-white q-py-sm q-px-md boxQuestion row justify-between">
          <div class="row items-center">คำสั่ง</div>
          <div>
            <q-btn @click="editQuestion()" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="q-pa-md">
          <span>Choose the correct answer to fill in the blank.</span>
          <q-separator class="q-my-md" />
          <span>เลือกคำตอบที่ถูกต้องเติมลงในช่องว่าง</span>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <!-- ปุ่ม เพิ่มคำถาม -->
      <div>
        <q-btn
          @click="addQuestion()"
          style="width:190px"
          dense
          color="blue-grey-10"
          label="เพิ่มคำถาม"
        />
      </div>
      <!-- โชว์ DATA -->
      <div v-for="item in data" :key="item.id" class="box text-left q-my-md">
        <div class="boxQuestion bg-blue-grey-10 text-white q-py-xs q-px-md row justify-between">
          <div class="col row items-center">รหัสลำดับ 1000</div>
          <div class="q-px-xs">
            <q-btn @click="deleteBtn()" size="sm" round icon="far fa-trash-alt" />
          </div>
          <div>
            <q-btn @click="editBtn()" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="q-pa-md">{{ item.question }}</div>
        <div class="q-px-md">
          <div>{{ item.choice1 }}</div>
          <div>{{ item.choice2 }}</div>
          <div>{{ item.choice3 }}</div>
          <div>{{ item.choice4 }}</div>
        </div>
        <div class="q-pa-md">{{ item.meaning }}</div>
      </div>
      <!-- dialog แก่ไข คำสั่ง -->
      <q-dialog v-model="dialogQuestion" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">แก้ไขคำสั่ง</div>
          <div class="q-px-md">
            <div class="q-py-xs">
              <q-input
                dense
                :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ']"
                ref="instrunctionTh"
                outlined
                v-model="instrunctionTh"
                label="คำสั่งภาษาไทย"
              />
            </div>
            <div class="q-py-xs">
              <q-input
                dense
                :rules="[ val => !!val || 'กรุณาใส่รหัสลำดับ']"
                ref="instrunctionEng"
                outlined
                v-model="instrunctionEng"
                label="คำสั่งภาษาอังกฤษ"
              />
            </div>
          </div>
          <div>
            <div class="row reverse-wrap justify-center q-px-md">
              <div class="q-px-md q-pb-md">
                <q-btn
                  v-close-popup
                  dense
                  style="width:150px"
                  color="white"
                  outline
                  text-color="black"
                  label="ยกเลิก"
                />
              </div>
              <div class="q-px-md q-pb-md">
                <q-btn @click="addBtn()" dense style="width:150px" color="black" label="บันทึก" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      instrunctionTh: "",
      instrunctionEng: "",
      server: "draft",
      dialogQuestion: false,
      data: [
        {
          question:
            "When Tom was young, he ______ hide in the apple tree when his uncle came.",
          choice1: "would",
          choice2: "is",
          choice3: "uses to",
          choice4: "would to",
          meaning:
            "ความหมายคือ มักจะหรือเคย ต้องใช้รูปกริยา = would + V1 (ไม่มี used to ให้เลือก) => would hide (ก็จะซ่อน)"
        },
        {
          question:
            "When Tom was young, he ______ hide in the apple tree when his uncle came.",
          choice1: "would",
          choice2: "is",
          choice3: "uses to",
          choice4: "would to",
          meaning:
            "ความหมายคือ มักจะหรือเคย ต้องใช้รูปกริยา = would + V1 (ไม่มี used to ให้เลือก) => would hide (ก็จะซ่อน)"
        }
      ]
    };
  },
  methods: {
    addQuestion() {
      this.$router.push("/multipleInput");
    },
    editQuestion() {
      this.dialogQuestion = true;
    },
    addBtn() {
      this.$refs.instrunctionTh.validate();
      this.$refs.instrunctionEng.validate();
      if (
        this.$refs.instrunctionTh.hasError ||
        this.$refs.instrunctionEng.hasError
      ) {
      }
    },
    deleteBtn() {},
    editBtn() {}
  }
};
</script>
<style  scoped>
.box {
  border: 1px solid #263238;
  border-radius: 10px;
}
.boxQuestion {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.boxServer {
  max-width: 330px;
  border: 1px solid #263238;
}
</style>