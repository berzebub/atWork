<template>
  <div align="center">
    <div class="q-ma-md" style="width:500px">
      <q-input outlined v-model="username" label="ชื่อผู้ใช้งาน" />
    </div>
    <div class="q-ma-md" style="width:500px">
      <q-input outlined v-model="password" label="รหัสผ่าน" />
    </div>
    <div class="q-ma-md">
      <q-btn
        @click="login()"
        label="login"
        class="q-ma-md"
        style="width:120px"
        outline
        color="red"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/practiceList");
    }
  }
};
</script>

<style></style>
