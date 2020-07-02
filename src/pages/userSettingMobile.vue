<template>
  <div>
    <div class="col q-pa-md">
      <user-setting :infoData="type" :userInfo="userInfo" @backStep="val => getBackPage(val)"></user-setting>
    </div>
  </div>
</template>

<script>
import userSetting from "../components/userSetting";
export default {
  components: {
    userSetting
  },
  data() {
    return {
      userInfo: this.$route.params.userInfo,
      type: this.$route.params.type,
      isNameClick: false,
      isPasswordClick: false,
      isLogOutClick: false,
      infoSetting: false,
      mainPage: true
    };
  },
  methods: {
    async getBackPage(val) {
      this.isNameClick = false;
      this.isPasswordClick = false;
      this.isLogOutClick = false;
      this.infoSetting = false;
      this.mainPage = true;
      this.userInfo = await this.getUserInfo(
        this.$q.localStorage.getItem("uid")
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>