<template>
  <div>
    <!-- @click="sync(practiceId),openDialogSync()" -->
    <q-btn
      :disable="isDisableSyncBtn"
      @click="sync(practiceId)"
      round
      color="blue-grey-10"
      icon="fas fa-sync"
    />
  </div>
</template>

<script>
import { db } from "../router";
export default {
  props: {
    practiceId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isDisableSyncBtn: true,
      isSnapPracticeList: ""
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