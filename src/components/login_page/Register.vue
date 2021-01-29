<template>
  <div class="Register">
    <el-form
      ref="Register_Form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="Register-box"
    >
      <h3 class="Register-title">欢迎注册</h3>
      <el-form-item label="昵称" prop="userName">
        <el-input
          type="text"
          placeholder="请输入昵称"
          v-model="form.userName"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="form.email" />
      </el-form-item>
      <el-form-item label="激活码" prop="confirmCode">
        <el-input
          type="text"
          placeholder="请输入激活码"
          v-model="form.confirmCode"
        ></el-input>
        <el-button
          type="primary"
          :disabled="form.disabled"
          v-on:click="sendConfirmCode()"
          >{{ form.btntxt }}</el-button
        >
      </el-form-item>
      <el-form-item label="联系方式" prop="userPhone">
        <el-input
          type="text"
          placeholder="请输入联系方式"
          v-model="form.userPhone"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model="form.checkPassword"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-on:click="pathTo('Login')">登录</el-button>
        <el-button type="primary" v-on:click="onSubmit('Register_Form')"
          >注册</el-button
        >
        <el-button type="primary" v-on:click="pathTo('ForgetPassword')"
          >忘记密码</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请确认输入信息完整！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        userName: "",
        email: "",
        userPhone: "",
        password: "",
        checkPassword: "",
        confirmCode: "",
        disabled: false,
        time: 0,
        btntxt: "获取验证码"
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        userName: [
          { required: true, message: "昵称不可为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不可为空", trigger: "blur" }],
        confirmCode: [
          { required: true, message: "激活码不可为空", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "联系方式不可为空", trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "确认密码不可为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          //在这里提交表单信息
          this.$router.push("/");
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    pathTo(data) {
      this.$emit("changeComponent", data);
    },
    sendConfirmCode: function() {
      var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (this.form.email === "") {
        alert("请输入邮箱");
      } else if (!regEmail.test(this.form.email)) {
        alert(this.form.email);
        alert("邮箱格式不正确");
      } else {
        this.form.time = 60;
        this.form.disabled = true;
        this.timer();
        //在这里进行验证码的发送
      }
    },
    timer() {
      if (this.form.time > 0) {
        this.form.time--;
        this.form.btntxt = this.form.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.form.time = 0;
        this.form.btntxt = "获取验证码";
        this.form.disabled = false;
      }
    }
  }
};
</script>

<style scoped>
.Register-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.Register-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
