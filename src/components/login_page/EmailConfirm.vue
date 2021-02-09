<template>
  <div class="emailConfirm">
    <el-form
      ref="emailConfirmForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="emailConfirm-box"
    >
      <h3 class="emailConfirm-title">邮箱激活</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="form.email" />
      </el-form-item>
      <el-form-item label="激活码" prop="activeCode">
        <el-input
          type="text"
          placeholder="请输入激活码"
          v-model="form.activeCode"
        ></el-input>
        <el-button
          type="primary"
          :disabled="form.disabled"
          v-on:click="requestActiveCode()"
          >{{ form.btntxt }}</el-button
        >
        <el-button type="primary" v-on:click="onSubmit('emailConfirmForm')"
          >激活邮箱</el-button
        >
        <el-button type="primary" v-on:click="pathTo('Login')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <span v-show="this.errorInfo.isShowError" class="error">
          {{ this.errorInfo.text }}
        </span>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ form.dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";

export default {
  name: "emailConfirm",
  data() {
    return {
      form: {
        email: "",
        activeCode: "",
        dialogText: "",
        disabled: false,
        time: 0,
        btntxt: "获取验证码"
      },
      errorInfo: {
        text: "激活失败,请重试",
        isShowError: false //显示错误提示
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        email: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        activeCode: [
          { required: true, message: "激活不可为空", trigger: "blur" }
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
          //调用后端登陆接口
          apis.registerApi
            .sendConfirmCode(this.form)
            .then(data => {
              console.log("success:", data);
              if (data && data.data) {
                var json = data.data;
                if (json.status === "Success") {
                  this.pathTo("Login");
                  this.dialogVisible = true;
                  this.dialogText = "邮箱激活成功!请登录！";
                } else if (json.status === "Fail") {
                  this.errorInfo.text = json.message;
                } else if (json.status === "Authenticated") {
                  this.errorInfo.text = json.message;
                } else if (json.status === "Error") {
                  this.errorInfo.text = json.message;
                }
                this.errorInfo.isShowError = true;
              }
            })
            .catch(err => {
              console.log("error:", err);
              this.errorInfo.isShowError = true;
              this.errorInfo.text = "系统接口异常";
            });
        } else {
          this.dialogVisible = true;
          this.dialogText = "请输入邮箱和激活码!";
          return false;
        }
      });
    },
    requestActiveCode() {
      //先对邮箱格式进行验证
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
        apis.registerApi
          .requestActiveCode(this.form)
          .then(data => {
            console.log("success:", data);
            if (data && data.data) {
              var json = data.data;
              if (json.status === "Success") {
                return;
              } else if (json.status === "Fail") {
                this.errorInfo.text = json.message;
              } else if (json.status === "Authenticated") {
                this.errorInfo.text = json.message;
              } else if (json.status === "Error") {
                this.errorInfo.text = json.message;
              }
              this.errorInfo.isShowError = true;
            }
          })
          .catch(err => {
            console.log("error:", err);
            this.errorInfo.isShowError = true;
            this.errorInfo.text = "系统接口异常";
          });
      }
    },
    pathTo(data) {
      this.$emit("changeComponent", data);
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
.emailConfirm-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.emailConfirm-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
