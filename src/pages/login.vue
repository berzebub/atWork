<template>
  <div class="absolute-center text-subtitle1" align="center">
    <div>Winner @Work</div>
    <div class="q-mt-md">Backend</div>
    <!-- Email -->
    <div class="q-ma-md" style="width:300px">
      <div class="q-ml-xs" align="left">E-mail</div>
      <div>
        <q-input outlined v-model="email" />
      </div>
    </div>
    <!-- password -->
    <div class="q-ma-md" style="width:300px">
      <div class="q-ml-xs" align="left">รหัสผ่าน</div>
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div @click="forgetPassword()" class="q-mt-sm cursor-pointer" align="right">
        <u>ลืมรหัสผ่าน?</u>
      </div>
    </div>
    <!-- login -->
    <div class="q-ma-md">
      <q-btn
        @click="login()"
        label="เข้าสู่ระบบ"
        class="q-ma-md bg-blue-grey-10 text-white"
        style="width:190px"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      isPwd: true,
      email: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/practiceList");
    },
    forgetPassword() {
      this.$router.push("");
    }
  }
};
</script>

<style></style>
