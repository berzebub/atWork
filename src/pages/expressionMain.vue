<template>
  <q-page>
    <div>
      <div align="center">
        <q-btn style="width:190px" to="/expressionInput" outline icon="fas fa-plus"></q-btn>
      </div>
      <q-card
        v-for="(item, index) in showDataExpression"
        :key="index"
        class="q-mt-md"
        style="width:100%"
      >
        <q-card-section class="bg-blue-grey-10 text-white">
          <div>รหัสลำดับ 1000</div>
          <div class="row items-center absolute-right">
            <q-icon
              @click="openDialogDelte(item.id)"
              class="cursor-pointer q-pr-md"
              name="far fa-trash-alt"
              style="color:white; font-size: 1.4em;"
            />
            <q-icon
              @click="editDataExpression()"
              class="cursor-pointer q-pr-md"
              name="far fa-edit"
              style="color:white; font-size: 1.4em;"
            />
          </div>
        </q-card-section>
        <q-card-section v-for="(item2, index2) in item.expression" class="no-padding">
          <div class="q-px-md q-pt-md q-pb-sm text-h6">{{item2.sentenceEng}}</div>
          <div class="q-px-md q-pb-md text-subtitle2">{{item2.sentenceTh}}</div>

          <q-separator />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>
    <!-- ------------------------------------------Dialog------------------------------------ -->

    <q-dialog v-model="dialogDelete" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">คุณต้องการลบ หรือไม่</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="ยกเลิก" v-close-popup />
          <q-btn @click="deleteDataExpression()" flat label="ยืนยัน" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      dialogDelete: false,
      getId: "",
      showDataExpression: ""
    };
  },
  methods: {
    loadDataExpression() {
      db.collection("expression")
        .get()
        .then(data => {
          let temp = [];
          data.forEach(element => {
            temp.push({ ...element.data(), id: element.id });
          });
          console.log(temp);
          this.showDataExpression = temp;
        });
    },
    openDialogDelte(id) {
      this.dialogDelete = true;
      this.getId = id;
    },
    deleteDataExpression() {
      db.collection("expression")
        .doc(this.getId)
        .delete()
        .then(() => {
          this.getId = "";
          this.dialogDelete = false;
          this.loadDataExpression();
        });
    },
    editDataExpression() {}
  },
  mounted() {
    this.loadDataExpression();
  }
};
</script>

<style lang="scss" scoped>
</style>