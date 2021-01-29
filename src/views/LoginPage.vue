<template>
  <div class="loginPage">
    <component :is="componentName" v-on:changeComponent="change"></component>
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@c/login_page/Login.vue";
import Register from "@c/login_page/Register";
import ForgetPassword from "@c/login_page/ForgetPassword";

export default {
  name: "LoginPage",
  data: function() {
    return { componentName: "Login" };
  },
  components: {
    Login,
    Register,
    ForgetPassword
  },
  methods: {
    toLogin: function() {
      this.componentName = "Login";
    },
    toRegister: function() {
      this.componentName = "Register";
    },
    toForgetPassword: function() {
      this.componentName = "ForgetPassword";
    },
    change(data) {
      if (data === "Register") this.componentName = "Register";
      else if (data === "Login") this.componentName = "Login";
      else if (data === "ForgetPassword") this.componentName = "ForgetPassword";
    }
  }
};
</script>
