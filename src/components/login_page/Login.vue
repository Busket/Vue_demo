<template>
  <div class="Login">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
        <el-button type="primary" v-on:click="pathTo('Register')"
          >注册</el-button
        >
        <el-button type="primary" v-on:click="pathTo('ForgetPassword')"
          >忘记密码</el-button
        >
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
      <span>请输入账号和密码</span>
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
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false //显示错误提示
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        email: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
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
          //调用后端登陆接口
          apis.shiroApi
            .loginIn(this.form)
            .then(data => {
              console.log("success:", data);
              if (data && data.data) {
                var json = data.data;
                console.log(json);
                console.log(json.status); //问题出在这里，json.status无法访问到需要的数据
                if (json.status === "SUCCESS") {
                // if (data.statusText === "OK") {
                  // this.$common.setSessionStorage(
                  //   "remember_token",
                  //   json.data.userInfo.token
                  // );
                  // this.$common.setSessionStorage(
                  //   "username",
                  //   json.data.userInfo.userName
                  // );
                  // this.$common.setSessionStorage(
                  //   "lev",
                  //   json.data.sysRoleVoList
                  // );
                  // //存入菜单,渲染菜单
                  // this.$store.dispatch("add_Menus", json.data.sysMenuVoList);
                  //
                  // //动态设置路由
                  // this.$store.dispatch("add_Routes", json.data.sysMenuVoList);
                  //
                  // //存储按钮权限
                  // this.$store.dispatch(
                  //   "add_Permissions",
                  //   json.data.rolePermissionVoList
                  // );
                  this.$router.push("/");
                  return;
                } else if (json.message) {
                  this.errorInfo.text = json.message;
                }
              }
              this.errorInfo.isShowError = true;
            })
            .catch(err => {
              console.log("error:", err);
              this.errorInfo.isShowError = true;
              this.errorInfo.text = "系统接口异常";
            });
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    pathTo(data) {
      this.$emit("changeComponent", data);
    }
  }
};
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
