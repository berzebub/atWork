<template>
  <div>
    <!-- @click="sync(practiceId),openDialogSync()" -->
    <q-btn
      :disable="isDisableSyncBtn"
      @click="sync(practiceId).then(() => { isShowFinishSyncDialog = true })"
      round
      color="blue-grey-10"
      icon="fas fa-sync"
    />
    <dialog-setting
      @autoClose="isShowFinishSyncDialog = false"
      v-if="isShowFinishSyncDialog"
      :type="9"
    ></dialog-setting>
  </div>
</template>

<script>
import { db } from "../router";
import dialogSetting from "../components/dialogSetting";
export default {
  components: {
    dialogSetting
  },
  props: {
    practiceId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isDisableSyncBtn: true,
      isSnapPracticeList: "",
      isShowFinishSyncDialog: false
    };
  },
  methods: {
    checkSyncStatus() {
      this.isSnapPracticeList = db
        .collection("practice_list")
        .doc(this.practiceId)
        .onSnapshot(doc => (this.isDisableSyncBtn = !doc.data().isShowSyncBtn));
    }
  },
  mounted() {
    this.checkSyncStatus();
  },
  beforeDestroy() {
    this.isSnapPracticeList();
  }
};
</script>

<style lang="scss" scoped>
</style>