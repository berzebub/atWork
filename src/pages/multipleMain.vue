<template>
  <q-page>
    <div class="container" align="center">
      <!-- box เซิร์ฟเวอร์  -->
      <div class="row justify-between">
        <div class="col text-left">
          <div class="row boxServer">
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadDraft()"
                v-model="server"
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadServer()"
                v-model="server"
                val="server"
                label="เซิร์ฟเวอร์"
              />
            </div>
          </div>
        </div>
        <div class="desktop-only">
          <div class="text-right">
            <q-btn round color="blue-grey-10" icon="fas fa-print" to="/multiplePrint" />
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
          <div class="row text-subtitle1 items-center">คำสั่ง</div>
          <div>
            <q-btn @click="editQuestion()" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="q-pa-md">
          <span>{{instrunction.eng}}</span>
          <q-separator class="q-my-md" />
          <span>{{instrunction.th}}</span>
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
      <div v-for="(item,index) in data" :key="index" class="box text-left q-my-md">
        <div class="boxQuestion bg-blue-grey-10 text-white q-py-xs q-px-md row justify-between">
          <div class="col row items-center">รหัสลำดับ {{item.order}}</div>
          <div class="q-px-xs">
            <q-btn
              @click="deleteData(item.key, item.order)"
              size="sm"
              round
              icon="far fa-trash-alt"
            />
          </div>
          <div>
            <q-btn @click="editData(item.key)" size="sm" round icon="far fa-edit" />
          </div>
        </div>
        <div class="q-pa-md">
          <span v-html=" item.question "></span>
        </div>
        <div class="q-px-md">
          <div>
            <span
              :class="{'bg-secondary answer ' : item.correctAnswer == 1}"
              v-if="item.choices[0].choice"
            >
              1)
              <span v-html="item.choices[0].choice"></span>
            </span>
          </div>
          <div>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 2}"
              v-if="item.choices[1].choice"
            >
              2)
              <span v-html=" item.choices[1].choice"></span>
            </span>
          </div>
          <div>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 3}"
              v-if="item.choices[2].choice"
            >
              3)
              <span v-html="item.choices[2].choice"></span>
            </span>
          </div>
          <div>
            <span
              :class="{'bg-secondary answer' : item.correctAnswer == 4}"
              v-if="item.choices[3].choice"
            >
              4)
              <span v-html="item.choices[3].choice"></span>
            </span>
          </div>
        </div>
        <div class="q-pa-md">
          <span v-html="item.description "></span>
        </div>
      </div>
      <!-- dialog แก่ไข คำสั่ง -->
      <q-dialog v-model="questionDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">แก้ไขคำสั่ง</div>
          <div class="q-px-md">
            <div class="q-py-xs">
              <q-input
                autogrow
                dense
                :rules="[ val => !!val || 'กรุณาใสคำสั่งภาษาอังกฤษ']"
                ref="instrunctionEng"
                outlined
                v-model="instrunctionEng"
                label="คำสั่งภาษาอังกฤษ"
              />
            </div>
            <div class="q-py-xs">
              <q-input
                autogrow
                dense
                :rules="[ val => !!val || 'กรุณาใสคำสั่งภาษาไทย']"
                ref="instrunctionTh"
                outlined
                v-model="instrunctionTh"
                label="คำสั่งภาษาไทย"
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
                <q-btn @click="saveBtn()" dense style="width:150px" color="black" label="บันทึก" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <!-- delete -->
      <q-dialog v-model="deleteDialog" persistent>
        <q-card style="max-width:600px;width:100%">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div>ต้องการลบข้อมูล</div>
            <div>“รหัสลำดับ {{orderId}}” หรือไม่</div>
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
                <q-btn @click="deleteBtn()" dense style="width:150px" color="black" label="บันทึก" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <!-- finish -->
      <q-dialog v-model="finishDialog">
        <q-card style="max-width:600px;width:100%;height:200px">
          <div class="text-h6 text-center q-pt-md q-pb-sm">
            <div class="q-py-md q-mt-md">
              <q-icon color="secondary" size="46px" name="far fa-check-circle" />
            </div>
            <div>{{text}}</div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      instrunction: { eng: "ยังไม่ระบุ", th: "ยังไม่ระบุ" },
      orderId: "",
      instrunctionTh: "",
      instrunctionEng: "",
      server: "draft",
      questionDialog: false,
      deleteDialog: false,
      finishDialog: false,
      text: "",
      data: [],
      dataDraft: [],
      deleteKey: ""
    };
  },
  methods: {
    loadDataAll() {
      this.dataDraft = [];
      db.collection("multiple_draft")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let dataKey = {
              key: element.data().key
            };
            let final = {
              ...dataKey,
              ...element.data()
            };
            this.dataDraft.push(final);
          });
          this.dataDraft.sort((a, b) => {
            return a.order - b.order;
          });
        });
      this.loadDraft();
    },
    loadDraft() {
      this.data = [];
      this.data = this.dataDraft;
      this.finishDialog = false;
    },
    loadServer() {
      this.data = [];
    },
    addQuestion() {
      this.$router.push("/multipleInputAdd");
    },
    editQuestion() {
      this.questionDialog = true;
    },
    addBtn() {},
    saveBtn() {
      this.$refs.instrunctionTh.validate();
      this.$refs.instrunctionEng.validate();
      if (
        this.$refs.instrunctionTh.hasError ||
        this.$refs.instrunctionEng.hasError
      ) {
        return;
      }
      this.instrunction.eng = this.instrunctionEng;
      this.instrunction.th = this.instrunctionTh;
      this.instrunctionEng = "";
      this.instrunctionTh = "";
      this.text = "บันทึกข้อมูลเรียบร้อย";
      this.questionDialog = false;
      this.finishDialog = true;
    },
    deleteBtn() {
      db.collection("multiple_draft")
        .doc(this.deleteKey)
        .delete()
        .then(() => {
          this.loadDataAll();
          this.text = "ลบข้อมูลเรียบร้อย";
          this.deleteDialog = false;
          this.finishDialog = true;
        });
    },
    deleteData(key, id) {
      this.deleteDialog = true;
      this.orderId = id;
      this.deleteKey = key;
    },
    editData(key) {
      this.$router.push("/multipleInputEdit" + "/" + key);
    }
  },
  mounted() {
    this.loadDataAll();
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
  width: 100%;
  border: 1px solid #263238;
}
.answer {
  color: white;
}
</style>