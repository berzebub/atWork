<template>
  <q-page class="text-blue-grey-10">
    <div class="container">
      <div style="max-width:700px" class="row justify-between">
        <div class="col text-left">
          <div class="row boxServer">
            <!-- แบบร่าง -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadDarft()"
                v-model="status"
                val="draft"
                label="แบบร่าง"
              />
            </div>
            <!-- เซิร์ฟเวอร์ -->
            <div class="col">
              <q-radio
                color="blue-grey-10"
                @input="loadServer()"
                v-model="status"
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
      <div class="text-h6 text-center q-pt-md">
        <div>อาหารและเครื่องดื่ม</div>
        <div>1. จองโต๊ะ</div>
      </div>

      <div class="q-pt-md">
        <div class="text-right box" style="max-width:700px">
          <q-tabs
            v-model="tab"
            dense
            class="text-blue-grey-8"
            active-color="blue-grey-10"
            indicator-color="blue-grey-10"
            style="max-width:400px;width:100%"
            align="justify"
            narrow-indicator
          >
            <q-tab name="vdio" label="วีดีโอ" />
            <q-tab name="sentence" label="ประโยคสนทนา" />
          </q-tabs>
          <q-separator class="bg-blue-grey-10" />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel align="center" name="vdio">
              <div style="max-width:328px">
                <div class="text-left">รูปภาพหน้าปก</div>
                <q-file
                  @input="checkImg()"
                  accept="image/*"
                  bg-color="white"
                  outlined
                  v-model="uploadImg"
                >
                  <template v-slot:append>
                    <div
                      style="width:100px"
                      class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                      @click.stop="uploadImg = null"
                      v-if="!uploadImg && !isKeyImage"
                    >เลือกไฟล์</div>
                    <span v-if="uploadImg || isKeyImage" class="text-body1 q-pr-md">{{isKeyImage}}</span>
                    <div
                      class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                      v-if="uploadImg || isKeyImage"
                      @click.stop="uploadImg  = null"
                      @click="isKeyImage  = ''"
                    >
                      <span style class="far fa-trash-alt q-px-xs"></span>
                    </div>
                  </template>
                  <div
                    style="width:1000px"
                    class="text-subtitle1 text-grey-7 self-center"
                    v-if="!uploadImg && !isKeyImage"
                  >ลากแล้ววาง หรือ</div>
                </q-file>
                <div class="q-pt-md">
                  <div class="text-left">วิดีโอ</div>
                  <q-file
                    accept="video/*"
                    bg-color="white"
                    style="max-width:328px"
                    outlined
                    v-model="uploadVdo"
                  >
                    <template v-slot:append>
                      <div
                        style="width:100px"
                        class="text-subtitle1 rounded-borders text-center bg-blue-grey-10 text-white q-pa-xs cursor-pointer"
                        @click.stop="uploadVdo = null"
                        v-if="!uploadVdo && !isKeyVdio"
                      >เลือกไฟล์</div>
                      <span v-if="uploadVdo || isKeyVdio" class="text-body1 q-pr-md">{{isKeyVdio}}</span>
                      <div
                        class="cursor-pointer rounded-borders text-white bg-blue-grey-10"
                        v-if="uploadVdo || isKeyVdio"
                        @click.stop="uploadVdo  = null"
                        @click="isKeyVdio  = ''"
                      >
                        <span style class="far fa-trash-alt q-px-xs"></span>
                      </div>
                    </template>
                    <div
                      style="width:1000px"
                      class="text-subtitle1 text-grey-7 self-center"
                      v-if="!uploadVdo && !isKeyVdio"
                    >ลากแล้ววาง หรือ</div>
                  </q-file>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel align="center" name="sentence">
              <div>
                <span>
                  <q-btn
                    @click="addBtn()"
                    style="max-width :190px;width:100%"
                    class="bg-blue-grey-10 text-white text-subtitle1"
                    label="เพิ่มประโยค"
                  />
                </span>
                <div>
                  <div v-for="item,index in data" :key="index" class="q-mt-md boxCard text-left">
                    <div
                      style="border-top-left-radius: 6px;border-top-right-radius: 6px "
                      class="bg-blue-grey-10 text-white q-py-sm q-pr-xs q-pl-md text-subtitle1 row justify-between"
                    >
                      <div class="self-center">รหัสลำดับ {{item.order}}</div>
                      <div>
                        <q-btn size="13px" icon="fas fa-ellipsis-v" round dense flat>
                          <q-menu>
                            <q-list style="min-width: 120px">
                              <q-item clickable v-close-popup>
                                <q-item-section @click="editBtn(item.key)">แก้ไขข้อมูล</q-item-section>
                              </q-item>
                              <q-item clickable v-close-popup>
                                <q-item-section @click="deleteBtn(item.key)">ลบ</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>

                    <div class="q-px-md q-py-sm">
                      <div class="row">
                        <div
                          :v-show="item.customer == 1 ? text = 'ลูกค้า:' : text = 'พนักงาน:' "
                          class="text-subtitle1"
                        >{{text}}</div>
                        <div class="q-px-sm">
                          <q-btn
                            size="sm"
                            @click="playAudio(item.soundURL)"
                            round
                            flat
                            icon="fas fa-volume-up"
                          />
                        </div>
                        <div class="col">
                          <span class="text-subtitle1">{{item.sentenceEng}}</span>
                        </div>
                      </div>
                      <div class="text-blue-grey-7 text-subtitle2">{{item.sentenceTh}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db, st } from "../router";
export default {
  data() {
    return {
      text: "",
      uploadImg: null,
      uploadVdo: null,
      isKeyVdio: "",
      isKeyImage: "",
      status: "draft",
      tab: "sentence",
      data: [],
      dataDraft: [],
      dataServer: [],
      pathFile:
        "https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/"
    };
  },
  methods: {
    loadDataAll() {
      this.data = [];
      if (this.status == "draft") {
        this.dataDraft = [];
        db.collection("practice_draft")
          .where("practiceId", "==", "vdo")
          .get()
          .then(doc => {
            let getSound = "";
            doc.forEach(element => {
              if (element.data().isSound) {
                getSound = this.pathFile + "audio/" + element.id + ".mp3";
              }
              let dataKey = {
                key: element.id,
                soundURL: getSound
              };
              let final = {
                ...dataKey,
                ...element.data()
              };
              this.dataDraft.push(final);
            });
            this.loadDarft();
          });
      } else {
        this.dataServer = [];
      }
    },
    loadDarft() {
      this.data = this.dataDraft;
    },
    loadServer() {
      this.data = this.dataServer;
    },
    checkImg() {
      if (this.uploadImg) {
        console.log("4444");
      } else {
        console.log("5555");
      }
    },
    addBtn() {
      this.$router.push("/vdoInputAdd");
    },
    // เล่นเสียง
    playAudio(sound) {
      let audio = new Audio(sound);
      audio.play();
    },
    editBtn(key) {
      this.$router.push("/vdoInputEdit/" + key);
    },
    deleteBtn(key) {
      this.loadingShow();
      db.collection("practice_draft")
        .doc(key)
        .delete()
        .then(async () => {
          await st.child("/practice/audio/" + key + ".mp3").delete();
          this.loadingHide();
          this.loadDataAll();
        });
    }
  },
  mounted() {
    this.loadDataAll();
  }
};
</script>

<style scoped>
.boxCard {
  border: 1px solid #263238;
  border-radius: 10px;
}
.box {
  border: 1px solid #263238;
}
.boxServer {
  width: 100%;
  max-width: 330px;
  border: 1px solid #263238;
}
</style>